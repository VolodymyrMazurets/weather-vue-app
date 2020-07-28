import Vue from 'vue';
import ElementUi from 'element-ui';
import vSelect from 'vue-select';
import locale from 'element-ui/lib/locale/lang/en';

import App from './App.vue';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false;

Vue.use(ElementUi, { locale });

Vue.component('v-select', vSelect);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
