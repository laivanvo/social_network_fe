<template>
  <div class="row" v-show="show">
    <div class="col-8">{{ relation.user_from.name }}</div>
    <i @click="response('accept')" class="bi bi-check col-2"></i>
    <i @click="response('refuse')" class="bi bi-x-lg col-2"></i>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";

export default {
  props: {
    relation: {
      type: Object,
    },
  },
  data() {
      return {
          show: true,
      }
  },
  methods: {
    response(type) {
      let _this = this;
      let data = new FormData();
      data.append("type", type);
      BaseRequest.post("relations/res/" + this.relation.user_from.id, data)
        .then(function () {
          _this.show = false;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
