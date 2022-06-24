<template>
  <div
    id="carouselExampleInterval1"
    class="carousel slide row g-0"
    data-bs-ride="carousel"
    v-if="(profiles.length >= 3)"
  >
    <h4 class="row g-0 mt-3 mb-3">
      List suggest
    </h4>
    <div class="carousel-inner" style="height: 300px;">
      <div class="carousel-item" :class="{ active: index === 0 }" v-for="(da, index) in data" :key="index">
        <div class="row g-0 ps-2">
          <div
            class="col-4 ps-2 border border-5 rounded"
            v-for="p in da"
            :key="p.id"
          >
            <profile-item-join :profile="p"/>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleInterval1"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true" @click="prev()"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleInterval1"
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
      data: [],
    };
  },
  mounted() {
    this.getprofile();
  },
  methods: {
    getprofile() {
      BaseRequest.get("profiles/list").then((res) => {
        this.profiles = res.data.profiles;
        let a = 0;
        let pus = [];
        this.profiles.map((e) =>  {
          if (a !== 3) {
              a += 1;
              pus.push(e)
              console.log(a)
          } else {
            a = 0;
            this.data.push(pus);
            pus = [];
          }
        })
        console.log(this.data)
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
