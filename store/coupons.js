/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
});

const actions = {
  async create() {
    await this.$axios.$post(`/api/${apiPath}/admin/coupon`);
  },
  async update(context, { id }) {
    await this.$axios.$post(`/api/${apiPath}/admin/coupon/${id}`);
  },
  async delete(context, { id }) {
    await this.$axios.$get(`/api/${apiPath}/admin/coupons?page=${id}`);
  },
  async getPage(context, { page }) {
    await this.$axios.$get(`/api/${apiPath}/admin/coupons?page=${page}`);
  },
};

const mutations = {

};

const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters,
};
