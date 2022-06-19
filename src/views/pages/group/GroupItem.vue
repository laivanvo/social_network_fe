<template>
  <div class="row g-0" v-if="group">
    <div class="row g-0 dropdown-item" type="button">
      <div class="row g-0">
        <i class="col-3 ps-1 d-flex align-items-center">
          <center>
            <img
              :src="'http://localhost:8080' + group.avatar"
              style="width: 50px; height: 50px"
            />
          </center>
        </i>
        <div class="col-9 row g-0 ps-2">
          <h6 class="row g-0 mt-1 mb-1 text-truncate">{{ group.name }}</h6>
          <div class="row g-0 mb-3 opacity-50">
            {{ date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    group: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      date: "",
    };
  },
  mounted() {
    if (this.group) {
      this.date = moment(this.group.created_at, "YYYYMMDD").fromNow();
    }
  },
};
</script>
