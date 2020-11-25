<template>
  <v-dialog
    id="orderModal"
    v-model="visible"
    persistent
    fullscreen
    max-width="600px"
  >
    <v-card>
      <ValidationObserver
        ref="observer"
        v-slot="{ invalid }"
      >
        <form>
          <v-card-title>
            <span class="headline">
              訂單資訊
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="order.create_at"
                    label="成立時間"
                    dense
                    outlined
                    readonly
                    background-color="grey lighten-3"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="order.id"
                    label="編號"
                    dense
                    outlined
                    readonly
                    background-color="grey lighten-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="order.total"
                    label="應付金額"
                    dense
                    outlined
                    readonly
                    background-color="grey lighten-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="order.message"
                    outlined
                    dense
                    label="備註"
                    background-color="grey lighten-3"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-data-table
                    :headers="headers"
                    :items="productList"
                    class="elevation-1 mt-4"
                    loading="true"
                  >
                    <template v-slot:item.product.title="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.product.title"
                      >
                        {{ props.item.product.title }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.product.title"
                            label="Edit"
                            single-line
                            counter
                          />
                        </template>
                      </v-edit-dialog>
                    </template>
                    <template v-slot:item.final_total="props">
                      <v-edit-dialog
                        :return-value.sync="props.item.final_total"
                      >
                        {{ props.item.final_total }}
                        <template v-slot:input>
                          <v-text-field
                            v-model="props.item.final_total"
                            label="Edit"
                            single-line
                            counter
                          />
                        </template>
                      </v-edit-dialog>
                    </template>
                  </v-data-table>>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-radio-group
                    v-model="order.is_paid"
                    dense
                    row
                    label="是否付款"
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
              color="blue darken-1"
              text
              @click.prevent="close"
            >
              關閉
            </v-btn>
            <v-btn
              v-if="order.id"
              color="blue darken-1"
              text
              :disabled="invalid"
            >
              更新
            </v-btn>
          </v-card-actions>
        </form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  computed,
  reactive,
  useContext,
  ref,
  watchEffect,
  onUpdated,
} from '@nuxtjs/composition-api';

export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { store } = useContext();
    const visible = computed(() => store.getters['orderForm/visible']);
    const order = ref({
      create_at: null,
      id: null,
      is_paid: null,
      message: null,
      num: null,
      paid_date: null,
      products: null,
      total: null,
      user: null,
    });
    const productList = computed(() => {
      const array = [];
      if (!order.value.products) return array;
      const list = order.value.products;
      const keys = Object.keys(list);

      keys.forEach((key) => {
        array.push(list[key]);
      });

      return array;
    });
    const totalAmount = computed(() => {
      let total = 0;
      productList.value.forEach((product) => {
        total += parseInt(product.final_total, 10);
      });
      order.value.total = total;
      return total;
    });
    const headers = reactive([
      {
        text: '編號',
        value: 'id',
      },
      {
        text: '商品名稱',
        value: 'product.title',
      },
      {
        text: '數量',
        value: 'qty',
      },
      {
        text: '原價',
        value: 'product.price',
      },
      {
        text: '應付金額',
        value: 'final_total',
      },
      {
        text: '操作',
        value: 'actions',
      },
    ]);

    const close = () => {
      store.commit('orderForm/CLOSE');
    };

    if (!process.server) {
      (function watchEffectGenerator() {
        const keys = Object.keys(order.value);
        if (keys.length === 0) return;
        keys.forEach((key) => watchEffect(() => store.commit('orders/SET_EDIT_PRODUCT', { key, value: order.value[key] })));
      }());
    }

    onUpdated(() => {
      order.value = JSON.parse(JSON.stringify(props.orderInfo));
    });

    return {
      productList,
      totalAmount,
      visible,
      headers,
      close,
      order,
    };
  },
};
</script>
