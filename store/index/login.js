/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
});

const actions = {
  async signin() {
    await this.$axios.$post('/admin/signin');
  },
  async signOut() {
    await this.$axios.$post('/logout');
  },
  async checkAuth() {
    await this.$axios.post('/api/user/check');
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
