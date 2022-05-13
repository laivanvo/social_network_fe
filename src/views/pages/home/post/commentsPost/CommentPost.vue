<template>
  <div class="row">
    <div class="col-1">
      <img src="@/assets/logo.png" class="card-img-top" alt="..." />
    </div>
    <div class="col-11">
      <div class="row">{{ comment.user.name }}</div>
      <div class="row">
        <div class="col-10">
          {{ comment.text }}
        </div>
        <div class="col-2">
          <drop-down-comment :comment="comment" />
        </div>
      </div>
      <div class="row">
        <reaction-app :id="comment.id" :type="'comment'" :user="user" />
        <div class="col-2"></div>
        <div class="col-3" @click="showComment">
          <styledLink>comment</styledLink>
        </div>
        <div class="col-2">{{ 2 }} like</div>
      </div>
      <div class="row">
        <div class="row" v-show="commentShow">
          <div v-for="item in commnents" :key="item.id">
            <RepComment1 :comment="item" :user="user" />
          </div>
          <div class="row" @click="loadMoreComment">
            <styledLink>load more</styledLink>
          </div>
          <add-comment :comment="comment" :user="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styled, { css } from "vue-styled-components";
import AddComment from "@/views/pages/home/post/commentsPost/AddComment.vue";
import DropDownComment from "@/views/pages/home/post/commentsPost/DropDownComment.vue";
const styledLink = styled.p`
  &:hover {
    ${() => css`
      text-decoration: underline;
      color: blue;
    `}
  }
`;
import RepComment1 from "@/views/pages/home/post/commentsPost/repComment/RepComment1.vue";
import ReactionApp from "@/views/pages/home/post/commentsPost/ReactionApp.vue";
import BaseRequest from "@/helpers/BaseRequest";

export default {
  components: {
    styledLink,
    RepComment1,
    DropDownComment,
    ReactionApp,
    AddComment,
  },
  props: {
    comment: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      like: true,
      commentShow: false,
      pageOfItems: [],
      pageSize: 4,
      keyPage: 10000,
      addText: "",
      comments: [],
    };
  },
  mounted() { this.getComment },
  methods: {
    getComment(page) {
      let data = new FormData();
      data.append("id", this.post.id);
      data.append("type", "comment");
      BaseRequest.post("comments?page=" + page, data)
        .then((response) => {
          this.comments = this.comments.concat(response.data.comments.data);
          this.countCommnet = response.data.countCommnet
          console.log(this.comments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    showComment() {
      this.commentShow = !this.commentShow;
    },
    loadMoreComment() {
      this.pageSize += 4;
      this.keyPage++;
    },
    personal() {
      this.$router.push({ name: "personal" });
    },
    getFile() {
      if (this.post.type === "image") {
        this.image = true;
      } else if (this.post.type === "video") {
        this.video = true;
      }
    },
    EditPost() {
      this.edit = true;
    },
  },
};
</script>
