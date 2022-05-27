<template>
  <div class="row g-0">
    <div class="row g-0">
      <div class="col-3">
        <div
          class="row g-0 mb-3"
          :style="'overflow: auto; height: ' + height / 3 + 'px;'"
        >
          <div class="row g-0 mb-3 mt-3">
            <div class="col-auto ms-2 text-center">
              <img
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 50% 50% 50% 50%;
                "
                :src="'http://localhost:8080' + profile.avatar"
              />
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">
              <center>
                <div class="row g-0">
                  {{ profile.last_name + " " + profile.first_name }}
                </div>
              </center>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-people"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">Friend</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-collection-fill"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">Group</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-save2"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">Saved</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-star-fill"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">Favourite</div>
          </div>
          <div class="row g-0 mb-3">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-postcard-fill"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">recently</div>
          </div>
        </div>
        <div class="row g-0 border mb-3"></div>
        <div class="row g-0" style="overflow: auto; height: 300px">
          <div class="row g-0 mb-3" v-for="group in groups" :key="group.id">
            <div class="col-auto ms-2 text-center">
              <i
                class="w-100 ms-1 bi bi-star-fill"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-auto ms-4 d-flex align-items-center">favourite</div>
          </div>
        </div>
      </div>
      <div
        class="col-6"
        :style="
          'background-color: white; overflow: auto; height: ' + height + 'px;'
        "
      >
        <slot />
      </div>
      <div class="col-3 row ms-2">
        <div
          class="row g-0 d-flex align-items-start"
          :style="
            'background-color: white; overflow: auto;min-height: 10px; height: ' +
            height / 3 +
            'px;'
          "
        >
          <div class="row g-0">
            <div class="row g-0" v-for="request in requests" :key="request.id">
              <profile-app-member class="mb-2" :profile="request" />
            </div>
          </div>
        </div>
        <div
          class="row g-0 d-flex align-items-start"
          :style="
            'background-color: white; overflow: auto;min-height: 10px; height: ' +
            height / 3 +
            'px;'
          "
        >
          <div class="row g-0">
            <div class="row g-0" v-for="group in groups" :key="group.id">
              <group-item class="mb-2 row g-0" :group="group" />
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
import GroupItem from "@/views/pages/group/GroupItem.vue";
import ProfileAppMember from "../profile/ProfileAppMember.vue";

export default {
  components: {
    GroupItem,
    ProfileAppMember,
  },
  data() {
    return {
      profile: {},
      height: null,
      requests: [],
      groups: [],
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
      BaseRequest.get("groups/join").then((res) => {
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
