<template>
  <div class="row m-0 p-0">
    <div class="row p-3 border mb-3" style="background-color: white">
      <button class="btn col-3 bg-secondary p-0 border">
        <i class="col-1 bi bi-search h-100 m-0"></i>
        <input
          type="text"
          class="col-11 h-100 rounder-end"
          placeholder="input in social-media"
        />
      </button>
      <div class="col-1"></div>
      <div class="col-4">
        <styledLink @click="homePage()" class="col-3 m-0 p-0 h-100">
          <i class="bi bi-house-door fs-5"></i>
        </styledLink>
        <styledLink @click="personal()" class="col-3 m-0 p-0 h-100">
          <i class="bi bi-person-workspace fs-5"></i>
        </styledLink>
        <styledLink @click="forYou()" class="col-3 m-0 p-0 h-100"
          ><i class="bi bi-people fs-5"></i
        ></styledLink>
        <styledLink @click="group()" class="col-3 m-0 p-0 h-100">
          <i class="bi bi-collection fs-5"></i>
        </styledLink>
      </div>
      <div class="col-4 row m-0 bg-light">
        <img
          class="col-2"
          style="border-radius: 50% 50% 50% 50%"
          :src="'http://localhost:8080' + profile.avatar"
        />
        <div class="col-5">
          {{ profile.last_name + " " + profile.first_name }}
        </div>
        <div class="col-1 border p-2" style="border-radius: 50% 50% 50% 50%">
          <i class="bi bi-bell"></i>
        </div>
        <div class="col-1 border p-2" style="border-radius: 50% 50% 50% 50%">
          <i class="bi bi-card-list"></i>
        </div>
      </div>
    </div>
    <div class="row">
        <slot/>
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
    };
  },
  mounted() {
    this.getProfile();
    this.getGroup()
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
  },
};
</script>
