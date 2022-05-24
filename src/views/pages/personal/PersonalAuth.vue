<template>
  <div class="row g-0">
    <div class="row g-0 bg-light" v-if="profile.id">
      <div class="col-1"></div>
      <div class="col-10 row g-0 bg-white">
        <div class="row g-0 d-flex align-items-start">
          <div class="row g-0">
            <div class="row g-0 border" v-if="profile.id">
              <div class="row g-0">
                <img
                  :style="
                    'width: 83%; height: ' +
                    height / 2 +
                    'px; position: absolute;'
                  "
                  :src="'http://localhost:8080' + profile.avatar"
                />
              </div>
              <div
                class="row g-0"
                :style="'height: ' + (height / 2 - 50) + 'px;'"
              ></div>
              <div class="row g-0" style="position: relative">
                <div class="col-3">
                  <img
                    style="
                      width: 150px;
                      height: 150px;
                      border-radius: 50% 50% 50% 50%;
                    "
                    :src="'http://localhost:8080' + profile.avatar"
                  />
                </div>
                <div class="col-7 row g-0 mt-5">
                  <div class="row g-0">
                    <div class="col-3">
                      {{ profile.last_name + " " + profile.first_name }}
                    </div>
                  </div>
                  <div class="row g-0">
                    <div class="col-9"></div>
                    <edit-profile :profileP="profile" class="col-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 d-flex align-items-start">
          <div class="row g-0 col-4 border">
            <div class="row g-0 border" style="overflow: auto, height: 300px">
              <div class="row g-0">Introduce</div>
              <div class="row g-0"><center>hello</center></div>
              <div class="row g-0">
                <div class="col-2">
                  <center><i class="bi bi-briefcase-fill fs-3"></i></center>
                </div>
                <div class="col-10">hs noi</div>
              </div>
              <div class="row g-0">
                <div class="col-2">
                  <center><i class="bi bi-mortarboard-fill fs-3"></i></center>
                </div>
                <div class="col-10">hoc van</div>
              </div>
              <div class="row g-0">
                <div class="col-2">
                  <center><i class="bi bi-suit-heart-fill fs-3"></i></center>
                </div>
                <div class="col-10">hon nhan</div>
              </div>
              <div class="row g-0">
                <div class="col-2">
                  <center><i class="bi bi-telephone-fill fs-3"></i></center>
                </div>
                <div class="col-10">Phone</div>
              </div>
              <div class="row g-0">
                <div class="col-2">
                  <center><i class="bi bi-geo-alt fs-3"></i></center>
                </div>
                <div class="col-10">map</div>
              </div>
              <div class="row g-0">
                <div class="col-2">
                  <center>
                    <i class="bi bi-calendar-heart-fill fs-3"></i>
                  </center>
                </div>
                <div class="col-10">birth day</div>
              </div>
            </div>
            <div class="row g-0 border">
              <div class="row g-0">Images</div>
              <div class="row g-0">
                <div
                  class="col-3 ms-2"
                  v-for="(image, index) in images"
                  :key="index"
                  style="height: 200px"
                >
                  <img class="w-100" :src="'http://localhost:8080' + image" />
                </div>
              </div>
            </div>
            <div class="row g-0 border">
              <div class="row g-0">Video</div>
              <div class="row g-0">
                <div
                  class="col-3 ms-2"
                  v-for="(video, index) in videos"
                  :key="index"
                  style="height: 200px"
                >
                  <video :src="'http://localhost:8080' + video"></video>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-8 row g-0"
            style="overflow: auto; height: 1000px"
            v-if="posts"
          >
            <div class="row g-0" v-for="post in posts" :key="post.id">
              <post-app :postP="post" :user="post.user" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-1"></div>
    </div>
    <div
      class="row g-0 d-flex align-items-center"
      v-if="!profile.id"
      style="height: 1000px"
    >
      <div class="row g-0">
        <center>
          <i class="bi bi-incognito fs-1"></i>
        </center>
        <center>
          <div>Choose person you want preview information</div>
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "../post/PostApp.vue";
import EditProfile from "@/views/pages/personal/profile/EditProfile.vue";
export default {
  components: {
    PostApp,
    EditProfile,
  },
  data() {
    return {
      profile: {},
      height: null,
      posts: [],
      images: [],
      videos: [],
    };
  },
  mounted() {
    this.height = $(window).height();
    this.profile = this.$route.params.profile;
    this.GetProfile();
  },
  methods: {
    GetProfile() {
      BaseRequest.get("posts/byPerson/" + this.profile.user_id).then((res) => {
        this.posts = res.data.posts;
      });
      BaseRequest.get("users/getImages/" + this.profile.user_id).then((res) => {
        this.images = res.data.images;
      });
      BaseRequest.get("users/getVideos/" + this.profile.user_id).then((res) => {
        this.videos = res.data.videos;
      });
    },
  },
};
</script>
