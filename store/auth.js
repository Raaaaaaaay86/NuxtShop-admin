/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
  user: {},
  errorMessage: '',
});

const actions = {
  async signin({ commit }, usernameAndPassowrd) {
    try {
      const {
        success,
        message,
        uid,
      } = await this.$axios.$post('/admin/signin', usernameAndPassowrd);
      if (!success) {
        commit('SET_ERROR_MESSAGE', message);
        return Promise.resolve(false);
      }

      commit('SET_UID', uid);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(new Error(error));
    }
  },
  async signOut() {
    await this.$axios.$post('/logout');
  },
  async checkAuth() {
    await this.$axios.post('/api/user/check');
  },
};

const mutations = {
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message;
  },
  SET_UID(state, uid) {
    state.user.uid = uid;
  },
};

const getters = {
  errorMessage(state) {
    return state.errorMessage;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
