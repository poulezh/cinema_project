const state = () => ({
  movies: [],
});

const getters = {};

const actions = {
  async getMovies({ commit }, id) {
    try {
      const { data } = await this.$api.pages.getMovies(id);
      commit('setMovies', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

const mutations = {
  setMovies(state, data) {
    state.movies = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
