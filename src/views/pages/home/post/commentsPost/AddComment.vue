<template>
  <div class="row">
    <div class="row">
      <div class="col-1"></div>
      <div class="col-11">
        <input
          v-on:keyup.enter="addComment"
          type="text"
          class="form-control"
          placeholder="comment in this"
          v-model="addText"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import { bus } from "@/main";
export default {
  data() {
    return {
      addText: "",
    };
  },
  props: {
    comment: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    addComment() {
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      data.append("text", this.addText);
      this.addText = "";
      BaseRequest.post("comment", data)
        .then(function () {
          bus.$emit("load");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>