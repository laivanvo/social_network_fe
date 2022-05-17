<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-4">
      <div class="row">
        <div class="row">
          <input type="text" class="row" placeholder="search by name" />
        </div>
        <div class="row" v-for="relation in relations" :key="relation.id">
          <request-friend
            :relation="relation"
          />
        </div>
      </div>
    </div>
    <div class="col-3"></div>
  </div>
</template>

<script>
import RequestFriend from "@/views/pages/personal/request/RequestFriend.vue";
import BaseRequest from "@/helpers/BaseRequest";
export default {
  components: {
    RequestFriend,
  },
  data() {
    return {
      relations: [],
    };
  },
  mounted() {
    this.getRelation();
  },
  methods: {
    getRelation() {
      let _this = this;
      BaseRequest.get("relations")
        .then((response) => {
          _this.relations = response.data.relations;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
