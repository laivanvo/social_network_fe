<template>
  <div class="row g-0">
    <div class="row g-0">
      <div
        class="col-3 border"
        :style="'overflow: auto; height: ' + height + 'px;'"
      >
        <div class="row g-0 mb-2">Request</div>
        <div class="row g-0 mb-2" v-for="item in profiles" :key="item.id">
          <personal-item :profileP="item"/>
        </div>
      </div>
      <div class="col-9 row g-0">
          <slot :profile="profile" class="row g-0"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import PersonalItem from "../pages/personal/PersonalItem.vue";
import $ from "jquery";

export default {
  components: { PersonalItem },
  data() {
    return {
      profiles: [],
      height: null,
      profile: {},
    };
  },
  mounted() {
    this.getRequest();
    this.height = $(window).height();
  },
  methods: {
    getRequest() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.profiles = res.data.profiles;
      });
    },
    showProfile(profile) {
      this.profile = profile;
    }
  },
};
</script>
