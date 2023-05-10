const state = () => ({
  posts: {},
});

const getters = {};

const actions = {
  async getPostsPage({ commit }) {
    const { data } = await this.$api.pages.postsPage();
    commit('setPostsPage', data);
    return data;
  },
};

// mutations
const mutations = {
  setPostsPage(state, data) {
    state.posts = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
