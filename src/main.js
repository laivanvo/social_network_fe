import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

import HomeIndex from '@/views/pages/home/HomeIndex'
import PageApp from '@/views/pages/PageApp'
import LoginApp from '@/views/pages/auth/LoginApp'
import RegisterApp from '@/views/pages/auth/RegisterApp'
import PersonalIndex from '@/views/pages/personal/PersonalIndex'
import EditProfile from '@/views/pages/personal/profile/EditProfile'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";

const routes = [
  { path: '/home', component: HomeIndex, name: 'home' },
  { path: '/page', component: PageApp, name: 'page' },
  { path: '/personal', component: PersonalIndex, name: 'personal' },
  { path: '/login', component: LoginApp, name: 'login' },
  { path: '/register', component: RegisterApp, name: 'register' },
  { path: '/profile', component: EditProfile, name: 'profile' },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
