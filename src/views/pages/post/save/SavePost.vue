<template>
  <div class="row g-0">
    <div class="col-2 bg-white"></div>
    <div class="col-10 row g-0 bg-light">
      <div class="col-2"></div>
      <div class="col-8 pt-3">
        <div
          class="row g-0 mb-3 pt-3 rounded border bg-white"
          v-for="save in saves"
          :key="save.id"
        >
          <post-item class="row g-0" :post="save.post" :user="user"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  data() {
    return {
      saves: [],
      user: {},
    };
  },
  mounted() {
    this.getSave();
  },
  methods: {
    getSave() {
      BaseRequest.get("saves").then((res) => {
        this.saves = res.data.saves;
        this.user = res.data.user;
      });
    },
  },
};
</script>
