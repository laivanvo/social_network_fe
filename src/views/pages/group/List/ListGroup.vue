<template>
  <div class="row m-0 p-0">
    <div class="col-4 m-0 p-0 row border" v-for="group in groups" :key="group.id">
      <app-group class="row" :group="group" :typeP="'join'" />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import AppGroup from "@/views/pages/group/List/AppGroup.vue";
export default {
  components: {
    AppGroup,
  },
  data() {
    return {
      groups: [],
    };
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    getGroup() {
      let _this = this;
      BaseRequest.get("groups").then((res) => {
        _this.groups = res.data.groups;
      });
    },
  },
};
</script>
