/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

// const apiPath = process.env.API_USER;
/* eslint-disable */
import cookieParser from 'cookieparser';

const state = () => ({
  token: '',
});

const actions = {
  async nuxtServerInit(vuexContext, context) {
    // const { commit } = vuexContext;
    // const { req } = context;
    // if (req.headers.cookie) {
    //   const cookies = cookieParser.parse(req.headers.cookie);
    //   const token = cookies['auth-token'];
    //   commit('SET_TOKEN', token);
    // }
  },
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
};

const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters,
};
