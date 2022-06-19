<template>
  <div
    id="carouselExampleInterval"
    class="carousel slide row g-0"
    data-bs-ride="carousel"
    v-if="(profiles.length >= 3)"
  >
    <h4 class="row g-0 mt-3 mb-3">
      List request
    </h4>
    <div class="carousel-inner" style="height: 300px;">
      <div class="carousel-item active">
        <div class="row g-0 ps-2">
          <div class="col-4 ps-2 border border-5 rounded">
            <profile-item-join :profile="profiles[0]"/>
          </div>
          <div class="col-4 ps-2 border border-5 rounded">
            <profile-item-join :profile="profiles[1]"/>
          </div>
          <div class="col-4 ps-2 border border-5 rounded">
            <profile-item-join :profile="profiles[2]"/>
          </div>
        </div>
      </div>
      <div class="row g-0" v-if="(i <= profiles.length - 6)">
        <div class="carousel-item" v-for="profile in profiles" :key="profile.id">
          <div class="row g-0">
            <div class="col-4 ps-2  ps-2 border border-5 rounded">
              <profile-item-join :profile="profiles[i]"/>
            </div>
            <div class="col-4 ps-2 ps-2 border border-5 rounded">
              <profile-item-join :profile="profiles[i + 1]"/>
            </div>
            <div class="col-4 ps-2 ps-2 border border-5 rounded">
              <profile-item-join :profile="profiles[i + 2]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true" @click="prev()"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true" @click="next()"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import ProfileItemJoin from "@/views/pages/personal/profile/ProfileItemJoin.vue"
export default {
  components: {
    ProfileItemJoin,
  },
  data() {
    return {
      profiles: [],
      i: 1,
    };
  },
  mounted() {
    this.getprofile();
  },
  methods: {
    getprofile() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.profiles = res.data.profiles;
      });
    },
    next() {
      this.i += 3;
    },
    prev() {
      this.i -= 3;
    },
  },
};
</script>
