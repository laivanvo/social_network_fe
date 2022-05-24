<template>
  <div class="row g-0 m-0 p-0" v-show="!isDelete">
    <div class="row g-0 m-0 p-0">
      <div class="col-auto d-flex align-items-center">
        <center>
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
            :src="'http://localhost:8080' + user.profile.avatar"
            alt=""
          />
        </center>
      </div>
      <div class="col-auto ms-1 row border rounded-pill ps-2 bg-light">
        <div class="col-auto">
          <div class="row g-0">
            <h6 class="col-5" style="white-space: nowrap">
              {{ user.profile.last_name + " " + user.profile.first_name }}
            </h6>
          </div>
          <div v-show="!isEdit" class="row g-0">
            <div>{{ editText }}</div>
          </div>
          <div v-show="isEdit" class="row g-0">
            <input
              type="text"
              v-on:keyup.enter="editComment"
              v-model="editText"
            />
          </div>
        </div>
        <div class="col-auto">
          <i
            class="bi bi-card-list"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          </i>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a @click="edit" class="dropdown-item"> Edit </a>
            </li>
            <li>
              <a @click="deleteComment" class="dropdown-item">Delete</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row g-0">
      <div class="col-3">
        <reaction-app :id="comment.id" :type="'comment'" :user="user" />
      </div>
      <div class="col-3" @click="showComment">
        <styledLink class="fs-6 fw-bold">rep</styledLink>
      </div>
    </div>
    <div class="row g-0 m-0 p-0">
      <div class="col-auto ms-1 border"></div>
      <div class="col-auto m-0 p-0">
        <div class="row g-0 m-0 p-0" v-show="commentShow">
          <div class="col-1 border">
            <center>
              <div class="row border d-flex align-items-center"></div>
            </center>
          </div>
          <div
            class="col-auto row g-0 m-0 p-0"
            v-for="item in comments"
            :key="item.id"
          >
            <RepComment1
              class="m-0 p-0"
              :commentP="comment"
              :comment="item"
              :user="user"
            />
          </div>
          <div class="row g-0" @click="loadMoreComment">
            <styledLink>load more</styledLink>
          </div>
          <input
            v-on:keyup.enter="addComment"
            type="text"
            class="form-control"
            placeholder="comment in this"
            v-model="addText"
          />
        </div>
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
import RepComment1 from "@/views/pages//post/commentsPost/repComment/RepComment1.vue";
import ReactionApp from "@/views/pages//post/commentsPost/ReactionApp.vue";
import BaseRequest from "@/helpers/BaseRequest";

export default {
  components: {
    styledLink,
    RepComment1,
    ReactionApp,
  },
  props: {
    comment: {
      type: Object,
    },
    user: {
      type: Object,
    },
    post: {
      type: Object,
    },
  },
  data() {
    return {
      commentShow: false,
      pageOfItems: [],
      addText: "",
      comments: [],
      page: 0,
      editText: "",
      isEdit: false,
      isDelete: false,
    };
  },
  mounted() {
    this.editText = this.comment.text;
  },
  methods: {
    getComment(page) {
      let data = new FormData();
      let _this = this;
      data.append("id", this.comment.id);
      data.append("type", "comment");
      BaseRequest.post("comments?page=" + page, data)
        .then((response) => {
          _this.comments = _this.comments.concat(response.data.comments.data);
          _this.countComment = response.data.countComment;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showComment() {
      this.getComment(++this.page);
      this.commentShow = !this.commentShow;
    },
    loadMoreComment() {
      this.getComment(++this.page);
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
    edit() {
      this.isEdit = !this.isEdit;
    },
    editComment() {
      let _this = this;
      let data = new FormData();
      data.append("text", this.editText);
      BaseRequest.post("comments/" + this.comment.id, data)
        .then(function () {
          _this.isEdit = !_this.isEdit;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    deleteComment() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.post.id);
      data.append("type", "post");
      BaseRequest.post("comment/destroy/" + this.comment.id, data)
        .then(function () {
          _this.isDelete = true;
          _this.$emit("deleteComment");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    addComment() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      data.append("text", this.addText);
      BaseRequest.post("comment", data)
        .then(function (res) {
          _this.addText = "";
          _this.comments.push(res.data.comment);
          _this.comment.count_rep++;
          _this.commentShow = true;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
