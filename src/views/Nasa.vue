<template>
  <div class="nasa">
    <el-card class="nasa__card" :body-style="{ padding: '0px' }">
      <img :src="apod.url" class="image" />
      <div style="padding: 14px;">
        <h2>{{apod.title}}</h2>
        <p>{{apod.explanation}}</p>
        <div class="bottom clearfix">
          <time class="time">{{ apod.date }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Nasa',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('nasa', ['apod']),

  },
  methods: {
    ...mapActions('nasa', ['fetchApod']),
  },
  mounted() {
    this.fetchApod();
  },
};
</script>
<style lang="scss">
.nasa {
  height: 100%;
  &__card {
    margin-bottom: 32px;
  }
  .image {
    width: 100%;
  }
}
</style>
