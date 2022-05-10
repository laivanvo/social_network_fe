<template>
  <div class="col-2">
    <i
      @click="addLike()"
      v-show="!(comment.reactions.map((r) => r.user_id).indexOf(user.id) != -1)"
      class="bi bi-star"
    ></i>
    <i
      @click="addLike()"
      v-show="comment.reactions.map((r) => r.user_id).indexOf(user.id) != -1"
      class="bi bi-star-fill"
    ></i>
  </div>
</template>

<script>
import { bus } from "@/main";
import BaseRequest from '@/helpers/BaseRequest'

export default {
  props: {
    comment: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    addLike() {
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      BaseRequest.post("reaction", data)
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