<template>
  <div class="row m-0 p-0">
    <div class="row m-0 p-0">
      <div class="col-4 m-0 p-0">
        <div class="col-8 row">
          <styledLink class="btn btn-primary col-3">
            <i class="bi bi-bank2 fs-1"></i>
          </styledLink>
          <input type="text" class="col-9" />
        </div>
      </div>
      <div class="col-4 m-0 p-0">
        <styledLink @click="homePage()" class="col-3">
          <i class="bi bi-house-door-fill fs-1"></i>
        </styledLink>
        <styledLink @click="personal()" class="col-3">
          <i class="bi bi-person-workspace fs-1"></i>
        </styledLink>
        <styledLink @click="forYou()" class="col-3"
          ><i class="bi bi-people-fill fs-1"></i
        ></styledLink>
        <styledLink @click="group()" class="col-3">
          <i class="bi bi-collection-fill fs-1"></i>
        </styledLink>
      </div>
      <div class="col-4 row m-0 p-0">
        <div class="col-8"></div>
        <div class="col-2" @click="login">Login</div>
        <div class="col-2" @click="register">register</div>
      </div>
    </div>
    <div class="row m-0 p-0">
      <div class="col-3"></div>
      <div class="col-6">
        <slot/>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="row"></div>
  </div>
</template>

<script>
import styled, { css } from "vue-styled-components";

const styledLink = styled.button`
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
  methods: {
    homePage() {
      this.$router.push('/home')
    },
    personal() {
      this.$router.push('/personal')
    },
    forYou() {
      this.$router.push('/for_you')
    },
    group() {
      this.$router.push('/group')
    },
    register() {
      this.$router.push('/register');
    },
    login() {
      this.$router.push('/login');
    }
  }
};
</script>
