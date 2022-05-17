import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

export const bus = new Vue()

import HomeIndex from '@/views/pages/home/HomeIndex'
import LoginApp from '@/views/pages/auth/LoginApp'
import PersonalIndex from '@/views/pages/personal/PersonalIndex'
import ListRequest from '@/views/pages/personal/request/ListRequest'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";

const routes = [
  { path: '/home', component: HomeIndex, name: 'home' },
  { path: '/personal', component: PersonalIndex, name: 'personal' },
  { path: '/login', component: LoginApp, name: 'login' },
  { path: '/friend', component: ListRequest, name: 'list' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
