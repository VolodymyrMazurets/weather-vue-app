<template>
  <div class="films">
    <el-input
      @input="handleInput"
      placeholder="Please input"
      v-model="query"
      style="margin-bottom: 16px"
    ></el-input>
    <h1 v-if="(films && films.results && films.results.length) === 0">Type something to search films</h1>
    <el-row v-else :gutter="16" type="flex" align="stretch" style="flex-wrap: wrap">
      <el-col :span="4" v-for="film in films.results" :key="film.id" style="margin-bottom: 16px">
        <el-card
          :body-style="{ padding: '0px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'stretch', flex: 1}"
          class="films__card"
        >
          <img
            v-if="film.poster_path"
            :src="`https://image.tmdb.org/t/p/w220_and_h330_face${film.poster_path}`"
            class="films__image"
          />
          <div v-else class="films__icon-wrapper">
            <i class="el-icon-film"></i>
            <h2>Have no poster ;(</h2>
          </div>

          <div style="padding: 14px; height: 106px">
            <h4 class="films__title">{{film.original_title}}</h4>
            <div class="bottom clearfix">
              <time class="time">{{ film.release_date }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      @current-change="currentChange"
      style="margin-top: 32px"
      background
      layout="prev, pager, next"
      :total="films.total_results || 0"
      :page-size="20"
    ></el-pagination>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Films',
  data() {
    return {
      query: '',
    };
  },
  computed: {
    ...mapState('films', ['films']),
  },
  methods: {
    ...mapActions('films', ['fetchFilms']),
    handleInput() {
      this.fetchFilms({ query: this.query });
    },
    currentChange(e) {
      this.fetchFilms({ query: this.query, page: e });
    },
  },
};
</script>
<style lang="scss">
.films {
  &__image {
    width: 100%;
  }
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__card {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }
  &__icon-wrapper {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    i {
      font-size: 40px;
      color: #409eff;
    }
  }
}
</style>
