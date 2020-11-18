<template>
  <v-dialog
    v-model="visible"
    persistent
    max-width="600px"
    class="hell"
  >
    <v-card>
      <ValidationObserver v-slot="{ invalid }">
        <form>
          <v-card-title>
            <span class="headline">
              產品資訊
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="10">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="名稱"
                  >
                    <v-text-field
                      v-model="coupon.title"
                      dense
                      outlined
                      label="折扣券名稱"
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="代碼"
                  >
                    <v-text-field
                      v-model="coupon.code"
                      dense
                      outlined
                      label="折扣代碼"
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    rules="required"
                    name="折扣比"
                  >
                    <v-text-field
                      v-model="coupon.percent"
                      dense
                      outlined
                      type="number"
                      label="折扣比"
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="coupon['due_date']"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <ValidationProvider
                        v-slot="{ errors }"
                        rules="required"
                        name="到期日"
                      >
                        <v-text-field
                          v-model="coupon['due_date']"
                          readonly
                          label="到期日"
                          prepend-icon="mdi-calendar"
                          :error-messages="errors"
                          v-bind="attrs"
                          v-on="on"
                        />
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="coupon['due_date']"
                      no-title
                      scrollable
                    >
                      <v-spacer />
                      <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(coupon['due_date'])"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>
                    是否啟用
                  </p>
                  <v-radio-group
                    v-model="coupon['is_enabled']"
                    row
                    dense
                  >
                    <v-radio
                      label="是"
                      :value="true"
                    />
                    <v-radio
                      label="否"
                      :value="false"
                    />
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
            <small>*為必填欄位</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              @click="close"
            >
              關閉
            </v-btn>
            <v-btn
              v-if="coupon.id"
              color="blue darken-1"
              text
              :disabled="invalid"
              @click="update"
            >
              更新
            </v-btn>
            <v-btn
              v-else
              color="blue darken-1"
              text
              :disabled="invalid"
              @click="create"
            >
              儲存
            </v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
/* eslint-disable no-param-reassign */

export default {
  props: {
    coupon: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    visible() {
      return this.$store.getters['couponForm/visible'];
    },
  },
  methods: {
    close() {
      this.$store.commit('couponForm/CLOSE');
    },
    async create() {
      const vm = this;
      vm.close();
      this.$store.dispatch('loader/open', { msg: '建立折扣券中' });
      const success = await this.$store.dispatch('coupons/create', vm.coupon);

      if (!success) return this.$store.dispatch('snackbar/open', { msg: '建立折扣券失敗 請重新嘗試' });

      await this.$store.dispatch('coupons/getPage');
      this.$store.commit('loader/CLOSE');
      this.$store.dispatch('snackbar/open', { msg: '折扣券建立成功' });
      return true;
    },
    async update() {
      const vm = this;
      const success = await this.$store.dispatch('coupons/update', vm.coupon);
      if (!success) return this.$store.dispatch('snackbar/open', { msg: '更新折扣券失敗 請重新嘗試' });
      this.$store.dispatch('snackbar/open', { msg: '折扣券更新成功' });
      vm.close();
      this.$store.dispatch('coupons/getPage');
      return true;
    },
  },
};
</script>
