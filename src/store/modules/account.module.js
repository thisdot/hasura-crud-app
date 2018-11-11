import { authService } from './../../services/AuthService';
import { router } from './../../router';

const user = authService.getUser();
const state = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null };

const actions = {
  login({ commit }) {
    commit('loginRequest', user);
    authService.login();
  },
  handleAuthenticationResponse({ dispatch, commit }) {
    authService.handleAuthentication().then(
      userInfo => {
        commit('loginSuccess', userInfo);
        router.push(authService.getReturnUrl());
      },
      error => {
        commit('loginFailure', error);
        // dispatch('alert/error', error, { root: true });
        router.push('/');
      }
    );
  },
  logout({ commit }) {
    authService.logout();
    commit('logout');
    router.push("/");
  }
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true };
    state.user = user;
    console.log(state);
  },
  loginFailure(state) {
    state.status = {};
    state.user = null;
  },
  logout(state) {
    state.status = {};
    state.user = null;
  }
};

const getters = {
  getUser(state) {
    return state.user && authService.getUser();
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
