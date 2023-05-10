const state = () => ({
  news: {},
});

const getters = {};

const actions = {
  async getNews({ commit }) {
    const { data } = await this.$api.pages.newsList();
    commit('setNewsList', data);
    return data;
  },
};

// mutations
const mutations = {
  setNewsList(state, data) {
    state.news = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
