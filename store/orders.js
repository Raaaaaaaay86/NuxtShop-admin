/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const apiPath = process.env.API_USER;

const state = () => ({
});

const actions = {
  async update(context, { id }) {
    await this.$axios.$put(`/api/${apiPath}/admin/order/${id}`);
  },
  async getPage(context, { page }) {
    await this.$axios.$get(`/api/${apiPath}/admin/orders?page=${page}`);
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
