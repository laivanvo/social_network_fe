<template>
  <div class="row g-0" @click="goPersonal()" v-if="profile">
    <img
      :src="'http://localhost:8080' + profile.avatar"
      class="d-block w-100 mb-3"
      style="height: 200px"
    />
    <h4 class="row g-0 mb-3">
      {{ profile.last_name + " " + profile.first_name }}
    </h4>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      isJoin: false,
    };
  },
  methods: {
    goPersonal() {
        this.$router.push({ name: 'personalApp', params: {profile: this.profile}})
    }
  },
};
</script>
