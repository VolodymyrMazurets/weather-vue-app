import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/nasa',
    name: 'Nasa',
    component: () => import('../views/Nasa.vue'),
  },
  {
    path: '/asteroids',
    name: 'Asteroids',
    component: () => import('../views/Asteroids.vue'),
  },
  {
    path: '/mars',
    name: 'Mars',
    component: () => import('../views/Mars.vue'),
  },
  {
    path: '/films',
    name: 'Films',
    component: () => import('../views/Films.vue'),
  },
  {
    path: '/films/:id',
    name: 'FilmDetails',
    component: () => import('../views/FilmDetails.vue'),
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import('../views/Charts.vue'),
  },
  {
    path: '/create-post',
    name: 'Create Post',
    component: () => import('../views/CreatePost.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
