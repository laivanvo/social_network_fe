<template>
  <div class="row g-0 bg-white">
    <div class="col-2 border" :style="'height: ' + height + 'px;'">
      <div class="row g-0 mt-2">
        <div class="col-auto ms-2">
          <h4>Friend</h4>
        </div>
      </div>
      <div class="row g-0">
        <div class="row g-0 mb-3">
          <div class="col-auto ms-2 text-center">
            <i
              class="fs-3 w-100 ms-1 bi bi-people"
              style="border-radius: 50% 50% 50% 50%"
            >
            </i>
          </div>
          <div class="col-auto ms-2 d-flex align-items-center">Friend Page</div>
        </div>
        <div class="row g-0 mb-3" @click="showRequest()">
          <div class="col-auto ms-2 text-center">
            <i
              class="fs-3 w-100 ms-1 bi bi-collection-fill"
              style="border-radius: 50% 50% 50% 50%"
            >
            </i>
          </div>
          <div class="col-auto ms-2 d-flex align-items-center">Request</div>
        </div>
        <div class="row g-0 mb-3">
          <div class="col-auto ms-2 text-center">
            <i
              class="fs-3 w-100 ms-1 bi bi-save2"
              style="border-radius: 50% 50% 50% 50%"
            >
            </i>
          </div>
          <div class="col-auto ms-2 d-flex align-items-center">suggest</div>
        </div>
      </div>
    </div>
    <div class="col-10 border">
      <slot class="row g-0 p-0" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      height: null,
    };
  },
  mounted() {
    this.height = $(window).height();
  },
  methods: {
    showRequest() {
      this.$router.push({ path: "/request" });
    },
  },
};
</script>
