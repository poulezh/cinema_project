const state = () => ({
  afficheList: {},
});

const getters = {};

const actions = {
  async getAffichePage({ commit }) {
    const { data } = await this.$api.pages.affishePage();
    commit('setAffichePage', data);
    return data;
  },
};

// mutations
const mutations = {
  setAffichePage(state, data) {
    state.afficheList = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
