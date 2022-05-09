<template>
  <div name="post" class="border rounded p-4 bg-light">
    <div class="row">
      <div class="card col-2" style="width: 4rem">
        <img src="@/assets/logo.png" class="card-img-top" alt="..." />
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-4">
            <styledLink class="row">{{ post.user.name }}</styledLink>
            <div class="row">{{ new Date(post.created_at).toDateString() }}</div>
          </div>
        </div>
      </div>
      <i class="bi bi-card-list col-1"></i>
    </div>
    <div class="row">{{ post.name }}</div>
    <div class="row">{{ post.content }}</div>
    <div class="row">
      <div class="col-1">
        <i class="bi bi-star-half"></i>
      </div>
      <div class="col-2">{{ reactions.length }}</div>
    </div>
    <div></div>
    <div class="row">
      <div class="col-2">
        <i @click="addLike()" v-show="!like" class="bi bi-star"></i>
        <i @click="addLike()" v-show="like" class="bi bi-star-fill"></i>
      </div>
      <div class="col-2"></div>
      <div class="col-3" @click="showComment">
        <styledLink>{{ comments.length }} comment</styledLink>
      </div>
    </div>
    <div class="row" v-show="commentShow">
      <div v-for="item in pageOfItems" :key="item.id">
        <comment-post :comment="item" />
      </div>
      <div class="row" @click="loadMoreComment">
        <styledLink>load more</styledLink>
      </div>
      <jw-pagination
        :key="keyPage"
        v-show="false"
        :page-size="pageSize"
        :items="comments"
        @changePage="onChangePage"
      ></jw-pagination>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CommentPost from "./commentsPost/CommentPost.vue";
import styled, { css } from "vue-styled-components";

const styledLink = styled.p`
  &:hover {
    ${() => css`
      text-decoration: underline;
      color: blue;
    `}
  }
`;
export default {
  components: {
    CommentPost,
    styledLink,
  },
  props: {
    post: {
      type: Object,
    },
  },
  data() {
    return {
      like: true,
      comments: [],
      commentShow: false,
      reactions: [],
      pageOfItems: [],
      pageSize: 4,
      keyPage: 10000,
    };
  },
  created() {
    this.getReactions();
  },
  methods: {
    getReactions() {
      BaseRequest.post("reactions/", {
        id: this.post.id,
        type: "post",
      })
        .then((response) => {
          this.reactions = response.data.reactions;
          this.like = response.data.like;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments() {
      BaseRequest.get("comments/" + this.post.id)
        .then((response) => {
          this.comments = response.data.comments;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addLike() {
      BaseRequest.post("reaction/", {
        id: this.post.id,
        type: "post",
      })
        .then(() => {
          this.getReactions();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    showComment() {
      if (!this.comments.length) {
        this.getComments();
      }
      this.commentShow = !this.commentShow;
    },
    loadMoreComment() {
      this.pageSize += 4;
      this.keyPage++;
    },
  },
};
</script>
