const state = () => ({
  cards: {},
});

const getters = {};

const actions = {
  async getCardsPage({ commit }) {
    const { data } = await this.$api.pages.cardsPage();
    commit('setCardsPage', data);
    return data;
  },
};

// mutations
const mutations = {
  setCardsPage(state, data) {
    state.cards = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
