<template>
  <div class="row g-0">
    <div class="col-2 border" style="height: 1000px">
      <div class="row g-0 mt-3 mb-3">
        <h6 class="col-auto">Manager Group</h6>
        <div class="col-3"></div>
        <div class="col-auto ms-auto me-3">
          <i class="bi bi-list"></i>
        </div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <img
            style="width: 50px; height: 50px"
            :src="'http://localhost:8080' + group.avatar"
          />
        </div>
        <div class="col-auto row g-0 ms-2 mb-3">
          <h6 class="row g-0 ms-2">
            {{ group.name }}
          </h6>
          <div class="row g-0 opacity-50">
            <div class="col-auto ms-2">
              <i class="bi bi-unlock"></i>
            </div>
            <div class="col-auto ms-2">
              {{ group.audience }}
            </div>
          </div>
        </div>
      </div>
      <div @click="showPage()" class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i class="bi bi-house"></i>
        </div>
        <div class="col-auto ms-2">Group Page</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i class="bi bi-book"></i>
        </div>
        <div class="col-auto ms-2">Overview</div>
      </div>
      <div class="row g-0 mb-3 d-flex align-items-center">
        <center><div class="row g-0 mb-3 border w-75"></div></center>
      </div>
      <h6 class="row g-0 opacity-50 mb-3">Administration Tools</h6>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-person-plus"></i>
        </div>
        <div class="col-auto ms-2">Request Membership</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-people"></i>
        </div>
        <div class="col-auto ms-2">Membership</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-archive"></i>
        </div>
        <div class="col-auto ms-2">Post In The Queue</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-file-earmark-ruled"></i>
        </div>
        <div class="col-auto ms-2">The Rule</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-camera"></i>
        </div>
        <div class="col-auto ms-2">Image</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-camera-video"></i>
        </div>
        <div class="col-auto ms-2">Video</div>
      </div>
      <div class="row g-0 mb-3">
        <div class="col-auto ms-2">
          <i style="color: blue;" class="bi bi-gear"></i>
        </div>
        <div class="col-auto ms-2">Setting</div>
      </div>
    </div>
    <div class="col-10 row g-0">
      <div class="col-2"></div>
      <div class="col-8">
        <slot class="row g-0" />
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.group = this.$route.params.group ? this.$route.params.group : null;
    if (!this.group) {
      this.group = JSON.parse(
        window.localStorage.getItem("groupView", this.group)
      );
    }
    window.localStorage.setItem("groupView", JSON.stringify(this.group));
  },
  data() {
    return {
      group: {},
    };
  },
  methods: {
    showPage() {
      this.isPage = true;
    }
  }
};
</script>
