<template>
  <div class="row g-0 m-0 p-0">
    <div class="row g-0 m-0 p-0">
      <div class="col-3 border">
        <div class="row g-0 mb-3" style="overflow: auto; height: 200px">
          <div class="row g-0 mb-3">
            <h5 class="col-2">Group</h5>
            <div class="col-9"></div>
            <div class="col-1"></div>
          </div>
          <div class="row g-0 mb-3">
            <i class="col-2 bi bi-search h-100 m-0"></i>
            <input
              type="text"
              class="col-10 h-100 rounder-end"
              placeholder="search group"
            />
          </div>
          <div class="row g-0 mb-3 dropdown-item" type="button">
            <div class="row g-0">
              <div class="col-2 text-center">
                <i
                  class="w-100 ms-1 bi bi-card-checklist"
                  style="border-radius: 50% 50% 50% 50%"
                >
                </i>
              </div>
              <div class="col-10" @click="showPostGroup()">My feed</div>
            </div>
          </div>
          <div class="row g-0 mb-3 dropdown-item" type="button">
            <div class="row g-0">
              <div class="col-2 text-center">
                <i
                  class="w-100 ms-1 bi bi-globe"
                  style="border-radius: 50% 50% 50% 50%"
                >
                </i>
              </div>
              <div @click="showDiscover()" class="col-10">discover</div>
            </div>
          </div>
          <div class="row g-0 mb-3 dropdown-item" type="button">
            <div class="row g-0">
              <div class="col-2 text-center">
                <i
                  class="w-100 ms-1 bi bi-bell"
                  style="border-radius: 50% 50% 50% 50%"
                >
                </i>
              </div>
              <div class="col-10">Notification</div>
            </div>
          </div>
        </div>
        <create-group :profile="profile" />
        <div class="row g-0 border ms-3 me-3 mb-1"></div>
        <h5 class="row g-0 mb-1">My groups</h5>
        <div class="row g-0" style="overflow: auto; max-height: 250px">
          <div
            @click="viewGroup(group)"
            class="row g-0 mb-1"
            v-for="group in groups"
            :key="group.id"
          >
            <group-item :group="group" />
          </div>
        </div>
        <div class="row g-0 border ms-3 me-3 mb-1"></div>
        <h5 class="row g-0 mb-1">The group you joined</h5>
        <div class="row g-0" style="overflow: auto; height: 250px">
          <div
            @click="viewGroup(group)"
            class="row g-0 mb-1"
            v-for="join in joins"
            :key="join.id"
          >
            <div class="col-10">
              <group-item :group="join" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-9" style="overflow: auto; max-height: 1000px">
        <slot />
      </div>
    </div>
    <div class="row g-0"></div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CreateGroup from "@/views/pages/group/List/CreateGroup.vue";
import GroupItem from "@/views/pages/group/GroupItem.vue";
import EventBus from "@/main";
export default {
  components: {
    CreateGroup,
    GroupItem,
  },
  data() {
    return {
      profile: {},
      groups: [],
      isDiscover: false,
      joins: [],
    };
  },
  mounted() {
    this.getProfile();
    this.getGroup();
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
      BaseRequest.get("groups/listJoin").then((res) => {
        this.joins = res.data.groups;
      });
    },
    showDiscover() {
      EventBus.$emit("showDiscoverGroup");
    },
    showPostGroup() {
      EventBus.$emit("showPostGroup");
    },
    viewGroup(group) {
      this.$router.push({ name: "groupView", params: { group: group } });
    },
  },
};
</script>
