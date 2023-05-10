import Vue from 'vue';
import Vuex from 'vuex';
import general from './pages/general';
import posts from './pages/posts';
import cards from './pages/cards';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = () => ({});

const mutations = {};

const actions = {};

const store = () =>
  new Vuex.Store({
    plugins: [],
    modules: {
      general,
      posts,
      cards,
    },
    state,
    strict: debug,
    actions,
    mutations,
  });

export default store;
