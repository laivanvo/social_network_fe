<template>
  <div name="post" v-show="!isDelete" class="row g-0 m-0 p-0">
    <edit-post-modal
      :id="'postEdit' + post.id"
      :user="user"
      :postPre="post"
      class="row g-0 m-0 p-0"
      @updatePost="updatePost($event)"
    />
    <div class="row g-0 m-0 p-0">
      <div class="col-1">
        <img
          style="
            border-radius: 50% 50% 50% 50%;
            height: 50px;
            width: 50px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :src="'http://localhost:8080' + user.profile.avatar"
          alt=""
        />
      </div>
      <div class="col-10">
        <div class="row g-0">
          <div class="col-4">
            <div class="row g-0 no-gutters">
              <styledLink @click="personal" class="col-6">
                {{ user.profile.last_name + " " + user.profile.first_name }}
              </styledLink>
              <i
                @click="request('add')"
                v-show="isNone"
                class="bi bi-person-plus col-2"
              ></i>
              <i
                @click="request('undo')"
                v-show="isRequest"
                class="bi bi-person-x col-2"
              ></i>
              <i v-show="isFriend" class="bi bi-person-check col-2"></i>
            </div>
            <div class="row g-0">
              {{ new Date(post.created_at).toDateString() }}
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown col-1">
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
            <a
              class="dropdown-item"
              data-bs-toggle="modal"
              :data-bs-target="'#postEdit' + post.id"
            >
              Edit
            </a>
          </li>
          <li>
            <a class="dropdown-item" @click="deletePost">Delete</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="bg-white m-0 p-0 row ms-2 mt-3 mb-3"
      :style="post.bg_image"
    >
      {{ post.text }}
    </div>
    <div class="row g-0 m-0 p-0">
      <img
        v-show="image"
        class="row g-0 m-0"
        :src="'http://localhost:8080' + post.file"
      />
      <video v-show="video" class="row g-0 m-0 p-0" controls>
        <source :src="'http://localhost:8080' + post.file" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
    <div class="row g-0 m-0 p-0 mb-3">
      <div class="col-3">
        <reaction-app :id="post.id" :type="'post'" />
      </div>
      <div class="col-9" @click="showComment">
        <div class="row g-0">
          <div class="col-8"></div>
          <div class="col-4">{{ post.count_comment }} comment</div>
        </div>
        <styledLink class="row g-0">
          <div class="col-2"></div>
          <div class="col-10 fw-bold fs-6">comment</div>
        </styledLink>
      </div>
    </div>
    <div class="row g-0 m-0 mb-2">
      <div class="col-1">
        <img
          style="
            border-radius: 50% 50% 50% 50%;
            height: 40px;
            width: 40px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :src="'http://localhost:8080' + user.profile.avatar"
          alt=""
        />
      </div>
      <div class="col-11 d-flex align-items-center">
        <input
          v-on:keyup.enter="addComment"
          type="text"
          class="form-control rounded-pill"
          placeholder="comment in this"
          v-model="addText"
        />
      </div>
    </div>
    <div class="row g-0 m-0 p-0" v-show="commentShow">
      <div class="row g-0 m-0 p-0" v-for="comment in comments" :key="comment.id">
        <comment-post
          class="bg-light text-dark"
          :comment="comment"
          :user="user"
          @deleteComment="deleteComment()"
          :post="post"
        />
      </div>
      <div class="row g-0" @click="loadMoreComment">
        <styledLink>load more</styledLink>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CommentPost from "./commentsPost/CommentPost.vue";
import styled, { css } from "vue-styled-components";
import EditPostModal from "@/views/pages//post/createPostModal/EditPostModal.vue";
import ReactionApp from "./commentsPost/ReactionApp.vue";

const styledLink = styled.h6`
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
    EditPostModal,
    ReactionApp,
  },
  props: {
    postP: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      commentShow: false,
      keyPage: 10000,
      image: false,
      video: false,
      edit: false,
      file: this.postP.file,
      text: "",
      bg_image: "",
      addText: "",
      comments: [],
      page: 0,
      isLike: false,
      countReaction: 0,
      countComment: 0,
      isDelete: false,
      post: {},
      isNone: false,
      isRequest: false,
      isFriend: false,
    };
  },
  created() {
    this.post = this.postP;
  },
  mounted() {
    this.text = this.post.text;
    if (this.post.bg_image) {
      this.post.bg_image =
        "background-image: url(http://localhost:8080" +
        this.post.bg_image +
        ")";
    }
    this.getFile();
    this.getRelation();
  },
  methods: {
    getComment(page) {
      let data = new FormData();
      let _this = this;
      data.append("id", this.post.id);
      data.append("type", "post");
      BaseRequest.post("comments?page=" + page, data)
        .then((response) => {
          response.data.comments.data.forEach((e) => {
            _this.comments.map((x) => x.id).indexOf(e.id) === -1
              ? _this.comments.push(e)
              : console.log("This item already exists");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showComment() {
      this.commentShow = !this.commentShow;
      if (!this.comments.length) {
        this.getComment(++this.page);
      }
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
        this.video = false;
      } else if (this.post.type === "video") {
        this.video = true;
        this.image = false;
      }
    },
    EditPost() {
      this.edit = true;
    },
    addComment() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.post.id);
      data.append("type", "post");
      data.append("text", this.addText);
      BaseRequest.post("comment", data)
        .then(function (res) {
          _this.addText = "";
          _this.comments.unshift(res.data.comment);
          _this.post.count_comment++;
          _this.commentShow = true;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    deleteComment() {
      this.post.count_comment--;
    },
    deletePost() {
      let _this = this;
      BaseRequest.post("posts/" + this.post.id)
        .then(function () {
          _this.isDelete = !_this.isDelete;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    updatePost(post) {
      this.post = post;
      if (this.post.bg_image) {
        this.post.bg_image =
          "background-image: url(http://localhost:8080" +
          this.post.bg_image +
          ")";
      }
      this.getFile();
    },
    getRelation() {
      let _this = this;
      BaseRequest.get("relations/index/" + this.post.user.id)
        .then(function (res) {
          console.log(res);
          _this.getType(res.data.type);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    request(type) {
      let _this = this;
      let data = new FormData();
      data.append("type", type);
      BaseRequest.post("relations/send/" + this.post.user.id, data)
        .then(function (res) {
          _this.getType(res.data.type);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    getType(type) {
      if (type === "res request") {
        this.isNone = false;
        this.isRequest = true;
        this.isFriend = false;
      } else if (type === "res friend") {
        this.isNone = false;
        this.isRequest = true;
        this.isFriend = false;
      } else if (type === "request") {
        this.isNone = false;
        this.isRequest = true;
        this.isFriend = false;
      } else if (type === "friend") {
        this.isNone = false;
        this.isRequest = false;
        this.isFriend = true;
      } else {
        this.isNone = true;
        this.isRequest = false;
        this.isFriend = false;
      }
    },
  },
};
</script>
