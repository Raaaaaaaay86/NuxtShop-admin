<template>
  <div class="pa-4">
    <v-btn
      color="success"
      @click.prevent="open"
    >
      新增折扣券
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="coupons"
      class="elevation-1 mt-4"
      loading="true"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon small color="success" class="mr-2" @click.prevent="edit(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon small color="error" @click.prevent="deleteCoupon(item)">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.is_enabled="{ item }">
        <div>
          {{ item.is_enabled ? '是' : '否' }}
        </div>
      </template>
    </v-data-table>
    <CouponForm :coupon="editCoupon" />
  </div>
</template>

<script>
import CouponForm from '@/components/CouponForm';
import {
  computed,
  // onBeforeMount,
  reactive,
  useContext,
  ref,
  onBeforeMount,
} from '@nuxtjs/composition-api';

export default {
  components: {
    CouponForm,
  },
  setup() {
    const { store } = useContext();
    const headers = reactive([
      {
        text: '代碼',
        value: 'code',
      },
      {
        text: '折扣券名稱',
        value: 'title',
      },
      {
        text: '折扣比',
        value: 'percent',
      },
      {
        text: '到期日',
        value: 'due_date',
      },
      {
        text: '是否啟用',
        value: 'is_enabled',
      },
      {
        text: '操作',
        value: 'actions',
      },
    ]);
    const coupons = computed(() => store.getters['coupons/coupons']);
    const editCoupon = ref();

    onBeforeMount(async () => {
      await store.dispatch('coupons/getAll');
    });

    const open = () => {
      store.commit('couponForm/OPEN');
    };

    const edit = (coupon) => {
      editCoupon.value = { ...coupon };
      store.commit('couponForm/OPEN');
    };

    const deleteCoupon = async (coupon) => {
      store.dispatch('loader/open', { msg: '刪除中' });
      const success = await store.dispatch('coupons/delete', coupon.id);
      if (!success) return store.dispatch('snackbar/open', { msg: '刪除失敗 請重新嘗試' });
      store.dispatch('coupons/getAll');
      store.dispatch('snackbar/open', { msg: '刪除成功' });
      store.commit('loader/CLOSE');
      return true;
    };

    return {
      deleteCoupon,
      editCoupon,
      headers,
      coupons,
      open,
      edit,
    };
  },
};
</script>
