<template>
  <div class="pa-4">
    <v-btn
      color="success"
      nuxt
      to="/edit-product"
    >
      新增商品
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1 mt-4"
      loading="true"
    >
      <template v-slot:item.actions>
        <v-btn icon small color="success" class="mr-2">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon small color="error">
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
/* eslint-disable */
import {
  reactive,
  computed,
  useContext,
  useFetch,
  onBeforeMount,
} from '@nuxtjs/composition-api';

export default {
  setup() {
    const { store } = useContext();
    const headers = reactive([
      {
        text: '編號',
        value: 'id',
      },
      {
        text: '商品名稱',
        value: 'title',
      },
      {
        text: '分類',
        value: 'category',
      },
      {
        text: '價格',
        value: 'origin_price',
      },
      {
        text: '是否上架',
        value: 'is_enabled',
      },
      {
        text: '操作',
        value: 'actions',
      },
    ]);
    const products = computed(() => store.getters['products/allProducts']);

    onBeforeMount(async () => {
      await store.dispatch('products/getAll');
    });

    return {
      headers,
      products,
    };
  },
};
</script>
