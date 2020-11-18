/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
  visible: false,
  msg: '',
});

const actions = {
  open({ commit }, { msg }) {
    commit('OPEN');
    commit('SET_MSG', msg);
  },
};

const mutations = {
  OPEN(state) {
    state.visible = true;
  },
  CLOSE(state) {
    state.visible = false;
  },
  SET_MSG(state, msg) {
    state.msg = msg;
  },
};

const getters = {
  visible(state) {
    return state.visible;
  },
  msg(state) {
    return state.msg;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
