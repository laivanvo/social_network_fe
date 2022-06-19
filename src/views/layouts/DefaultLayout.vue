<template>
  <div class="row g-0">
    <div class="row g-0">
      <div class="col-3">
        <div
          class="row g-0 mb-3"
          :style="'overflow: auto; height: ' + height / 3 + 'px;'"
        >
          <div class="row g-0 mb-3 mt-3">
            <div class="row g-0 dropdown-item" type="button">
              <div class="row g-0" v-if="profile.id">
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
            </div>
          </div>
          <div class="row g-0 mb-3" @click="goFriend()">
            <div class="row g-0 dropdown-item" type="button">
              <div class="row g-0">
                <div class="col-auto ms-2 text-center">
                  <i
                    class="ms-1 bi bi-people"
                    style="border-radius: 50% 50% 50% 50%"
                  >
                  </i>
                </div>
                <div class="col-auto ms-4 d-flex align-items-center">
                  Friend
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="row g-0 dropdown-item" @click="group" type="button">
              <div class="row g-0">
                <div class="col-auto ms-2 text-center">
                  <i
                    class="w-100 ms-1 bi bi-collection-fill"
                    style="border-radius: 50% 50% 50% 50%"
                  >
                  </i>
                </div>
                <div class="col-auto ms-4 d-flex align-items-center">Group</div>
              </div>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="row g-0 dropdown-item" @click="goSave()" type="button">
              <div class="row g-0">
                <div class="col-auto ms-2 text-center">
                  <i
                    class="w-100 ms-1 bi bi-save2"
                    style="border-radius: 50% 50% 50% 50%"
                  >
                  </i>
                </div>
                <div class="col-auto ms-4 d-flex align-items-center">Saved</div>
              </div>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="row g-0 dropdown-item" type="button">
              <div class="row g-0">
                <div class="col-auto ms-2 text-center">
                  <i
                    class="w-100 ms-1 bi bi-star-fill"
                    style="border-radius: 50% 50% 50% 50%"
                  >
                  </i>
                </div>
                <div class="col-auto ms-4 d-flex align-items-center">
                  Favourite
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0 mb-3">
            <div class="row g-0 dropdown-item" type="button">
              <div class="row g-0">
                <div class="col-auto ms-2 text-center">
                  <i
                    class="w-100 ms-1 bi bi-postcard-fill"
                    style="border-radius: 50% 50% 50% 50%"
                  >
                  </i>
                </div>
                <div class="col-auto ms-4 d-flex align-items-center">
                  recently
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-0 mb-3"></div>
        <div class="row g-0 border mt-3 ms-3 me-3 mb-3"></div>
        <div class="row g-0 mb-3">My groups</div>
        <div class="row g-0 d-flex align-items-start" style="overflow: auto; height: 400px">
          <div
            @click="viewGroup(group)"
            class="row g-0 mb-3"
            v-for="group in groups"
            :key="group.id"
          >
            <group-item :group="group" v-if="group.id"/>
          </div>
        </div>
      </div>
      <div
        class="col-6"
        :style="
          'background-color: white; overflow: auto; height: ' +
          2 * height +
          'px;'
        "
      >
        <slot />
      </div>
      <div class="col-3 row g-0 d-flex align-items-start">
        <div class="row g-0">
          <h5 @click="viewToRequest()" type="button" class="row g-0 mb-3">List request</h5>
          <div
            class="row g-0 d-flex align-items-start"
            :style="
              'background-color: white; overflow: auto;min-height: 10px; height: ' +
              height / 3 +
              'px;'
            "
          >
            <div class="row g-0">
              <div
                class="row g-0"
                v-for="request in requests"
                :key="request.id"
              >
                <profile-app-member class="mb-2" :profile="request" />
              </div>
            </div>
          </div>
          <div class="row g-0 border mb-2"></div>
          <h5 class="row g-0 mb-3">List friend</h5>
          <div
            class="row g-0 d-flex align-items-start"
            :style="
              'background-color: white; overflow: auto;min-height: 10px; height: ' +
              height / 3 +
              'px;'
            "
          >
            <div class="row g-0">
              <div
                class="row g-0"
                v-for="friend in friends"
                :key="friend.id"
              >
                <profile-app-member class="mb-2 bg-light" :profile="friend" />
              </div>
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
      friends: [],
    };
  },
  mounted() {
    this.getGroup();
    this.getProfile();
    this.height = $(window).height();
    this.getRequestFriend();
    this.getFriend();
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
    getFriend() {
      BaseRequest.get("relation/listFriend").then((res) => {
        this.friends = res.data.profiles;
      });
    },
    goFriend() {
      this.$router.push({ name: "friend" });
    },
    viewGroup(group) {
      this.$router.push({ name: "groupView", params: { group: group } });
    },
    viewToRequest() {
      this.$router.push({ name: "request" });
    },
    group() {
      this.$router.push("/group");
    },
    goSave() {
      this.$router.push('save');
    }
  },
};
</script>
