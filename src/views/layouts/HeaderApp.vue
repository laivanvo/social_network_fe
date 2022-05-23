<template>
  <div class="row g-0 m-0">
    <div class="row g-0 pt-3 pb-3 me-0 border" style="background-color: white">
      <div class="col-4 row ">
        <styledLink @click="homePage()" class="col-1 d-flex align-items-center">
          <i style="color: blue" class="bi bi-house-door fs-2"></i>
        </styledLink>
        <div class="col-7 d-flex align-items-center" style="position: relative">
          <input
            type="text"
            id="search"
            @focus="isSearch = true"
            @blur="isSearch = false"
            class="rounded-pill"
            style="position: absolute"
            placeholder="        input in social-media"
          />
          <i
            v-show="!isSearch"
            style="color: blue; position: absolute"
            class="bi bi-search ms-2"
          ></i>
        </div>
      </div>
      <div class="col-4 ps-0  row">
        <styledLink @click="homePage()" class="col-3  ps-0 d-flex align-items-center">
          <i style="color: blue" class="bi bi-house-door fs-3"></i>
        </styledLink>
        <styledLink @click="personal()" class="col-3  ps-0 d-flex align-items-center">
          <i style="color: blue" class="bi bi-person-workspace fs-3"></i>
        </styledLink>
        <styledLink @click="forYou()" class="col-3  ps-0 d-flex align-items-center"
          ><i style="color: blue" class="bi bi-people fs-3"></i
        ></styledLink>
        <styledLink @click="group()" class="col-3  ps-0 d-flex align-items-center">
          <i style="color: blue" class="bi bi-collection fs-3"></i>
        </styledLink>
      </div>
      <div class="col-4 row ps-0  m-0 bg-light d-flex align-items-center">
        <div class="col-2 ps-0 ">
          <img
            style="
              border-radius: 50%;
              height: 50px;
              width: 50px;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            :src="'http://localhost:8080' + profile.avatar"
            alt=""
          />
        </div>
        <div class="col-3 ps-0  d-flex align-items-center">
          {{ profile.last_name + " " + profile.first_name }}
        </div>
        <div class="col-5 ps-0 "></div>
        <div
          class="col-1 ps-0  border d-flex align-items-center justify-content-center"
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <i style="color: blue" class="bi bi-bell"></i>
        </div>
        <div
          class="
            col-1
            ps-0
            border
            d-flex
            align-items-center
            justify-content-center
          "
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <i style="color: blue" class="bi bi-card-list"></i>
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
import styled, { css } from "vue-styled-components";
const styledLink = styled.label`
  &:hover {
    ${() => css`
      color: blue;
    `}
  }
`;
export default {
  components: {
    styledLink,
  },
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
  },
};
</script>
