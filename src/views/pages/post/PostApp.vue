<template>
  <div name="post" v-show="!isDelete" class="row g-0" v-if="user && post">
    <edit-post-modal
      :id="'postEdit' + post.id"
      :user="post.user"
      :postPre="post"
      class="row g-0"
      @updatePost="updatePost($event)"
    />
    <div class="row g-0">
      <div class="col-auto ms-1" type="button">
        <img
          style="
            border-radius: 50% 50% 50% 50%;
            height: 30px;
            width: 30px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :src="'http://localhost:8080' + post.user.profile.avatar"
          alt=""
        />
      </div>
      <div class="col-auto ms-1 g-0">
        <div class="row g-0">
          <div class="row g-0 d-flex align-items-center">
            <center class="row g-0">
              <div
                type="button"
                class="col-auto ms-1"
                style="font-weight: bold"
              >
                {{
                  post.user.profile.last_name +
                  " " +
                  post.user.profile.first_name
                }}
              </div>
              <div class="col-auto ms-2 opacity-50">added a new post.</div>
            </center>
          </div>
          <div class="row g-0 ms-1">
            {{ new Date(post.created_at).toDateString() }}
          </div>
        </div>
      </div>
      <div class="col-auto ms-auto">
        <div class="dropdown col-auto ms-auto me-3">
          <i
            class="fa fa-ellipsis-h"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          </i>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-show="isAuthor">
              <a
                class="dropdown-item"
                data-bs-toggle="modal"
                :data-bs-target="'#postEdit' + post.id"
              >
                Edit
              </a>
            </li>
            <li v-show="isAuthor">
              <a class="dropdown-item" @click="deletePost">Delete</a>
            </li>
            <li>
              <a
                class="dropdown-item"
                type="button"
                @click="offComment"
                v-show="isAuthor && !isOffComment"
                >turn off comments</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                type="button"
                @click="onComment"
                v-show="isAuthor && isOffComment"
                >turn on comments</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-white row g-0 ps-2 mt-3 mb-3" :style="post.bg_image">
      {{ post.text }}
    </div>
    <div class="row g-0">
      <div class="col-4 row g-0 ps-2 pe-2" v-for="file in post.files" :key="file.id">
      <img
      v-if="file.type === 'image'"
        :src="'http://localhost:8080' + file.path"
      />
      <video v-else controls>
        <source :src="'http://localhost:8080' + file.path" type="video/mp4" />
      </video>
    </div>
    </div>

    <div class="d-flex align-items-center row g-0">
      <div class="col-auto mt-3 mb-2 ms-2">
        <i type="button" class="fa fa-thumbs-o-up" aria-hidden="true">
          {{ post.count_reaction }}</i
        >
      </div>
      <div class="col-auto ms-auto me-1">{{ post.count_comment }} comment</div>
    </div>
    <div class="row g-0">
      <div class="col-10 g-0 ms-5 mb-2 me-5 border"></div>
    </div>

    <div class="row g-0 mb-3">
      <div class="col-5">
        <reaction-app @addLike="addLike($event)" :id="post.id" :type="'post'" />
      </div>
      <div
        class="col-auto mt-3 mb-3 d-flex align-items-center"
        @click="showComment"
      >
        <div
          @mouseover="over('showComment' + post.id)"
          @mouseleave="leave('showComment' + post.id)"
          :id="'showComment' + post.id"
          type="button"
        >
          comment
        </div>
      </div>
    </div>
    <div class="row g-0" v-show="!isBlock">
      <div class="row g-0 m-0 mb-1">
        <div class="col-auto ms-1">
          <img
            style="
              border-radius: 50% 50% 50% 50%;
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
        </div>
        <div
          class="col-10 row g-0 ms-1"
          style="position: relative"
          v-show="!isOffComment"
        >
          <input
            v-on:keyup.enter="addComment"
            type="text"
            class="form-control ms-1 me-1 rounded-pill"
            placeholder="comment in this"
            v-model="addText"
            style="position: absolute"
          />
          <div class="col-11">
            <input
              type="file"
              :id="'file' + post.id"
              @change="onChange"
              v-show="false"
            />
          </div>
          <div class="col-1 d-flex align-items-center">
            <label :for="'file' + post.id">
              <i class="bi bi-camera fs-4 opacity-50"></i>
            </label>
          </div>
        </div>
        <div
          class="col-10 row g-0 ms-1"
          style="position: relative"
          v-show="isOffComment"
        >
          <input
            v-on:keyup.enter="addComment"
            type="text"
            class="form-control ms-1 me-1 rounded-pill opacity-50"
            value="Comments have been turned off"
            style="position: absolute"
            disabled
          />
          <div class="col-11"></div>
          <div class="col-1 d-flex align-items-center">
            <i class="bi bi-camera fs-4 opacity-50"></i>
          </div>
        </div>
      </div>
      <div class="row g-0 mb-2">
        <img
          :id="'imageCMT' + post.id"
          v-show="imageCmt"
          class="w-25 g-0"
          :src="'http://localhost:8080' + fileName"
        />
        <video
          :id="'videoCMT' + post.id"
          v-show="videoCmt"
          width="row"
          controls
        >
          <source :src="'http://localhost:8080' + fileName" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>
      <div class="row g-0" v-show="commentShow">
        <div class="row g-0" v-for="comment in comments" :key="comment.id">
          <comment-post
            class="bg-white text-dark row g-0"
            :commentP="comment"
            :user="user"
            @deleteComment="deleteComment()"
            :post="post"
            :isPostAuthor="isAuthor"
            :blocks="blocks"
          />
        </div>
        <div class="row g-0" @click="loadMoreComment">
          <div
            @mouseover="over('load' + post.id)"
            @mouseleave="leave('load' + post.id)"
            :id="'load' + post.id"
            type="button"
          >
            load more
          </div>
        </div>
      </div>
    </div>
    <div class="row g-0" v-show="isBlock">
      <div class="row g-0 m-0 mb-1">
        <div class="col-auto ms-1">
          <img
            style="
              border-radius: 50% 50% 50% 50%;
              height: 30px;
              width: 30px;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
            "
            :src="'http://localhost:8080' + post.user.profile.avatar"
            alt=""
          />
        </div>
        <div
          class="col-10 row g-0 ms-1 d-flex align-items-center"
          style="position: relative"
        >
          <input
            disabled
            v-on:keyup.enter="addComment"
            type="text"
            class="form-control ms-1 me-1 rounded-pill"
            placeholder="you are block by author"
            v-model="addText"
            style="position: absolute"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CommentPost from "./commentsPost/CommentPost.vue";
import EditPostModal from "@/views/pages//post/createPostModal/EditPostModal.vue";
import ReactionApp from "./commentsPost/ReactionApp.vue";
import $ from "jquery";

export default {
  components: {
    CommentPost,
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
      file: "",
      imageCmt: false,
      videoCmt: false,
      fileName: null,
      isBlock: false,
      isAuthor: false,
      blocks: [],
      isOffComment: false,
      listImage: [],
    };
  },
  created() {
    this.post = this.postP;
    console.log(this.post.user.profile);
    this.text = this.post.text;
    if (this.post.bg_image) {
      this.post.bg_image =
        "background-image: url(http://localhost:8080" +
        this.post.bg_image +
        ")";
    }
    this.blocks = this.post.blocks ? this.post.blocks.map((i) => i["user_id"]) : [];

    this.checkAuthor();
    this.listImage = this.post.file.split("-");
  },
  mounted() {},
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
    EditPost() {
      this.edit = true;
    },
    addComment() {
      let _this = this;
      let data = new FormData();
      data.append("id", this.post.id);
      data.append("type", "post");
      data.append("text", this.addText);
      data.append("file", this.file);
      BaseRequest.post("comment", data)
        .then(function (res) {
          _this.addText = "";
          _this.comments.unshift(res.data.comment);
          _this.post.count_comment++;
          _this.commentShow = true;
          _this.imageCmt = false;
          _this.videoCmt = false;
          this.getType("text");
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
      if (type === "image") {
        this.imageCmt = true;
        this.videoCmt = false;
      } else if (type === "video") {
        this.imageCmt = false;
        this.videoCmt = true;
      } else {
        this.imageCmt = false;
        this.videoCmt = false;
      }
    },
    addLike(type) {
      this.post.count_reaction += type === "like" ? 1 : -1;
    },
    onChange(e) {
      this.file = e.target.files[0];
      let type = this.file.type.substr(0, 5);
      document.getElementById(type + "CMT" + this.post.id).src =
        URL.createObjectURL(e.target.files[0]);
      this.getType(type);
    },
    over(id) {
      $("#" + id).css({ "text-decoration": "underline", color: "blue" });
    },
    leave(id) {
      $("#" + id).css({ "text-decoration": "none", color: "black" });
    },
    checkAuthor() {
      if (this.user.id === this.post.user.id) {
        this.isAuthor = true;
      }
      if (this.blocks.indexOf(this.user.id) != -1) {
        this.isBlock = true;
      }
      this.isOffComment = this.post.off_comment === 0 ? false : true;
    },
    offComment() {
      this.isOffComment = true;
    },
    onComment() {
      this.isOffComment = false;
    },
  },
};
</script>
