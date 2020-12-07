/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
  products: {},
  edit: {},
});
const actions = {
  async create(context, productInfo) { // ok
    try {
      const ress = await this.$axios.$post('/admin/product', { data: { ...productInfo } });
      const { success } = ress;

      if (success) return Promise.resolve(true);

      return Promise.resolve(false);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  },
  async update(context, productInfo) {
    const { id } = productInfo;
    const { success } = await this.$axios.$put(`/admin/product/${id}`, { data: { ...productInfo } });
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async delete(context, id) {
    const { success } = await this.$axios.$delete(`admin/product/${id}`);
    if (success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async getPage(context, { page }) {
    await this.$axios.$get(`/api/${apiPath}/admin/product?page=${page}`);
  },
  async getAll({ commit }) { // ok
    try {
      const { success, products } = await this.$axios.$get('admin/product/all');
      if (success) {
        commit('SET_ALL_PRODUCTS', products);
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    } catch (error) {
      throw new Error(error);
    }
  },
  // async uploadImage(context, file) {
  //   try {
  //     const headers = {
  //       'Content-type': 'multipart/form-data',
  //     };
  //     const formData = new FormData();
  //     formData.append('file-to-upload', file);

  //     const { imageUrl } = await this.$axios.$post(`/api/${apiPath}/admin/upload`, formData, { headers });
  //     return Promise.resolve(imageUrl);
  //   } catch (error) {
  //     return Promise.reject(new Error(error));
  //   }
  // },
  /* eslint-disable */
  async uploadImage(context, file) {
    try {
      const headers = {
        'Content-type': 'multipart/form-data',
      };
      const formData = new FormData();
      console.log(file);
      formData.append('file', file, file.name);
      const { imageUrl } = await this.$axios.$post(`/admin/product/uploadImage`, formData);
      console.log(imageUrl);
      return Promise.resolve(imageUrl);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  },
};

const mutations = {
  SET_ALL_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_EDIT_PAGE(state, product) {
    state.edit = product;
  },
  UPDATE_EDIT(state, { child, value }) {
    state.edit[child] = value;
  },
  UPDATE_IMAGE_URL(state, { id, url }) {
    state.products[id].imageUrl = url;
  },
  CLEAR_EDIT(state) {
    state.edit = {};
  },
};

const getters = {
  allProducts(state) {
    const data = [];
    if (state.products) {
      const keys = Object.keys(state.products);
      keys.forEach((key) => {
        data.push(state.products[key]);
      });
    }
    return data;
  },
  editProduct(state) {
    return state.edit;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
