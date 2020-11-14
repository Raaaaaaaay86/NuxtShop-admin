/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
  products: {},
});

const actions = {
  async create(context, productInfo) {
    try {
      const { success } = await this.$axios.$post(`/api/${apiPath}/admin/product`, productInfo);
      if (success) return Promise.resolve(true);
      return Promise.resolve(false);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  },
  async update(context, { id }) {
    await this.$axios.$put(`/api/${apiPath}/admin/product/${id}`);
  },
  async delete(context, { id }) {
    await this.$axios.$delete(`/api/${apiPath}/admin/product/${id}`);
  },
  async getPage(context, { page }) {
    await this.$axios.$get(`/api/${apiPath}/admin/product?page=${page}`);
  },
  async getAll({ commit }) {
    try {
      const { success, products, message } = await this.$axios.$get(`/api/${apiPath}/admin/products/all`);
      console.log(products, message);
      if (success) {
        commit('SET_ALL_PRODUCTS', products);
        return Promise.resolve(true);
      }

      return Promise.resolve(false);
    } catch (error) {
      throw new Error(error);
    }
  },
  async uploadImage(context, file) {
    try {
      const headers = {
        'Content-type': 'multipart/form-data',
      };
      const formData = new FormData();
      formData.append('file-to-upload', file);

      const { imageUrl } = await this.$axios.$post(`/api/${apiPath}/admin/upload`, formData, { headers });
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
};

const getters = {
  allProducts(state) {
    const data = [];
    if (state.products) {
      const keys = Object.keys(state.products);
      keys.forEach((key) => data.push(state.products[key]));
    }
    return data;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
