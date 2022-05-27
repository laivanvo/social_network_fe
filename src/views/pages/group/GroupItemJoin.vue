<template>
  <div class="row g-0">
    <img
      :src="'http://localhost:8080' + group.avatar"
      class="d-block w-100 mb-3"
      style="height: 300px"
    />
    <h4 class="row g-0 mb-3">
      {{ group.name }}
    </h4>
    <div class="row g-0 mb-3 opacity-50">
      {{ group.members.length }} member - 5 posts per day
    </div>
    <center>
      <button
        v-show="!isJoin"
        class="btn btn-secondary w-75 mb-3"
        @click="joinGroup(group.id)"
      >
        Join Group
      </button>
      <button
        disabled
        v-show="isJoin"
        class="opacity-25 btn btn-secondary w-75 mb-3"
      >
        Joined
      </button>
    </center>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
  props: {
    group: {
      type: Object,
    },
  },
  data() {
    return {
      isJoin: false,
    };
  },
  methods: {
    joinGroup() {
      BaseRequest.get("groups/join/" + this.group.id).then(() => {
        this.isJoin = true;
      });
    },
  },
};
</script>
