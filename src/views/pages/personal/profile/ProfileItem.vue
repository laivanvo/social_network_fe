<template>
  <div class="row g-0 p-2 bg-white dropdown-item" type="button" @click="personalApp">
    <div class="row g-0">
      <div class="col-auto">
        <img
          style="border-radius: 50%; width: 50px; height: 50px"
          :src="'http://localhost:8080' + profile.avatar"
        />
      </div>
      <div
        class="
          col-auto
          row
          g-0
          ms-2
          d-flex
          align-items-center
          justify-content-center
        "
      >
        <h5 class="row g-0">
          {{ profile.last_name + "" + profile.first_name }}
        </h5>
        <div class="row g-0">live in {{ profile.address }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
    },
  },
  methods: {
    personalApp() {
      this.$router.push({name: 'personalApp', params: {profile: this.profile}})
    }
  }
};
</script>
