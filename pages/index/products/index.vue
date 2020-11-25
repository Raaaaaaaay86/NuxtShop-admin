<template>
  <div class="pa-4">
    <v-btn
      color="success"
      nuxt
      @click="edit({ imageUrl: '' })"
    >
      新增商品
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="products"
      class="elevation-1 mt-4"
      loading="true"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon small color="success" class="mr-2" @click.prevent="edit(item)">
          <v-icon>
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn icon small color="error" @click.prevent="deleteProduct(item)">
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
    <ProductForm :product.sync="editProduct" @updateUrl="updateUrl" />
  </div>
</template>

<script>

import {
  ref,
  reactive,
  computed,
  useContext,
  onBeforeMount,
} from '@nuxtjs/composition-api';
import ProductForm from '@/components/ProductForm';

export default {
  components: {
    ProductForm,
  },
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
        value: 'originPrice',
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
    const editProduct = ref({});

    onBeforeMount(async () => {
      await store.dispatch('products/getAll');
    });

    const deleteProduct = async ({ id }) => {
      store.dispatch('loader/open', { msg: '刪除商品中' });
      const success = await store.dispatch('products/delete', id);

      if (!success) return store.dispatch('snackbar/open', { msg: '刪除失敗請重新嘗試' });

      await store.dispatch('products/getAll');
      store.commit('loader/CLOSE');
      store.dispatch('snackbar/open', { msg: '刪除成功' });
      return true;
    };

    const edit = (product) => {
      editProduct.value = { ...product };
      store.commit('productForm/OPEN');
    };

    const updateUrl = ({ newUrl }) => {
      editProduct.value.imageUrl = newUrl;
    };

    return {
      headers,
      products,
      editProduct,
      deleteProduct,
      updateUrl,
      edit,
    };
  },
};
</script>
