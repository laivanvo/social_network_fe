<template>
  <div class="row">
      <create-group/>
    <div v-for="item in groups" :key="item.id">
        {{item.name}}
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CreateGroup from '@/views/pages/group/CreateGroup.vue'
export default {
    components: {
        CreateGroup,
    },
  data() {
    return {
      groups: [],
    };
  },
  methods: {
    getGroup() {
      let _this = this;
      BaseRequest.get("groups").then((res) => {
        _this.groups = res.data.groups.data;
      });
    },
  },
};
</script>
