<template>
  <div class="row">
    <div class="col-1">
      <img src="@/assets/logo.png" class="card-img-top" alt="..." />
    </div>
    <div class="col-11">
      <div class="row">{{ comment.user.name }}</div>
      <div class="row">{{ comment.content }}</div>
      <div class="row">
        <div class="col-2">
          <i @click="addLike()" v-show="!like" class="bi bi-star"></i>
          <i @click="addLike()" v-show="like" class="bi bi-star-fill"></i>
        </div>
        <div class="col-2"></div>
        <div class="col-3"><styledLink>rep</styledLink></div>
        <div class="col-3"></div>
        <div class="col-2">{{ reactions.length }} like</div>
      </div>
    </div>
  </div>
</template>

<script>
import styled, { css } from "vue-styled-components";

const styledLink = styled.p`
  &:hover {
    ${() => css`
      text-decoration: underline;
      color: blue;
    `}
  }
`;
import BaseRequest from "@/helpers/BaseRequest";
export default {
  components: {
    styledLink,
  },
  props: {
    comment: {
      type: Object,
    },
  },
  data() {
    return {
      like: true,
      reactions: [],
    };
  },
  mounted() {
    this.getReactions();
  },
  methods: {
    getReactions() {
      BaseRequest.post("reactions/", {
        id: this.comment.id,
        type: "comment",
      })
        .then((response) => {
          this.reactions = response.data.reactions;
          this.like = response.data.like;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addLike() {
      BaseRequest.post("reaction/", {
        id: this.comment.id,
        type: "comment",
      })
        .then(() => {
          this.getReactions();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
