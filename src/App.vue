<template>
 <div id="app">
      <div class="row" :is="layout" v-if="this.$router.currentRoute.name !== 'login' && this.$router.currentRoute.name !== 'register'">
        <keep-alive :include="['PersonalAuth', 'HomeIndex']"><router-view :key="$route.fullPath" style="background-color: #f8f8ff"></router-view></keep-alive>
      </div>
      <router-view v-else></router-view>
    </div>
</template>

<script>
import HeaderApp from "@/views/layouts/HeaderApp";
export default {
  name: "App",
  components: {},
  computed: {
    layout() {
      return this.$route.meta.layout ?? HeaderApp;
    },
  },
};
</script>
