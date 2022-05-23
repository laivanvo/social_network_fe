<template>
  <div class="row g-0 m-0 p-0">
    <div
      class="col-4 row border m-0 p-0"
      v-for="(group, index) in groups"
      :key="index"
    >
      <app-group class="row g-0 m-0 p-0" :group="group" :typeP="'me'" />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import AppGroup from "@/views/pages/group/List/AppGroup.vue";
import EventBus from "@/main";

export default {
  components: {
    AppGroup,
  },
  data() {
    return {
      groups: [],
    };
  },
  created() {
    this.getGroup();
    EventBus.$on("createGroup", this.createGroup);
  },
  methods: {
    getGroup() {
      BaseRequest.get("groups/me").then((res) => {
        this.groups = res.data.groups;
      });
    },
    createGroup(e) {
      this.groups.unshift(e);
    },
  },
};
</script>
