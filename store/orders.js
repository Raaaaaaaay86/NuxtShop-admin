/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
  orderList: [],
  editOrder: {},
});

const actions = {
  async update({ state }, id) {
    const response = await this.$axios.$put(`/api/${apiPath}/admin/order/${id}`, state.editOrder);
    console.log(response);
  },
  async getPage({ commit }, page = 1) {
    const { success, orders } = await this.$axios.$get(`/api/${apiPath}/admin/orders?page=${page}`);
    if (!success) return;
    commit('SET_PAGE_ORDERS', orders);
  },
  async getAll({ commit }) {
    const { success, orders } = await this.$axios.$get('/admin/order/all');
    if (!success) return;
    commit('SET_PAGE_ORDERS', orders);
  },
};

const mutations = {
  SET_PAGE_ORDERS(state, orders) {
    state.orderList = orders;
  },
  SET_EDIT_PRODUCT(state, { key, value }) {
    state.editOrder[key] = value;
  },
};

const getters = {
  orderList(state) {
    return state.orderList;
  },
  editOrder(state) {
    return state.editOrder;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
