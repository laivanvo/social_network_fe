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
        <reaction-app :comment="comment" :user="user" />
        <div class="col-2"></div>
        <div class="col-3" @click="showComment">
          <styledLink>comment</styledLink>
        </div>
        <div class="col-2">{{ comment.reactions.length }} like</div>
      </div>
      <div class="row">
        <div class="row" v-show="commentShow">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-11">
              <input
                v-on:keyup.enter="addComment"
                type="text"
                class="form-control"
                placeholder="comment in this"
                v-model="addText"
              />
            </div>
          </div>
          <div v-for="item in pageOfItems" :key="item.id">
            <RepComment2 :comment="item" :user="user" />
          </div>
          <div class="row" @click="loadMoreComment">
            <styledLink>load more</styledLink>
          </div>
          <jw-pagination
            :key="keyPage"
            v-show="false"
            :page-size="pageSize"
            :items="comment.replies"
            @changePage="onChangePage"
          ></jw-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styled, { css } from "vue-styled-components";
import DropDownComment from "@/views/pages/home/post/commentsPost/DropDownComment.vue";
const styledLink = styled.p`
  &:hover {
    ${() => css`
      text-decoration: underline;
      color: blue;
    `}
  }
`;
import BaseRequest from "@/helpers/BaseRequest";
import RepComment2 from "@/views/pages/home/post/commentsPost/repComment/RepComment2.vue";
import { bus } from "@/main";
import ReactionApp from "@/views/pages/home/post/commentsPost/ReactionApp.vue";

export default {
  components: {
    styledLink,
    RepComment2,
    DropDownComment,
    ReactionApp,
  },
  props: {
    comment: {
      type: Object,
    },
    ReactionApp: {
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
    };
  },
  mounted() {},
  methods: {
    addLike() {
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      BaseRequest.post("reaction", data)
        .then(function () {
          bus.$emit("load");
        })
        .catch(function (err) {
          console.log(err);
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
    addComment() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      data.append("text", this.addText);
      this.addText = "";
      BaseRequest.post("comment", data)
        .then(function (res) {
          console.log(res);
          _this.getComments();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
