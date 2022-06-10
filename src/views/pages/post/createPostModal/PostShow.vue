<template>
  <div class="row g-0" v-if="post" :style="'max-height:' + height + 'px;'">
    <div class="row g-0">
      <div class="col-1 bg-dark" @click="back"></div>
      <div class="col-7">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                :style="'width: 100%; height: ' + height + 'px;'"
                :src="'http://localhost:8080' + post.files[0].path"
              />
            </div>
            <div class="carousel-item">
              <img
               :style="'width: 100%; height: ' + height + 'px;'"
                :src="'http://localhost:8080' + post.files[1].path"
              />
            </div>
            <div class="carousel-item">
              <img
               :style="'width: 100%; height: ' + height + 'px;'"
                :src="'http://localhost:8080' + post.files[2].path"
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-1 bg-dark" @click="back"></div>
      <div class="col-3">
        <post-app-view :postP="post" :user="user" :height="height"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import PostAppView from "../PostAppView.vue";
export default {
  components: { PostAppView },
  created() {
    this.post = this.$route.params.post ? this.$route.params.post : null;
    this.user = this.$route.params.user ? this.$route.params.user : null;
    this.height = $(window).height() - 50;
    console.log(this.height);
    if (!this.post) {
      this.post = JSON.parse(window.localStorage.getItem("post", this.post));
    }
    window.localStorage.setItem("post", JSON.stringify(this.post));
    if (!this.user) {
      this.user = JSON.parse(window.localStorage.getItem("user", this.user));
    }
    window.localStorage.setItem("user", JSON.stringify(this.user));
  },
  data() {
    return {
      post: {},
      user: {},
      height: 0,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
