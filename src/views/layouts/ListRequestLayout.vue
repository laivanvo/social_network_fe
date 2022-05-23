<template>
  <div class="row g-0">
    <div class="row g-0">
      <div
        class="col-2"
        :style="'overflow: auto; height: ' + height / 3 + 'px;'"
      >
        <div class="row g-0 mb-2">Request</div>
        <div class="row g-0 mb-2" v-for="profile in profiles" :key="profile.id">
          <personal-item :profile="profile" />
        </div>
      </div>
      <div class="col-10 row g-0">
          <slot class="row g-0"/>
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
    };
  },
  mounted() {
    this.getRequest();
    this.getSuggest();
    this.height = $(window).height();
  },
  methods: {
    getRequest() {
      BaseRequest.get("relations/listRequest").then((res) => {
        this.profiles = res.data.profiles;
      });
    },
  },
};
</script>
