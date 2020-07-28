import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import nasa from './modules/nasa';
import films from './modules/films';
import posts from './modules/posts';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    nasa,
    films,
    posts,
  },
});
