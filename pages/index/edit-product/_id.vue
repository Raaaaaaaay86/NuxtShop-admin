<template>
  <div class="pa-4">
    <client-only>
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
                        產品資訊
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
                        name="產品名稱"
                        rules="required"
                      >
                        <v-text-field
                          id="title"
                          v-model="product.title"
                          name="title"
                          label="產品名稱"
                          :error-messages="errors"
                          background-color="grey lighten-3"
                          outlined
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
                              id="category"
                              v-model="product.category"
                              name="category"
                              label="分類"
                              :error-messages="errors"
                              background-color="grey lighten-3"
                              outlined
                              required
                            />
                          </ValidationProvider>
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="單位"
                            rules="required"
                          >
                            <v-text-field
                              id="unit"
                              v-model="product.unit"
                              name="unit"
                              label="單位"
                              :error-messages="errors"
                              background-color="grey lighten-3"
                              outlined
                              required
                            />
                          </ValidationProvider>
                          <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            outlined
                            background-color="grey lighten-3"
                            label="上傳產品圖片"
                            prepend-icon=""
                            append-icon="mdi-camera"
                            @change="uploadImage"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6" class="d-flex flex-column align-center justify-center">
                      <v-img
                        max-height="300"
                        max-width="300"
                        :src="product.imageUrl"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="產品敘述"
                        rules="required"
                      >
                        <v-textarea
                          v-model="product.description"
                          outlined
                          :error-messages="errors"
                          background-color="grey lighten-3"
                          label="產品敘述"
                        />
                      </ValidationProvider>
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="產品內容"
                        rules="required"
                      >
                        <v-textarea
                          v-model="product.content"
                          outlined
                          :error-messages="errors"
                          background-color="grey lighten-3"
                          label="產品內容"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                  <h1>銷售資訊</h1>
                  <v-row>
                    <v-col cols="3">
                      <p>
                        是否啟用
                      </p>
                      <v-radio-group
                        v-model="product['is_enable']"
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
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="價格"
                        rules="numeric|required"
                      >
                        <v-text-field
                          id="originPrice"
                          v-model="product.originPrice"
                          name="originPrice"
                          label="原價"
                          type="number"
                          prefix="$"
                          :error-messages="errors"
                          background-color="grey lighten-3"
                          outlined
                          required
                        />
                      </ValidationProvider>
                      <v-text-field
                        id="specialPrice"
                        v-model="product.price"
                        name="specialPrice"
                        label="特價"
                        type="number"
                        prefix="$"
                        background-color="grey lighten-3"
                        outlined
                        required
                      />
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
                        @click.prevent="create"
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
    </client-only>
  </div>
</template>

<script>
import { reactive, useContext } from '@nuxtjs/composition-api';

export default {
  setup() {
    const { store, redirect } = useContext();
    const product = reactive({});

    const uploadImage = async (file) => {
      try {
        const imageUrl = await store.dispatch('products/uploadImage', file);
        product.imageUrl = imageUrl;
        return true;
      } catch (error) {
        throw new Error(error);
      }
    };

    const create = async () => {
      try {
        const success = await store.dispatch('products/create', product);
        if (success) return redirect('/products');
        // store.commit('notification/show', '商品建立失敗，請重新檢查表單資料');
        return false;
      } catch (error) {
        throw new Error(error);
      }
    };

    return {
      product,
      uploadImage,
      create,
    };
  },
};
</script>
