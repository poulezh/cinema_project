const state = () => ({
  page: {},
});

const getters = {};

const actions = {
  async getGeneralPage({ commit }) {
    const { data } = await this.$api.pages.generalPage();
    commit('setGeneralPage', data.page);
    return data.page;
  },
};

// mutations
const mutations = {
  setGeneralPage(state, data) {
    state.page = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
