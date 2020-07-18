import { http } from '../../services';

const state = () => ({
  films: {
    results: [],
  },
});

const mutations = {
  updateFilms(state, payload) {
    state.films = { ...payload };
  },
};

const actions = {
  fetchFilms: async ({ commit }, {query, page = 1}) => {
    const data = await http.getFilms(query, page);
    commit('updateFilms', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
