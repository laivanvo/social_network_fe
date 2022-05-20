<template>
  <div class="row">
    <div class="col-4 row border" v-for="group in groups" :key="group.id">
      <app-group class="row" :group="group" :typeP="'send'" />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import AppGroup from "@/views/pages/group/List/AppGroup.vue";
import EventBus from '@/main'
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
      EventBus.$on('join', this.join);
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    getGroup() {
      let _this = this;
      BaseRequest.get("groups/send").then((res) => {
        _this.groups = res.data.groups;
      });
    },
    join(e) {
        this.groups.unshift(e);
        console.log(e)
    }
  },
};
</script>
