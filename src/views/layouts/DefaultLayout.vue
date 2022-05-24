<template>
  <div class="row g-0">
    <div class="row g-0">
      <div class="col-3">
        <div
          class="row g-0 mb-3"
          :style="'overflow: auto; height: ' + height / 3 + 'px;'"
        >
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <img
                style="
                  width: 50px;
                  height: 50px;
                  border-radius: 50% 50% 50% 50%;
                "
                :src="'http://localhost:8080' + profile.avatar"
              />
            </div>
            <div class="col-10 d-flex align-items-center">
              {{ profile.last_name + " " + profile.first_name }}
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-people"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">Friend</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-collection-fill"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">Group</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-save2"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">Saved</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-star-fill"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">Favourite</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-postcard-fill"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">recently</div>
          </div>
        </div>
        <div class="row g-0 border mb-3"></div>
        <div class="row g-0" style="overflow: auto; height: 300px">
          <div class="row g-0 mb-3" v-for="group in groups" :key="group.id">
            <div class="col-2 text-center">
              <i
                class="fs-3 w-100 ms-1 bi bi-star-fill"
                style="color: blue; border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10 d-flex align-items-center">favourite</div>
          </div>
        </div>
      </div>
      <div
        class="col-6"
        :style="'background-color: white; overflow: auto; height: ' + height + 'px;'"
      >
        <slot />
      </div>
      <div class="col-3 row ms-2">
        <div class="row g-0 d-flex align-items-start" :style="'background-color: white; overflow: auto;min-height: 10px; height: ' + height / 3 + 'px;'">
          <div class="row g-0">
            <div class="row g-0" v-for="request in requests" :key="request.id">
            <profile-app class="mb-2" :profile="request" />
          </div>
          </div>
        </div>
        <div class="row g-0 d-flex align-items-start" :style="'background-color: white; overflow: auto;min-height: 10px; height: ' + height / 3 + 'px;'">
          <div class="row g-0">
            <div class="row g-0" v-for="request in requests" :key="request.id">
            <profile-app class="mb-2" :profile="request" />
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row g-0"></div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import $ from "jquery";
import ProfileApp from "@/views/profile/ProfileApp.vue";

export default {
  components: {
    ProfileApp,
  },
  data() {
    return {
      profile: {},
      groups: [],
      height: null,
      requests: [],
    };
  },
  mounted() {
    this.getProfile();
    this.getGroup();
    this.height = $(window).height();
    this.getRequestFriend();
  },
  methods: {
    getProfile() {
      BaseRequest.get("posts/profile").then((res) => {
        this.profile = res.data.profile;
      });
    },
    getGroup() {
      BaseRequest.get("groups/mec").then((res) => {
        this.groups = res.data.groups;
      });
    },
    getRequestFriend() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.requests = res.data.profiles;
      });
    },
  },
};
</script>
