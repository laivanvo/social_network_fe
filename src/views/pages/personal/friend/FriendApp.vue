<template>
  <div class="row g-0">
    <div class="row g-0" :is="layout">
      <div class="row g-0 mt-2">
        <div class="col-11"><h5>Request</h5></div>
        <div class="col-1"><h5>View All</h5></div>
      </div>
      <div class="row g-0 mt-2 ms 2">
        <div style="width: 12.5%;" v-for="request in requests" :key="request.id">
          <request-card :profile="request"/>
        </div>
      </div>
      <div class="row g-0">
        <div class="col-11"><h5>Suggest</h5></div>
        <div class="col-1"><h5>View All</h5></div>
      </div>
      <div class="row g-0">
        <div class="col-2" v-for="suggest in suggests" :key="suggest.id">
          <suggest-card :profile="suggest"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import FriendPageLayout from "@/views/layouts/FriendPageLayout.vue";
import RequestCard from "@/views/pages/personal/friend/card/RequestCard.vue";
import SuggestCard from "@/views/pages/personal/friend/card/SuggestCard.vue";

export default {
  components: { RequestCard, SuggestCard },
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      requests: [],
      suggests: [],
    };
  },
  mounted() {
    this.getRequest();
    this.getSuggest();
  },
  methods: {
    getRequest() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.requests = res.data.profiles;
      });
    },
    getSuggest() {
      BaseRequest.get("relations/listSuggest").then((res) => {
        this.suggests = res.data.profiles;
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
