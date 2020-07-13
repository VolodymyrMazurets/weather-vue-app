<template>
  <div class="home">
    <v-select
      :options="paginated"
      :filterable="false"
      @open="onOpen"
      @close="onClose"
      @search="query => search = query"
      :getOptionLabel="(city) => city.name"
      @input="onHandleInput"
      class="home__select"
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>
    <el-card :body-style="{ padding: '0px' }" v-if="isObjectNotEmpty" class="home__curent-card">
      <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" />

      <div style="padding: 14px;">
        <h2>{{cityName}}</h2>
        <p>Current temperature: {{getCelsius(weather.temp)}}&deg;</p>
        <p>Feels like: {{getCelsius(weather.feels_like)}}&deg;C</p>
        <p style="text-transform: capitalize">{{weather.weather[0].description}}</p>
        <div class="bottom clearfix">
          <p>Wind Speed: {{weather.wind_speed}}</p>
        </div>
      </div>
    </el-card>
    <el-row :gutter="16">
      <el-col :span="3" v-for="day in forecast" :key="day.dt" class="home__forecast-card">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            class="image"
          />
          <div style="padding: 14px;">
            <p style="text-transform: capitalize">{{day.weather[0].description}}</p>
            <h4>Temperature by day</h4>
            <ul>
              <li>
                <i class="el-icon-sunrise"></i>
                {{getCelsius(day.temp.morn)}}&deg;C
              </li>
              <li>
                <i class="el-icon-sunny"></i>
                {{getCelsius(day.temp.day)}}&deg;C
              </li>
              <li>
                <i class="el-icon-sunset"></i>
                {{getCelsius(day.temp.eve)}}&deg;C
              </li>
              <li>
                <i class="el-icon-moon-night"></i>
                {{getCelsius(day.temp.night)}}&deg;C
              </li>
            </ul>
            <p>{{getCurrentDate(day.dt)}}</p>
            <p><i class="el-icon-sunrise" style="color: #E6A23C;font-size: 20px"></i>: {{getTimeFormat(day.sunrise)}}</p>
            <p><i class="el-icon-sunset" style="color: #F56C6C; font-size: 20px"></i>: {{getTimeFormat(day.sunset)}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import moment from 'moment';
import countries from '../services/data/city.list.json';

export default {
  name: 'Home',
  data: () => ({
    observer: null,
    limit: 10,
    search: '',
    isActive: false,
    cityName: '',
  }),
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  computed: {
    ...mapState('home', ['weather', 'forecast']),
    filtered() {
      return countries.filter((country) => country.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },
    paginated() {
      return this.filtered.slice(0, this.limit);
    },
    hasNextPage() {
      return this.paginated.length < this.filtered.length;
    },
    isObjectNotEmpty() {
      return !(Object.keys(this.weather).length === 0) && this.weather.constructor === Object;
    },
  },
  methods: {
    moment,
    ...mapActions('home', ['fetchForecast']),
    ...mapMutations('home', ['clearWeather', 'clearForecast']),
    async onOpen() {
      if (this.hasNextPage) {
        await this.$nextTick();
        this.observer.observe(this.$refs.load);
      }
    },
    onClose() {
      this.observer.disconnect();
    },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent;
        const scrollTop = target.offsetParent.scrollTop;
        this.limit += 10;
        await this.$nextTick();
        ul.scrollTop = scrollTop;
      }
    },

    onHandleInput(e) {
      if (e !== null) {
        const {
          name,
          coord: { lat, lon },
        } = e;
        this.cityName = name;
        this.fetchForecast({ lat, lon });
      } else {
        this.clearWeather();
        this.clearForecast();
      }
    },
    getCelsius(item) {
      return Math.floor(item - 273.15);
    },
    getCurrentDate(date) {
      return moment.unix(date).format('Do MMM YYYY');
    },
    getTimeFormat(date) {
      return moment.unix(date).format('LTS');
    },
  },
};
</script>
<style lang="scss">
.home {
  &__select {
    max-width: 300px;
    margin-bottom: 16px;
  }
  &__curent-card {
    max-width: 300px;
    margin-bottom: 32px;
  }
  &__forecast-card {
  }
}
</style>
