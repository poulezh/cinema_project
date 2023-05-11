const state = () => ({
  newsProps: {
    newsShow: false,
  },
});

const getters = {};

const actions = {
  setNewsProps({ commit }, data) {
    commit('setNewsProps', data);
  },
};

// mutations
const mutations = {
  setNewsProps(state, data) {
    state.newsProps = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
