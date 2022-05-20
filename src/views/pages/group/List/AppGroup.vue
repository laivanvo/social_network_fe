<template>
  <div class="row m-0 p-0">
    <div v-show="!isDelete" class="row m-0 p-0">
      <img
        :src="'http://localhost:8080' + group.avatar"
        class="row m-0 p-0"
        style="height: 8rem"
      />
      <p class="row m-0 p-0">welcome to {{ group.name }}</p>
      <p class="row m-0 p-0">
        Author:
        {{ group.user.profile.last_name + " " + group.user.profile.first_name }}
      </p>
      <p class="row m-0 p-0">Author's words: {{ group.word }}</p>
      <button class="row m-0 p-0 btn btn-primary" @click="joinGroup()">
        {{ type }}
      </button>
      <button class="row m-0 mt-2 mb-2 p-0 btn btn-primary" @click="view()">
        View
      </button>
    </div>
    <h1 v-show="isDelete" class="text-center row m-0 pt-5 pt-5">Joined</h1>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import EventBus from "@/main";

export default {
  props: {
    group: {
      type: Object,
    },
    typeP: {
      type: String,
    },
  },
  data() {
    return {
      type: "",
      isDelete: false,
    };
  },
  created() {
    this.type = this.typeP;
  },
  methods: {
    joinGroup() {
      if (this.typeP == "join") {
        let _this = this;
        BaseRequest.get("groups/join/" + this.group.id).then((res) => {
          _this.isDelete = true;
          EventBus.$emit("join", res.data.group);
        });
      }
    },
    view() {
      const id = this.group.id;
      this.$router.push({ name: 'view', params: {id: id}})
    },
  },
};
</script>
