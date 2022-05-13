<template>
  <div class="col-2">
    <i
      @click="addLike()"
      v-show="!isLike"
      class="bi bi-star"
    ></i>
    <i
      @click="addLike()"
      v-show="isLike"
      class="bi bi-star-fill"
    ></i>
  </div>
</template>

<script>
import BaseRequest from '@/helpers/BaseRequest'

export default {
  props: {
    id: {
      type: Number,
    },
    type: {
      type: String,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      isLike: false,
    }
  },
  methods: {
    getReaction() {
      let data = new FormData();
      data.append("id", this.id);
      data.append("type", this.type);
      BaseRequest.post("reactions", data)
        .then((response) => {
          this.isLike = response.data.isLike;
          this.countReaction = response.data.count;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addLike() {
      let data = new FormData();
      data.append("id", this.id);
      data.append("type", this.type);
      BaseRequest.post("reaction", data)
        .then(function () {
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
