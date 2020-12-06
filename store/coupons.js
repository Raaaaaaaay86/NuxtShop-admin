/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
  coupons: [],
});

const actions = {
  async create(context, couponInfo) {
    const ress = await this.$axios.$post('/admin/coupon', { data: { ...couponInfo } });
    const { success } = ress;
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async update(context, couponInfo) {
    const { id } = couponInfo;
    const { success } = await this.$axios.$put(`/admin/coupon/${id}`, { data: { ...couponInfo } });
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async delete(context, id) {
    const { success } = await this.$axios.$delete(`/admin/coupon/${id}`);
    if (!success) return Promise.resolve(success);
    return Promise.resolve(success);
  },
  async getAll({ commit }) {
    const { coupons } = await this.$axios.$get('/admin/coupon/all');
    commit('SET_ALL_COUPONS', coupons);
  },
};

const mutations = {
  SET_ALL_COUPONS(state, coupons) {
    coupons.forEach((coupon) => {
      const time = new Date(coupon.due_date);
      coupon.due_date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
    });
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
