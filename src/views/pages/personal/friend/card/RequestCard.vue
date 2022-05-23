<template>
  <div class="row g-0 ms-2 p-0">
    <img
        class="p-0"
        :src="'http://localhost:8080' + profile.avatar"
      />
    <button class="btn btn-primary" @click="accept()" v-show="!(isAccept || isDelete)">Accept</button>
    <button class="btn btn-secondary" @click="remove()"  v-show="!(isAccept || isDelete)">Delete</button>
    <input class="btn btn-secondary opacity-25" type="button" v-show="isAccept" disabled value="Accepted">
    <input class="btn btn-secondary opacity-25" type="button" v-show="isDelete" disabled value="Deleted">
  </div>
</template>

<script>
import $ from "jquery";

export default {
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      height: null,
      isAccept: false,
      isDelete: false,
    };
  },
  mounted() {
    this.height = $(window).height();
  },
  methods: {
      accept() {
          this.isAccept = true;
      },
      remove() {
          this.isDelete = true;
      }
  }
};
</script>
