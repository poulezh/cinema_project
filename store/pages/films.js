const state = () => ({
  today: {},
  soon: {},
});

const getters = {};

const actions = {
  async getTodayMovie({ commit }) {
    const { data } = await this.$api.pages.todayList();
    commit('setTodayMovie', data);
    return data;
  },
  async getSoonMovie({ commit }) {
    const { data } = await this.$api.pages.soonList();
    commit('setSoonMovie', data);
    return data;
  },
};

// mutations
const mutations = {
  setTodayMovie(state, data) {
    state.today = data;
  },
  setSoonMovie(state, data) {
    state.soon = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
