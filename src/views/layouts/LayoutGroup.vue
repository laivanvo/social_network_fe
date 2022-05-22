<template>
  <div class="row m-0 p-0">
    <div class="row m-0 p-0">
      <div class="col-3">
        <div class="row mb-3" style="overflow: auto; height: 200px">
          <div class="row mb-3">
            <div class="col-2">Group</div>
            <div class="col-9"></div>
            <div class="col-1"></div>
          </div>
          <div class="row mb-3">
            <i class="col-2 bi bi-search h-100 m-0"></i>
            <input
              type="text"
              class="col-10 h-100 rounder-end"
              placeholder="search group"
            />
          </div>
          <div class="row mb-3">
            <div class="col-2 text-center">
              <i
                class="w-100 ms-1 bi bi-card-checklist"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10">My feed</div>
          </div>
          <div class="row mb-3">
            <div class="col-2 text-center">
              <i
                class="w-100 ms-1 bi bi-globe"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10">discover</div>
          </div>
          <div class="row mb-3">
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
        <create-group :profile="profile"/>
        <div class="row border mb-3"></div>
        <div class="row mb-3">My groups</div>
        <div class="row" style="overflow: auto; height: 200px">
          <div class="row mb-3" v-for="group in groups" :key="group.id">
            <div class="col-2 text-center">
              <i
                class="w-100 ms-1 bi bi-star-fill"
                style="border-radius: 50% 50% 50% 50%"
              >
              </i>
            </div>
            <div class="col-10">favourite</div>
          </div>
        </div>
      </div>
      <div class="col-7" style="overflow: auto; height: 1000px">
        <slot />
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CreateGroup from "@/views/pages/group/List/CreateGroup.vue";
export default {
  components: {
    CreateGroup,
  },
  data() {
    return {
      profile: {},
      groups: [],
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
    },
  },
};
</script>
