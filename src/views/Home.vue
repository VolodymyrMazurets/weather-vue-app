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
    >
      <template #list-footer v-if="hasNextPage">
        <li ref="load" class="loader">Loading more options...</li>
      </template>
    </v-select>
    <el-card :body-style="{ padding: '0px' }" v-if="isObjectNotEmpty">
      <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" />

      <div style="padding: 14px;">
        <h4>{{weather.name}}</h4>
        <span>{{getCelsius(weather.main.temp)}}&deg;</span>
        <span>{{weather.weather[0].main}}</span>
        <div class="bottom clearfix">
          <span>Wind Speed: {{weather.wind.speed}}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import countries from '../services/data/city.list.json';

export default {
  name: 'Home',
  data: () => ({
    observer: null,
    limit: 10,
    search: '',
  }),
  mounted() {
    this.observer = new IntersectionObserver(this.infiniteScroll);
  },
  computed: {
    ...mapState('home', ['weather']),
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
    ...mapActions('home', ['fetchWeather', 'fetchForecast']),
    onHandleInput(e) {
      const {
        id,
        coord: { lat, lon },
      } = e;
      this.fetchWeather(id);
      this.fetchForecast({ lat, lon });
    },
    getCelsius(item) {
      return Math.floor(item - 273.15);
    },
  },
};
</script>
<style lang="scss">
.home {
}
</style>
