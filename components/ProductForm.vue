<template>
  <v-dialog
    id="productModal"
    v-model="visible"
    persistent
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
              產品資訊
            </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="產品名稱"
                    rules="required"
                  >
                    <v-text-field
                      v-model="product.title"
                      label="產品名稱"
                      dense
                      outlined
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                  <v-row>
                    <v-col cols="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="分類"
                        rules="required"
                      >
                        <v-text-field
                          v-model="product.category"
                          label="分類"
                          :error-messages="errors"
                          dense
                          outlined
                          background-color="grey lighten-3"
                        />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="單位"
                        rules="required"
                      >
                        <v-text-field
                          v-model="product.unit"
                          label="單位"
                          dense
                          outlined
                          :error-messages="errors"
                          background-color="grey lighten-3"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-file-input
                        accept="image/png, image/jpeg, image/bmp"
                        label="上傳產品圖片"
                        prepend-icon=""
                        append-icon="mdi-camera"
                        background-color="grey lighten-3"
                        dense
                        outlined
                        @change="uploadImage"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-img :src="product.imageUrl" />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="產品敘述"
                    rules="required"
                  >
                    <v-textarea
                      v-model="product.description"
                      label="產品敘述"
                      rows="3"
                      dense
                      outlined
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="產品內容"
                    rules="required"
                  >
                    <v-textarea
                      v-model="product.content"
                      label="產品內容"
                      rows="3"
                      dense
                      outlined
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <p>
                    是否啟用
                  </p>
                  <v-radio-group
                    v-model="product['is_enabled']"
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
              <v-row>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="價格"
                    rules="numeric|required"
                  >
                    <v-text-field
                      v-model="product.originPrice"
                      label="原價"
                      type="number"
                      prefix="$"
                      outlined
                      dense
                      :error-messages="errors"
                      background-color="grey lighten-3"
                    />
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="product.price"
                    label="特價"
                    type="number"
                    prefix="$"
                    dense
                    outlined
                    background-color="grey lighten-3"
                  />
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
              @click="close"
            >
              關閉
            </v-btn>
            <v-btn
              v-if="product.id"
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

import {
  computed,
  onUpdated,
  useContext,
  ref,
} from '@nuxtjs/composition-api';

export default {
  props: {
    product: {
      type: Object,
      default: () => ({
        imageUrl: '',
      }),
    },
  },
/* eslint-disable */
  setup(props, { emit }) {
    const { store, $vuetify } = useContext();
    const visible = computed(() => store.getters['productForm/visible']);
    const observer = ref(null);

    onUpdated(() => {
      const productModal = document.getElementsByClassName('v-dialog');
      productModal[0].scrollTop = 0;
      observer.value.reset();
    });

    const close = () => {
      store.commit('productForm/CLOSE');
    };

    const create = async () => {
      close();
      store.dispatch('loader/open', { msg: '商品建立中' });

      const success = await store.dispatch('products/create', props.product);

      if (!success) return store.dispatch('snackbar/open', { msg: '建立商品失敗 請重新嘗試' });

      await store.dispatch('products/getAll');
      store.commit('loader/CLOSE');
      store.dispatch('snackbar/open', { msg: '商品建立成功' });
      return true;
    };

    const update = async () => {
      close();
      store.dispatch('loader/open', { msg: '商品更新中' });

      const success = await store.dispatch('products/update', props.product);

      if (!success) return store.dispatch('snackbar/open', { msg: '更新商品失敗 請重新嘗試' });

      await store.dispatch('products/getAll');
      store.commit('loader/CLOSE');
      store.dispatch('snackbar/open', { msg: '商品更新成功' });
      return true;
    };

    const uploadImage = async (file) => {
      try {
        store.dispatch('loader/open', { msg: '上傳圖片中' });

        const newUrl = await store.dispatch('products/uploadImage', file);
        store.commit('loader/CLOSE');

        // if (!props.product.id) return emit('updateUrl', { newUrl });

        props.product.imageUrl = newUrl;
        return true;
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      visible,
      close,
      create,
      update,
      observer,
      uploadImage,
    };
  },
};
</script>
