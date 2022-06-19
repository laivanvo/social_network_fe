<template>
  <div class="row g-0">
    <div class="row g-0 bg-light" v-if="profile.id" >
      <div class="row g-0 bg-white">
        <div class="row g-0 d-flex align-items-start">
          <div class="row g-0">
            <div class="row g-0 border" v-if="profile.id">
              <div class="row g-0">
                <img
                  :style="
                    'width: 74.4%; height: ' +
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
                    <h5 mt-3 class="col-3">
                      {{ profile.last_name + " " + profile.first_name }}
                    </h5>
                  </div>
                  <div class="row g-0">
                    <div class="col-3">33 same Friend</div>
                    <div class="col-6"></div>
                    <button
                      @click="addFriend()"
                      class="col-3 btn btn-primary"
                      v-show="isNone"
                    >
                      Add friend
                    </button>
                    <button
                      class="col-3 btn btn-primary"
                      v-show="isRequestByMe"
                      @click="destroyRelation()"
                    >
                      Requested
                    </button>
                    <div class="col-3 dropdown" v-show="isRequestToMe">
                      <button
                        class="dropdown-toggle btn btn-primary"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Response
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li @click="accept()">
                          <a class="dropdown-item">Accept</a>
                        </li>
                        <li @click="destroyRelation()">
                          <a class="dropdown-item">delete</a>
                        </li>
                      </ul>
                    </div>
                    <button
                      @click="destroyRelation()"
                      class="col-3 btn btn-primary"
                      v-show="isFriendByMe || isFriendToMe"
                    >
                      Friend
                    </button>
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
                <div class="col-2">
                  <center><i class="bi bi-briefcase-fill fs-3"></i></center>
                </div>
                <div class="col-10 ps-2 mt-2">zinza technology</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-2">
                  <center><i class="bi bi-mortarboard-fill fs-3"></i></center>
                </div>
                <div class="col-10 ps-2 mt-2">12/12</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-2">
                  <center><i class="bi bi-suit-heart-fill fs-3"></i></center>
                </div>
                <div class="col-10 ps-2 mt-2">Single</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-2">
                  <center><i class="bi bi-telephone-fill fs-3"></i></center>
                </div>
                <div class="col-10 ps-2 mt-2">{{ profile.phone_number }}</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-2">
                  <center><i class="bi bi-geo-alt fs-3"></i></center>
                </div>
                <div class="col-10 ps-2 mt-2">{{ profile.address }}</div>
              </div>
              <div class="row g-0 mb-3">
                <div class="col-2">
                  <center>
                    <i class="bi bi-calendar-heart-fill fs-3"></i>
                  </center>
                </div>
                <div class="col-10 ps-2 mt-2">{{ profile.birthday }}</div>
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
            class="col-8 row g-0 d-flex align-items-start"
            style="overflow: auto; height: 1000px"
            v-if="posts"
          >
            <div class="row g-0">
              <div class="row g-0" v-for="post in posts" :key="post.id">
                <post-app :postP="post" :user="post.user" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
import EventBus from "@/main";
import $ from "jquery";
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "../post/PostApp.vue";
export default {
  components: { PostApp },
  data() {
    return {
      profile: {},
      height: null,
      posts: [],
      images: [],
      videos: [],
      relation: {},
      isNone: false,
      isRequestByMe: false,
      isRequestToMe: false,
      isFriendByMe: false,
      isFriendToMe: false,
    };
  },
  mounted() {
    this.height = $(window).height();
  },
  created() {
    EventBus.$on("showProfile", this.GetProfile);
  },
  methods: {
    GetProfile(e) {
      this.profile = e;
      BaseRequest.get("posts/byPerson/" + this.profile.user_id).then((res) => {
        this.posts = res.data.posts;
      });
      BaseRequest.get("users/getImages/" + this.profile.user_id).then((res) => {
        this.images = res.data.images;
      });
      BaseRequest.get("users/getVideos/" + this.profile.user_id).then((res) => {
        this.videos = res.data.videos;
      });
      BaseRequest.get("relations/check/" + this.profile.user_id).then((res) => {
        this.checkType(res.data.type);
        this.relation = res.data.relation;
      });
    },
    addFriend() {
      BaseRequest.get("relations/send/" + this.profile.user_id).then(() => {
        this.checkType("requestByMe");
        BaseRequest.get("relations/check/" + this.profile.user_id).then(
          (res) => {
            this.checkType(res.data.type);
            this.relation = res.data.relation;
          }
        );
      });
    },
    accept() {
      BaseRequest.get("relations/accept/" + this.relation.id).then(() => {
        this.checkType("friendToMe");
      });
    },
    destroyRelation() {
      if (confirm("Are you sure cancel this relation!")) {
        BaseRequest.get("relations/destroy/" + this.relation.id).then(() => {
          this.checkType("none");
        });
      }
    },
    checkType(type) {
      if (type == "none") {
        this.isNone = true;
        this.isRequestByMe = false;
        this.isRequestToMe = false;
        this.isFriendByMe = false;
        this.isFriendToMe = false;
      }
      if (type == "requestByMe") {
        this.isNone = false;
        this.isRequestByMe = true;
        this.isRequestToMe = false;
        this.isFriendByMe = false;
        this.isFriendToMe = false;
      }
      if (type == "requestToMe") {
        this.isNone = false;
        this.isRequestByMe = false;
        this.isRequestToMe = true;
        this.isFriendByMe = false;
        this.isFriendToMe = false;
      }
      if (type == "friendByMe") {
        this.isNone = false;
        this.isRequestByMe = false;
        this.isRequestToMe = false;
        this.isFriendByMe = true;
        this.isFriendToMe = false;
      }
      if (type == "friendToMe") {
        this.isNone = false;
        this.isRequestByMe = false;
        this.isRequestToMe = false;
        this.isFriendByMe = false;
        this.isFriendToMe = true;
      }
    },
  },
};
</script>
