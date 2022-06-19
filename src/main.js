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
import PersonalApp from "@/views/pages/personal/PersonalApp"
import SavePost from "@/views/pages/post/save/SavePost"
import PostView from "@/views/pages/post/view/PostView"
import SearchApp from "@/views/pages/search/SearchApp"
import PostShow from "@/views/pages/post/createPostModal/PostShow"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";

const EventBus = new Vue()
export default EventBus
const routes = [
  { path: '/home', component: HomeIndex, name: 'home' },
  { path: '/page', component: PageApp, name: 'page' },
  { path: '/login', component: LoginApp, name: 'login' },
  { path: '/register', component: RegisterApp, name: 'register' },
  { path: '/profile', component: EditProfile, name: 'profile' },
  { path: '/group', component: GroupApp, name: 'group' },
  { path: '/groupView', component: ViewGroup, name: 'groupView' },
  { path: '/friend', component: FriendApp, name: 'friend' },
  { path: '/request', component: ListRequest, name: 'request' },
  { path: '/Personal', component: PersonalAuth, name: 'personal' },
  { path: '/personalApp', component: PersonalApp, name: 'personalApp' },
  { path: '/save', component: SavePost, name: 'save' },
  { path: '/postView', component: PostView, name: 'postView' },
  { path: '/search', component: SearchApp, name: 'search' },
  { path: '/postShow', component: PostShow, name: 'postShow' },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
