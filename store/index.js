import Vue from 'vue';
import Vuex from 'vuex';
import general from './pages/general';
import posts from './pages/posts';
import cards from './pages/cards';
import news from './pages/news';
import films from './pages/films';

import ui from './ui';

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
      news,
      films,
      ui,
    },
    state,
    strict: debug,
    actions,
    mutations,
  });

export default store;
