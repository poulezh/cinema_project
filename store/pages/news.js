const state = () => ({
  news: [],
  currentNews: {},
});

const getters = {};

const actions = {
  async getNews({ commit }) {
    try {
      const { data } = await this.$api.pages.newsList();
      commit('setNewsList', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async getCurrentNews({ commit }, id) {
    try {
      const { data } = await this.$api.pages.getNews(id);
      commit('setCurrentNews', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setNewsList(state, data) {
    state.news = data;
  },
  setCurrentNews(state, data) {
    state.currentNews = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
