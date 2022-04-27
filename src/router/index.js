import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/edit/:id',
    name: 'editbook',
    component: () => import('../components/EditBook')
  }
]

const router = new VueRouter({
  routes
})

export default router
