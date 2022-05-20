<template>
  <div class="row">
    <create-group class="row" />
    <div class="row border">
      <styledLink @click="listOfMe()" class="col-3">
        <i class="bi bi-house-door-fill fs-1"></i>
      </styledLink>
      <styledLink @click="list()" class="col-3">
        <i class="bi bi-person-workspace fs-1"></i>
      </styledLink>
      <styledLink @click="listSend()" class="col-3"
        ><i class="bi bi-people-fill fs-1"></i
      ></styledLink>
    </div>
    <div class="row m-0 p-0" v-show="isOfMe">
      <list-of-me class="row m-0 p-0"/>
    </div>
    <div class="row m-0 p-0" v-show="isList">
      <list-send class="row m-0 p-0"/>
    </div>
    <div class="row m-0 p-0" v-show="isSend">
      <list-group class="row m-0 p-0"/>
    </div>
  </div>
</template>

<script>

import ListOfMe from "@/views/pages/group/List/ListOfMe.vue";
import ListSend from "@/views/pages/group/List/ListSend.vue";
import ListGroup from "@/views/pages/group/List/ListGroup.vue";
import CreateGroup from "@/views/pages/group/List/CreateGroup.vue";
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
    ListOfMe,
    ListSend,
    ListGroup,
    CreateGroup,
    styledLink,
  },
  data() {
    return {
      isOfMe: true,
      isSend: false,
      isList: false,
    };
  },
  methods: {
    listOfMe() {
      this.isOfMe = true;
      this.isSend = false;
      this.isList = false;
    },
    listSend() {
      this.isOfMe = false;
      this.isSend = true;
      this.isList = false;
    },
    list() {
      this.isOfMe = false;
      this.isSend = false;
      this.isList = true;
    },
  },
};
</script>
