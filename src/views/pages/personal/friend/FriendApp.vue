<template>
  <div class="row border m-0 p-3" v-show="show">
    <img
      :src="'http://localhost:8080' + profile.avatar"
      id="avatar"
      class="m-0 col-2 rounded"
    />
    <div class="col-1"></div>
    <h5 class="col-5">{{profile.last_name + " " + profile.first_name}}</h5>
    <i @click="response('accept')" class="bi bi-check col-2"></i>
    <i @click="response('refuse')" class="bi bi-x-lg col-2"></i>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";

export default {
  props: {
    profile: {
      type: Object,
    },
  },
  data() {
    return {
      show: true,
    };
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
