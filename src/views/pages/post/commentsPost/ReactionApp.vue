<template>
  <div class="row g-0 ms-2">
    <div class="row g-0" v-show="isPost">
      <i type="button" @click="addLike()" v-show="!isLike" class="fa fa-thumbs-o-up opacity-50">
        like</i
      >
      <i type="button" @click="addLike()" v-show="isLike" class="fa fa-thumbs-up">
        Like</i
      >
    </div>
    <div class="row ms-2 g-0" v-show="!isPost">
      <i type="button" @click="addLike()" v-show="!isLike" class="fa fa-thumbs-o-up opacity-50">
        like</i
      >
      <i type="button" @click="addLike()" v-show="isLike" class="fa fa-thumbs-up">
        Like</i
      >
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";

export default {
  props: {
    id: {
      type: Number,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      isLike: false,
      isPost: false,
    };
  },
  mounted() {
    this.getReaction();
    this.isPost = this.type === "post" ? true : false;
  },
  methods: {
    getReaction() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.id);
      data.append("type", this.type);
      BaseRequest.post("reactions", data)
        .then((response) => {
          _this.isLike = response.data.isLike;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addLike() {
      let data = new FormData();
      let _this = this;
      data.append("id", this.id);
      data.append("type", this.type);
      BaseRequest.post("reaction", data)
        .then(function () {
          _this.isLike = !_this.isLike;
          if (!_this.isLike) {
            _this.$emit("addLike", "unlike");
          } else {
            _this.$emit("addLike", "like");
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
