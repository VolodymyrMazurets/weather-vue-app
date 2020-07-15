import { http } from '../../services';

const initialApod = {
  date: '',
  explanation: '',
  title: '',
  url: '',
};

const state = () => ({
  apod: { ...initialApod },
  neo: {},
});

const mutations = {
  updateApod(state, payload) {
    state.apod = { ...payload };
  },
  updateNeo(state, payload) {
    state.neo = { ...payload };
  },
};

const actions = {
  fetchApod: async ({ commit }) => {
    const data = await http.getApod();
    if (data) commit('updateApod', data);
  },
  fetchNeo: async ({ commit }, { start, end }) => {
    const data = await http.getNeo({ start, end });
    if (data) commit('updateNeo', data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
