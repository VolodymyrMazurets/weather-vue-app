<template>
  <div>
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in getList" :key="item.id">
        <h3 class="medium">{{ item.earth_date }}</h3>
        <img :src="item.img_src" alt />
      </el-carousel-item>
    </el-carousel>
    <el-pagination
      @current-change="currentChange"
      background
      layout="prev, pager, next"
      :total="getMarsCount"
    ></el-pagination>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Mars',
  data() {
    return {
      currentPage: 1,
      percents: 0,
    };
  },
  computed: {
    ...mapState('nasa', ['mars']),
    getMarsCount() {
      return this.mars.length || 0;
    },
    getList() {
      const min = this.currentPage === 1 ? 1 : (this.currentPage - 1) * 10;
      const max = this.currentPage === Math.ceil(this.getMarsCount / 10) ? this.getMarsCount : this.currentPage * 10;
      return this.mars.slice(min, max);
    },
  },
  methods: {
    ...mapActions('nasa', ['fetchMars']),
    currentChange(e) {
      this.currentPage = e;
    },
  },
  mounted() {
    this.fetchMars();
  },
};
</script>
<style lang="scss">
</style>
