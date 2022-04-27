import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false
window.axios = require('axios')
Vue.use(BootstrapVue)
Vue.use(Toasted)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
