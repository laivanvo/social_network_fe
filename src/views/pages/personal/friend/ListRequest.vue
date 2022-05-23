<template>
  <div class="row g-0" :is="layout">
    abc
  </div>
</template>

<script>
import AppFriend from "@/views/pages/personal/friend/AppFriend.vue";
import BaseRequest from "@/helpers/BaseRequest";
import ListRequestLayout from "@/views/layouts/ListRequestLayout.vue";
export default {
  components: {
    AppFriend,
  },

  computed: {
    layout() {
      return this.$route.meta.layout ?? ListRequestLayout;
    },
  },
  data() {
    return {
      profiles: [],
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      let _this = this;
      BaseRequest.get("relation/listRequest").then((res) => {
        _this.profiles = res.data.profiles.data;
      });
    },
  },
};
</script>
