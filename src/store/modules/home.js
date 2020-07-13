import { Notification } from 'element-ui';
import { http } from '../../services';

const state = () => ({
  weather: {},
  forecast: [],
});

const mutations = {
  updateWeather(state, payload) {
    state.weather = { ...payload };
  },
  clearWeather(state) {
    state.weather = {};
  },
  clearForecast(state) {
    state.forecast = [];
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
  fetchForecast: async ({ commit }, payload) => {
    try {
      const data = await http.getForecastByCityId(payload);
      console.log(data);
      commit('updateWeather', data?.current);
      commit('updateForecast', data?.daily);
      Notification({
        title: 'Success',
        message: 'Forecast loaded successfuly',
        type: 'success',
      });
    } catch (error) {
      Notification({
        title: 'Error',
        message: error,
      });
    }
  },
};

export default {
  namespaced: true,
  mutations,
  getters,
  actions,
  state,
};
