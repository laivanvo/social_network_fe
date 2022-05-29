<template>
  <div class="row g-0">
    <div class="row g-0" :is="layout">
     <div class="row g-0">
          <friend-request />
      </div>
      <div class="row g-0">
          <friend-discover />
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import FriendPageLayout from "@/views/layouts/FriendPageLayout.vue";
import RequestCard from "@/views/pages/personal/friend/card/RequestCard.vue";
import SuggestCard from "@/views/pages/personal/friend/card/SuggestCard.vue";
import FriendDiscover from './FriendDiscover.vue';
import FriendRequest from './friendRequest.vue';

export default {
  components: { RequestCard, SuggestCard, FriendDiscover, FriendRequest },
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    this.getRequest();
  },
  methods: {
    getRequest() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.requests = res.data.profiles;
      });
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? FriendPageLayout;
    },
  },
};
</script>
