/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
  visible: false,
});

const actions = {
};

const mutations = {
  OPEN(state) {
    state.visible = true;
  },
  CLOSE(state) {
    state.visible = false;
  },
  SET_SHOW_CLOSE(state, status) {
    state.showClose = status;
  },
  SET_TIMEOUT(state, time) {
    state.timeout = time;
  },
  SET_COLOR(state, color) {
    state.color = color;
  },
};

const getters = {
  visible(state) {
    return state.visible;
  },
  showClose(state) {
    return state.showClose;
  },
  color(state) {
    return state.color;
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
