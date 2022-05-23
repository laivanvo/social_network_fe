<template>
  <div id="app" :is="layout">
    <router-view style="background-color: #F8F8FF;"></router-view>
  </div>
</template>

<script>
import HeaderApp from '@/views/layouts/HeaderApp'
export default {
  name: 'App',
  components: {
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? HeaderApp
    }
  },
}
</script>
