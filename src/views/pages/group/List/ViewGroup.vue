<template>
  <div class="row">
    <div class="row m-0 p-0 border">
      <styledLink @click="info()" class="col-3">
        <h5>information</h5>
      </styledLink>
      <styledLink @click="member()" class="col-3">
        <h5>member</h5>
      </styledLink>
      <styledLink @click="post()" class="col-3">
        <h5>post</h5>
      </styledLink>
      <styledLink @click="search()" class="col-3">
        <h5>search</h5>
      </styledLink>
    </div>
    <div class="row m-0 p-0" v-show="isInfo">
      <group-info :group="group" class="row m-0 p-0" />
    </div>
    <div class="row m-0 p-0" v-show="isMember">
      <group-member :members="group.members" class="row m-0 p-0" />
    </div>
    <div class="row m-0 p-0" v-show="isPost">
      <group-post class="row m-0 p-0" />
    </div>
    <div class="row m-0 p-0" v-show="isSearch">
      <group-search class="row m-0 p-0" />
    </div>
  </div>
</template>

<script>
import styled, { css } from "vue-styled-components";
import GroupInfo from "@/views/pages/group/view/GroupInfo.vue";
import GroupMember from "@/views/pages/group/view/GroupMember.vue";
import GroupPost from "@/views/pages/group/view/GroupPost.vue";
import GroupSearch from "@/views/pages/group/view/GroupSearch.vue";
import BaseRequest from '@/helpers/BaseRequest';

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
    GroupInfo,
    GroupMember,
    GroupPost,
    GroupSearch,
  },
  created() {
    this.getGroup();
    console.log(this.$route.params.id)
  },
  data() {
    return {
      group: {},
      isInfo: false,
      isPost: false,
      isMember:false,
      isSearch: false,
    };
  },
  methods: {
    getGroup() {
        BaseRequest.get("groups/show/" + this.$route.params.id)
        .then((res) => {
            this.group = res.data.group
            console.log(this.group)
        })
    },
    info() {
      this.isInfo = true;
      this.isPost = false;
      this.isMember = false;
      this.isSearch = false;
    },
    post() {
      this.isInfo = false;
      this.isPost = true;
      this.isMember = false;
      this.isSearch = false;
    },
    member() {
      this.isInfo = false;
      this.isPost = false;
      this.isMember = true;
      this.isSearch = false;
    },
    search() {
      this.isInfo = false;
      this.isPost = false;
      this.isMember = false;
      this.isSearch = true;
    },

  },
};
</script>
