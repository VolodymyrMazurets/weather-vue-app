<template>
  <div class="charts">
    <el-button @click="fillData()" type="warning">Randomize</el-button>
    <app-line-chart :chart-data="datacollection" :options="options" style="position: relative;" :width="100" :height="50" />
  </div>
</template>
<script>
import AppLineChart from '../components/AppLineChart.vue';

export default {
  name: 'Charts',
  components: {
    AppLineChart,
  },
  data() {
    return {
      datacollection: {},
      options: {}
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          },
          {
            label: 'Data Two',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
};
</script>
<style lang="scss">
.charts {
  max-height: 80vh;
  position: relative;
}
</style>
