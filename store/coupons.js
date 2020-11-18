/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
  coupons: [],
});

const actions = {
  async create(context, couponInfo) {
    const { success } = await this.$axios.$post(`/api/${apiPath}/admin/coupon`, { data: { ...couponInfo } });
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async update(context, couponInfo) {
    const { id } = couponInfo;
    const { success } = await this.$axios.$put(`/api/${apiPath}/admin/coupon/${id}`, { data: { ...couponInfo } });
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async delete(context, id) {
    const { success } = await this.$axios.$delete(`/api/${apiPath}/admin/coupon/${id}`);
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async getPage({ commit }, page = 1) {
    const { coupons } = await this.$axios.$get(`/api/${apiPath}/admin/coupons?page=${page}`);
    commit('SET_ALL_COUPONS', coupons);
  },
};

const mutations = {
  SET_ALL_COUPONS(state, coupons) {
    state.coupons = coupons;
  },
};

const getters = {
  coupons(state) {
    return state.coupons;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
