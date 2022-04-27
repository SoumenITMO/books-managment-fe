import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Home.vue'
import EditBook from '../components/EditBook'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/edit/:bookid',
    name: 'about',
    component: EditBook
  }
]

const router = new VueRouter({
  routes
})

export default router
