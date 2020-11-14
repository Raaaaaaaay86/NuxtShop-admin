<template>
  <div class="pa-4">
    <ValidationObserver v-slot="{ invalid }">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-sheet
                elevation="1"
                rounded
                class="pa-4"
              >
                <v-row>
                  <v-col class="d-flex align-center">
                    <h1 class="mr-4">
                      折扣券資訊
                    </h1>
                    <v-spacer />
                    <v-btn color="error">
                      刪除
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="名稱"
                    >
                      <v-text-field
                        id="title"
                        v-model="coupon.title"
                        name="title"
                        label="折扣券名稱"
                        :error-messages="errors"
                        background-color="grey lighten-3"
                        outlined
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="代碼"
                    >
                      <v-text-field
                        id="code"
                        v-model="coupon.code"
                        :error-messages="errors"
                        name="code"
                        label="使用代碼"
                        background-color="grey lighten-3"
                        outlined
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="numeric|required"
                      name="折扣比"
                    >
                      <v-text-field
                        id="percent"
                        v-model="coupon.percent"
                        :error-messages="errors"
                        name="percent"
                        label="折扣比"
                        background-color="grey lighten-3"
                        outlined
                      />
                    </ValidationProvider>
                    <v-menu
                      ref="menu"
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
                            label="折扣到期日"
                            :error-messages="errors"
                            append-icon="mdi-calendar"
                            background-color="grey lighten-3"
                            outlined
                            readonly
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
                    <p>
                      是否啟用
                    </p>
                    <v-radio-group
                      v-model="coupon['is_enable']"
                      row
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
                <v-row>
                  <v-col class="d-flex justify-end">
                    <v-btn color="secondary" class="mr-4">
                      取消
                    </v-btn>
                    <v-btn
                      color="success"
                      :disabled="invalid"
                    >
                      儲存
                    </v-btn>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupon: {
      },
    };
  },
};
</script>
