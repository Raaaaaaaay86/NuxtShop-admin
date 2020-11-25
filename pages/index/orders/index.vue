<template>
  <div class="pa-4">
    <v-data-table
      :headers="headers"
      :items="orderList"
      class="elevation-1 mt-4"
      loading="true"
    >
      <template v-slot:item.create_at="{ item }">
        <div>
          {{ item.create_at | YYYYMMDD }}
        </div>
      </template>
      <template v-slot:item.is_paid="{ item }">
        <div>
          {{ item.is_paid ? '是' : '否' }}
        </div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon small color="success" class="mr-2" @click.prevent="edit(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <OrderForm :order-info="editOrder" />
  </div>
</template>

<script>
import OrderForm from '@/components/OrderForm';
import {
  computed,
  onBeforeMount,
  reactive,
  useContext,
  ref,
} from '@nuxtjs/composition-api';

export default {
  components: {
    OrderForm,
  },
  setup() {
    const { store } = useContext();
    const headers = reactive([
      {
        text: '成立時間',
        value: 'create_at',
      },
      {
        text: '編號',
        value: 'id',
      },
      {
        text: '價格',
        value: 'total',
      },
      {
        text: '付款狀態',
        value: 'is_paid',
      },
      {
        text: '操作',
        value: 'actions',
      },
    ]);
    const orderList = computed(() => store.getters['orders/orderList']);
    const editOrder = ref({});

    onBeforeMount(async () => {
      await store.dispatch('orders/getPage');
    });

    const edit = (order) => {
      editOrder.value = order;
      store.commit('orderForm/OPEN');
    };

    return {
      orderList,
      editOrder,
      headers,
      edit,
    };
  },
};
</script>
