import axios from 'axios';
import { WEATHER_URL, urls, API_KEY, NASA_URL, nasa_api_key } from './urls';

export class Http {
  getWeatherByCityId = async (id) => {
    try {
      const { data } = await axios.get(`${WEATHER_URL}${urls.weather}`, {
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
      const { data } = await axios.get(`${WEATHER_URL}${urls.onecall}`, {
        params: {
          lat: payload.lat,
          lon: payload.lon,
          exclude: 'hourly',
          appid: API_KEY,
        },
      });
      return data;
    } catch (error) {
      return error;
    }
  };

  getApod = async () => {
    try {
      const { data } = await axios.get(`${NASA_URL}${urls.apod}`, {
        params: {
          api_key: nasa_api_key,
        },
      });
      return data;
    } catch {
      return null;
    }
  };

  getNeo = async ({start, end}) => {
    try {
      const { data } = await axios.get(`${NASA_URL}${urls.neo}`, {
        params: {
          start_date: start,
          end_date: end,
          api_key: nasa_api_key,
        },
      });
      return data;
    } catch {
      return null;
    }
  };
}

export default new Http();
