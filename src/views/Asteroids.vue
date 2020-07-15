<template>
  <div class="asteroids" v-loading="loading">
    <div class="asteroids__row">
      <el-date-picker
        style="margin-right: 16px"
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      ></el-date-picker>
      <el-button
        @click="handleLoadData"
        :disabled="btnDisabled"
        icon="el-icon-search"
        circle
        type="success"
      ></el-button>
    </div>

    <div class="asteroids__content"  v-if="isObjectNotEmpty">
      <div v-for="(value, name) in neo.near_earth_objects" :key="name">
        <h2>{{name}}</h2>
        <div class="asteroids__row-cards">
          <div class="asteroids__col" v-for="item in value" :key="item.id">
            <el-card
              class="asteroids__card"
              :class="{'_red': item.is_potentially_hazardous_asteroid}"
            >
              <div slot="header" class="asteroids__card-header">
                <span>{{item.name}}</span>
                <el-tag
                  class="asteroids__card-tag"
                  :type="item.is_potentially_hazardous_asteroid ? 'danger' : 'success'"
                >{{item.is_potentially_hazardous_asteroid ? 'Danger' : 'Safe'}}</el-tag>
              </div>
              <div
                class="text item"
              >Diameter: {{`from ${item.estimated_diameter.meters.estimated_diameter_min} to ${item.estimated_diameter.meters.estimated_diameter_max}`}}</div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  name: 'Asteroids',
  data() {
    return {
      dateRange: [],
      loading: false,
    };
  },
  computed: {
    ...mapState('nasa', ['neo']),
    btnDisabled() {
      return this.dateRange.length === 0;
    },
    isObjectNotEmpty() {
      return !(Object.keys(this.neo).length === 0) && this.neo.constructor === Object;
    },
  },
  methods: {
    moment,
    ...mapActions('nasa', ['fetchNeo']),
    async handleLoadData() {
      const start = moment(this.dateRange[0]).format('YYYY-MM-DD');
      const end = moment(this.dateRange[1]).format('YYYY-MM-DD');
      this.loading = true;
      await this.fetchNeo({ start, end });
      this.loading = false;
    },
  },
};
</script>
<style lang="scss">
.asteroids {
  max-height: 100vh;
  &__row {
    display: flex;
  }
  &__content {
  }
  &__row-cards {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    margin: 0 -10px;
  }
  &__col {
    flex-basis: 18%;
    padding: 5px 10px;
    max-width: 18%;
  }
  &__card {
    position: relative;
    &._red {
      background-color: #f56c6c;
    }
  }
  &__card-header {
  }
  &__card-tag {
    position: absolute;
    right: 4px;
    top: 4px;
  }
}
</style>
