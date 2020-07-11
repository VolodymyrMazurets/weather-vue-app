import { http } from '../../services';

const state = () => ({
  weather: {},
  forecast: {},
});

const mutations = {
  updateWeather(state, payload) {
    state.weather = { ...payload };
  },
  updateForecast(state, payload) {
    state.forecast = { ...payload };
  },
};
const getters = {};

const actions = {
  fetchWeather: async ({ commit }, id) => {
    const data = await http.getWeatherByCityId(id);
    commit('updateWeather', data);
  },
  fetchForecast: async ({commit}, payload) => {
    const data = await http.getForecastByCityId(payload);
    commit('updateForecast', data);
  }
};

export default {
  namespaced: true,
  mutations,
  getters,
  actions,
  state,
};
