/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
  orderList: [],
  editProduct: {},
});

const actions = {
  async update(context, { id }) {
    await this.$axios.$put(`/api/${apiPath}/admin/order/${id}`);
  },
  async getPage({ commit }, page = 1) {
    const { success, orders } = await this.$axios.$get(`/api/${apiPath}/admin/orders?page=${page}`);
    if (!success) return;
    commit('SET_PAGE_ORDERS', orders);
  },
};

const mutations = {
  SET_PAGE_ORDERS(state, orders) {
    state.orderList = orders;
  },
  SET_EDIT_PRODUCT(state, { key, value }) {
    state.editProduct[key] = value;
  },
};

const getters = {
  orderList(state) {
    return state.orderList;
  },
  editProduct(state) {
    return state.editProduct;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
