import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.config.productionTip = false

import HomeIndex from '@/views/pages/home/HomeIndex'
import PageApp from '@/views/pages/PageApp'
import LoginApp from '@/views/pages/auth/LoginApp'
import RegisterApp from '@/views/pages/auth/RegisterApp'
import EditProfile from '@/views/pages/personal/profile/EditProfile'
import GroupApp from '@/views/pages/group/GroupApp'
import ViewGroup from '@/views/pages/group/List/ViewGroup'
import FriendApp from "@/views/pages/personal/friend/FriendApp"
import ListRequest from "@/views/pages/personal/friend/ListRequest"
import PersonalAuth from "@/views/pages/personal/PersonalAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";
const EventBus = new Vue()
export default EventBus
const routes = [
  { path: '/home', component: HomeIndex, name: 'home' },
  { path: '/page', component: PageApp, name: 'page' },
  { path: '/login', component: LoginApp, name: 'login' },
  { path: '/register', component: RegisterApp, name: 'register' },
  { path: '/profile', component: EditProfile, name: 'profile' },
  { path: '/group', component: GroupApp, name: 'group' },
  { path: '/view', component: ViewGroup, name: 'view' },
  { path: '/friend', component: FriendApp, name: 'friend' },
  { path: '/friend/request', component: ListRequest, name: 'friend.request' },
  { path: '/Personal', component: PersonalAuth, name: 'personal' },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
