<template>
  <div class="row g-0">
    <div class="row g-0 mb-2">
      <div class="col-2">
        <img
          style="width: 50px; height: 50px; border-radius: 50% 50% 50% 50%"
          :src="'http://localhost:8080' + profile.avatar"
        />
      </div>
      <div class="col-10 row g-0 d-flex align-items-center mb-2">
        <div class="row g-0 mb-2">
            {{ profile.last_name + " " + profile.first_name }}
        </div>
        <div class="row g-0 mb-2">33 friend same</div>
      </div>
    </div>
    <div class="row g-0">
        <div class="col-2"></div>
        <button class="col-3 btn btn-primary">Accept</button>
        <button class="col-3 btn btn-secondary">Delete</button>
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
  mounted() {
  },
};
</script>
