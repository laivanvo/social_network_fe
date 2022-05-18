<template>
  <div id="app" :is="layout">
    <router-view></router-view>
  </div>
</template>

<script>
import DefaultLayout from '@/views/layouts/DefaultLayout'
export default {
  name: 'App',
  components: {
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? DefaultLayout
    }
  },
}
</script>
