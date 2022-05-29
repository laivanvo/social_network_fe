<template>
  <div class="row g-0">
    <div class="row g-0 pt-3 pb-3 border" style="background-color: white">
      <div class="col-4 row g-0">
        <div
          type="button"
          @click="homePage()"
          class="col-auto ms-2 d-flex align-items-center"
        >
          <i class="fa fa-home fs-1" aria-hidden="true"></i>
        </div>
        <div
          class="col-auto ms-2 d-flex align-items-center"
          style="position: relative"
        >
          <input
            type="text"
            id="search"
            @focus="isSearch = true"
            @blur="isSearch = false"
            class="border border-1 fs-5 rounded-pill"
            style="position: absolute"
            placeholder="      input in social-media"
          />
          <i
            v-show="!isSearch"
            style="color: blue; position: absolute"
            class="bi bi-search ms-2"
          ></i>
        </div>
      </div>
      <div class="col-4 row g-0">
        <div type="button" @click="homePage()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-house-door fs-3"></i>
          </div>
        </div>
        <div type="button" @click="personal()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-person-workspace fs-3"></i>
          </div>
        </div>
        <div type="button" @click="forYou()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-people fs-3"></i>
          </div>
        </div>
        <div type="button" @click="group()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="fa fa-users fs-3 mt-2"></i>
          </div>
        </div>
      </div>
      <div
        class="
          col-4
          row
          ps-0
          m-0
          bg-light
          d-flex
          align-items-center
          text-center
        "
      >
        <div class="col-auto row g-0" type="button" @click="ViewPersonal()">
          <div class="col-auto">
            <img
              style="
                border-radius: 50%;
                height: 30px;
                width: 30px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
              "
              :src="'http://localhost:8080' + profile.avatar"
              alt=""
            />
          </div>
          <div class="col-auto ms-2 d-flex align-items-center text-center">
            {{ profile.last_name + " " + profile.first_name }}
          </div>
        </div>
        <div
          class="
            col-auto
            ms-auto
            me-1
            ps-0
            border
            d-flex
            align-items-center
            text-center
          "
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <center><i class="bi bi-bell ms-2"></i></center>
        </div>
        <div
          class="col-auto me-1 ps-0 border d-flex align-items-center"
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <center>
            <i class="fa fa-ellipsis-h ms-2"></i>
          </center>
        </div>
      </div>
    </div>
    <div class="row g-0 pt-3 pb-3 border me-0">
      <slot />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
  components: {},
  data() {
    return {
      profile: {},
      groups: [],
      isSearch: false,
    };
  },
  mounted() {
    this.getProfile();
    this.getGroup();
  },
  methods: {
    homePage() {
      this.$router.push("/home");
    },
    personal() {
      this.$router.push("/personal");
    },
    forYou() {
      this.$router.push("/for_you");
    },
    group() {
      this.$router.push("/group");
    },
    register() {
      this.$router.push("/register");
    },
    login() {
      this.$router.push("/login");
    },
    getProfile() {
      BaseRequest.get("posts/profile").then((res) => {
        this.profile = res.data.profile;
      });
    },
    getGroup() {
      BaseRequest.get("groups/mec").then((res) => {
        this.groups = res.data.groups;
      });
    },
    inputSearch() {
      alert(1);
    },
    ViewPersonal() {
      this.$router.push({
        name: "personal",
        params: { profile: this.profile },
      });
    },
  },
};
</script>
