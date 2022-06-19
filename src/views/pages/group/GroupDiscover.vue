<template>
  <div
    id="carouselExampleInterval"
    class="carousel slide ms-5"
    data-bs-ride="carousel"
    v-if="(groups.length > 3)"
  >
    <h4 class="row g-0 mt-3 mb-3">
      Suggestions for you
    </h4>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="row g-0 ps-2">
          <div class="col-4 ps-2 border border-5 rounded">
            <group-item-join :group="groups[0]"/>
          </div>
          <div class="col-4 ps-2 border border-5 rounded">
            <group-item-join :group="groups[1]"/>
          </div>
          <div class="col-4 ps-2 border border-5 rounded">
            <group-item-join :group="groups[2]"/>
          </div>
        </div>
      </div>
      <div class="row g-0" v-if="(i <= groups.length - 6)">
        <div class="carousel-item" v-for="group in groups" :key="group.id">
          <div class="row g-0">
            <div class="col-4 ps-2  ps-2 border border-5 rounded">
              <group-item-join :group="groups[i]"/>
            </div>
            <div class="col-4 ps-2 ps-2 border border-5 rounded">
              <group-item-join :group="groups[i + 1]"/>
            </div>
            <div class="col-4 ps-2 ps-2 border border-5 rounded">
              <group-item-join :group="groups[i + 2]"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" @click="prev()" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleInterval"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" @click="next()" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import GroupItemJoin from "@/views/pages/group/GroupItemJoin.vue"
export default {
  components: {
    GroupItemJoin,
  },
  data() {
    return {
      groups: [],
      i: 1,
    };
  },
  mounted() {
    this.getGroup();
  },
  methods: {
    getGroup() {
      BaseRequest.get("groups").then((res) => {
        this.groups = res.data.groups;
      });
    },
    next() {
      this.i += 3;
    },
    prev() {
      this.i -= 3;
    },
  },
};
</script>
