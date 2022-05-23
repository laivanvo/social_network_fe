<template>
  <div class="row g-0">
    <div class="row g-0">
      <img class="w-100 ms-1" :src="'http://localhost:8080' + profile.avatar" />
    </div>
    <div class="row g-0">
      <div class="col-2">
        <img
          class="w-100 ms-1"
          style="width: 50px; height: 50px; border-radius: 50% 50% 50% 50%"
          :src="'http://localhost:8080' + profile.avatar"
        />
      </div>
      <div class="col-3 d-flex align-items-center">
        <div class="row g-0">
            {{ profile.last_name + " " + profile.first_name }}
        </div>
        <div class="row g-0">33 friend same</div>
      </div>
      <div class="col-5"></div>
      <button class="col-2">add friend</button>
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
  data() {
    return {
      profile: {},
    };
  },
  mounted() {
  },
};
</script>
