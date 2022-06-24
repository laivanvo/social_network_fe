<template>
  <div class="row g-0">
    <div class="row g-0 bg-light" v-if="profile.id">
      <div class="col-1"></div>
      <div class="col-auto ps-2 mt-2 row g-0 bg-white">
        <div class="row g-0 d-flex align-items-start">
          <div class="row g-0">
            <div class="row g-0" v-if="profile.id">
              <div class="row g-0 ps-5 ps-5 pe-5">
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
                    <h5 class="col-auto ms-2 mt-3" style="font-weight: bold">
                      {{ profile.last_name + " " + profile.first_name }}
                    </h5>
                  </div>
                  <div class="row g-0">
                    <div class="col-9"></div>
                    <edit-profile
                      :profileP="profile"
                      @editProfile="editProfile($event)"
                      class="col-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 d-flex align-items-start">
          <div class="row g-0 col-4 border">
            <div class="row g-0 border" style="overflow: auto, height: 300px">
              <div class="row g-0 mb-3">welcome to profile of me!!!!</div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center><i class="bi bi-briefcase-fill fs-3"></i></center>
                </div>
                <div class="col-auto ms-5 mt-2">zinza technology</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center><i class="bi bi-mortarboard-fill fs-3"></i></center>
                </div>
                <div class="col-auto ms-5 mt-2">12/12</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center><i class="bi bi-suit-heart-fill fs-3"></i></center>
                </div>
                <div class="col-auto ms-5 mt-2">Single</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center><i class="bi bi-telephone-fill fs-3"></i></center>
                </div>
                <div class="col-auto ms-5 mt-2">{{ profile.phone_number }}</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center><i class="bi bi-geo-alt fs-3"></i></center>
                </div>
                <div class="col-auto ms-5 mt-2">{{ profile.address }}</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                  <center>
                    <i class="bi bi-calendar-heart-fill fs-3"></i>
                  </center>
                </div>
                <div class="col-auto ms-5 mt-2">{{ profile.birthday }}</div>
              </div>
            </div>
            <div class="row g-0 border">
              <div class="row g-0">Images</div>
              <div class="row g-0">
                <div
                  class="col-3 ms-2"
                  v-for="(image, index) in images"
                  :key="index"
                  style="height: 100px"
                  type="button"
                  @click="showPost()"
                >
                  <img
                    class="w-100"
                    :src="'http://localhost:8080' + image.path"
                  />
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
                  style="height: 100px"
                >
                  <video
                    class="w-100"
                    :src="'http://localhost:8080' + video.path"
                  ></video>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-8 row g-0"
            style="overflow: auto; height: 1000px"
            v-if="posts"
          >
            <div
              class="row g-0 border border-5 rounded mb-3"
              v-for="post in posts"
              :key="post.id"
            >
              <post-app :postP="post" :user="post.user" />
            </div>
          </div>
        </div>
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
  name: "PersonalAuth",
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
    editProfile(profile) {
      this.profile = profile;
      BaseRequest.get("posts/byPerson/" + this.profile.user_id).then((res) => {
        this.posts = res.data.posts;
      });
    },
    showPost() {
      this.$router.push({
        name: "postShow",
        params: { post: this.post, user: this.user },
      });
    },
  },
};
</script>
