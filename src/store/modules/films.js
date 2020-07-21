import { http } from '../../services';

const state = () => ({
  films: {
    results: [],
  },
  film: {},
});

const mutations = {
  updateFilms(state, payload) {
    state.films = { ...payload };
  },
  updateFilm(state, payload) {
    state.film = { ...payload };
  },
};

const actions = {
  fetchFilms: async ({ commit }, {query, page = 1}) => {
    const data = await http.getFilms(query, page);
    commit('updateFilms', data);
  },
  fetchFilm: async ({ commit }, id) => {
    const data = await http.getMovie(id);
    commit('updateFilm', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
