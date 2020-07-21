<template>
  <div class="film-details">
    <el-button @click="$router.go(-1)" style="margin-bottom: 16px" icon="el-icon-back" circle></el-button>
    <div class="film-details__card">
      <div class="film-details__img-wrapper">
        <img :src="`https://image.tmdb.org/t/p/w220_and_h330_face${film.poster_path}`" alt="" />
      </div>
      <div class="film-details__info">
        <el-progress :width="100" class="film-details__progress" type="circle" :percentage="film.vote_average * 10"></el-progress>
        <h1>{{film.title}}</h1>
        <ul>
          <li>Tagline: {{ film.tagline }}</li>
          <li>Budget: $ {{ film.budget }}</li>
          <li>
            Genres:
            <span v-for="(ganre, idx) in film.genres" :key="ganre.id" :class="{ _mr: idx + 1 < film.genres.length }"
              >{{ `${ganre.name}${getComa(idx)}` }}
            </span>
          </li>
          <li>Release date: {{ film.release_date }}</li>
          <li>Runtime: {{ film.runtime }} min</li>

        </ul>
        <p>{{film.overview}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'FilmDetails',
  computed: {
    ...mapState('films', ['film']),
  },
  methods: {
    ...mapActions('films', ['fetchFilm']),
    getComa(idx) {
      return idx + 1 < this.film.genres.length ? ',' : '';
    },
  },
  created() {
    const { id } = this.$route.params;
    this.fetchFilm(id);
  },
};
</script>
<style lang="scss">
.film-details {
  &__card {
    display: flex;
    align-items: stretch;
    position: relative;
  }
  &__img-wrapper {
    margin-right: 20px;
  }
  &__progress {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  ._mr {
    margin-right: 8px;
  }
}
</style>
