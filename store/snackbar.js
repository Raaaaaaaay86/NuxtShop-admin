/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

const state = () => ({
  msg: '', // snackbar的訊息
  visible: false, // 是否顯示snackbar
  showClose: true, // 是否顯示關閉按鈕
  timeout: 6000, // 顯示後的自動關閉時間
  color: 'error', // 關閉按鈕的顏色
});

const actions = {
  async open({ state, commit }, { msg }) {
    const { timeout } = state;

    commit('OPEN', { msg });

    setTimeout(() => {
      commit('CLOSE');
    }, timeout);
  },
};

const mutations = {
  OPEN(state, { msg }) {
    state.visible = true;
    state.msg = msg;
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
