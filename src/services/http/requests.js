import axios from 'axios';
import { BASE_URL, urls, API_KEY } from './urls';

axios.defaults.baseURL = BASE_URL;

export class Http {
  getWeatherByCityId = async (id) => {
    try {
      const { data } = await axios.get(`${urls.weather}`, {
        params: {
          id: id,
          appid: API_KEY,
        },
      });
      return data;
    } catch {
      return null;
    }
  };

  getForecastByCityId = async (payload) => {
    try {
      const { data } = await axios.get(`${urls.onecall}`, {
        params: {
          lat: payload.lat,
          lon: payload.lon,
          exclude: 'hourly',
          appid: API_KEY,
        },
      });
      return data;
    } catch {
      return null;
    }
  };
}

export default new Http();
