<template>
  <div class="row g-0 m-0 p-0" v-show="!isDelete" v-if="comment.user">
    <div v-if="!isEdit" class="row g-0 m-0 p-0">
      <div class="col-auto">
        <img
          class="mt-2"
          style="
            border-radius: 50%;
            height: 30px;
            width: 30px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :src="'http://localhost:8080' + comment.user.profile.avatar"
          alt=""
        />
      </div>
      <div class="col-10">
        <div
          class="row g-0"
          @mouseover="isIcon = false"
          @mouseleave="isIcon = true"
        >
          <div
            v-show="!isEdit"
            class="col-auto ms-1 row border rounded-pill bg-light"
            style="min-width: 200px"
          >
            <div class="col-auto">
              <div class="row g-0">
                <h6 class="col-auto" style="white-space: nowrap">
                  {{
                    comment.user.profile.last_name +
                    " " +
                    comment.user.profile.first_name
                  }}
                </h6>
              </div>
              <div class="row g-0">
                <div>{{ editText }}</div>
              </div>
            </div>
          </div>
          <div class="col-auto row g-0 ms-4 d-flex align-items-center bg-light">
            <div class="col-auto g-0">
              <i
                v-show="!(isEdit || isIcon)"
                class="fa fa-ellipsis-h row"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              </i>
              <ul
                class="dropdown-menu row"
                style="max-width: 100px"
                aria-labelledby="dropdownMenuButton1"
              >
                <li type="button" v-show="isAuthor">
                  <a @click="edit" class="dropdown-item"> Edit </a>
                </li>
                <li type="button" v-show="isAuthor">
                  <a @click="deleteComment" class="dropdown-item">Delete</a>
                </li>
                <li
                  type="button"
                  v-show="!isAuthor && isPostAuthor && !isBlock"
                >
                  <a @click="block" class="dropdown-item">block</a>
                </li>
                <li type="button" v-show="!isAuthor && isPostAuthor && isBlock">
                  <a @click="unBlock" class="dropdown-item">unblock</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row g-0 m-0 p-0 ms-3" style="max-width: 200px">
          <img
            v-show="image"
            class="g-0 m-0"
            :src="'http://localhost:8080' + comment.file"
          />
          <video v-show="video" class="w-25 g-0 m-0 p-0" controls>
            <source
              :src="'http://localhost:8080' + comment.file"
              type="video/mp4"
            />
            Your browser does not support HTML video.
          </video>
        </div>
        <div
          class="row g-0 mb-3 mt-1 d-flex align-items-center"
          style="min-width: 300px; font-size: 0.7em"
        >
          <center class="row g-0">
            <div class="col-auto row g-0 ms-2 d-flex align-items-center">
              <div class="col-auto g-0">
                <reaction-app
                  @addLike="addLike($event)"
                  :id="comment.id"
                  :type="'comment'"
                  class="col-auto"
                />
              </div>
            </div>
            <div
              class="col-auto ms-2"
              @click="showComment"
              @mouseover="over('showRep' + comment.id)"
              @mouseleave="leave('showRep' + comment.id)"
              :id="'showRep' + comment.id"
              type="button"
            >
              rep
            </div>
            <div class="col-auto ms-2">
              {{ date }}
            </div>
            <div class="col-auto row g-0 ms-2 d-flex align-items-center">
              <div class="col-auto g-0">
                <i v-show="!isEdit" class="fa fa-thumbs-o-up">
                  {{ comment.count_reaction }}</i
                >
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
    <div v-else class="row g-0 mt-3 mb-3">
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
          :src="'http://localhost:8080' + comment.user.profile.avatar"
          alt=""
        />
      </div>
      <div
        class="col-auto row g-0 ms-1 d-flex align-items-center"
        style="position: relative; min-width: 400px"
      >
        <input
          v-on:keyup.enter="editComment"
          type="text"
          class="form-control ms-1 me-1 rounded-pill"
          placeholder="comment in this"
          v-model="editText"
          style="position: absolute"
        />
        <div class="col-11"></div>
        <div class="col-1 d-flex align-items-center">
          <i
            class="bi bi-camera fs-4 opacity-50"
            style="position: absolute"
          ></i>
        </div>
      </div>
    </div>
    <div class="row g-0 m-0 p-0">
      <div class="row g-0 ms-1">
        <div class="row ms-1 g-0 m-0 p-0" v-show="commentShow">
          <div class="row g-0" v-for="item in comments" :key="item.id">
            <div class="col-1">
              <div class="row w-75 ms-1 mt-3"></div>
            </div>
            <div class="col-auto">
              <RepComment1 class="row g-0" :commentP="item" :user="user" />
            </div>
          </div>
          <div class="row ms-3 g-0 mt-1" @click="loadMoreComment">
            <styledLink>load more</styledLink>
          </div>
          <div class="row g-0 m-0 mb-3">
            <div class="col-1">
              <div class="row w-75 ms-1 mt-3"></div>
            </div>
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
              class="col-8 row g-0 ms-1 d-flex align-items-center"
              style="position: relative;"
            >
              <input
                v-on:keyup.enter="addComment"
                type="text"
                class="form-control ms-1 me-1 rounded-pill"
                placeholder="comment in this"
                v-model="addText"
                style="position: absolute"
              />
              <div class="col-11"></div>
              <div class="col-1 d-flex align-items-center">
                <i
                  class="bi bi-camera fs-4 opacity-50"
                  style="position: absolute"
                ></i>
              </div>
            </div>
          </div>
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
import moment from "moment";
import $ from "jquery";

export default {
  components: {
    styledLink,
    RepComment1,
    ReactionApp,
  },
  props: {
    commentP: {
      type: Object,
    },
    user: {
      type: Object,
    },
    post: {
      type: Object,
    },
    isPostAuthor: {
      type: Boolean,
    },
    blocks: {
      type: Array,
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
      date: "",
      comment: {},
      image: false,
      video: false,
      isIcon: true,
      isAuthor: false,
      isBlock: false,
    };
  },
  mounted() {
    this.comment = this.commentP;
    this.editText = this.comment.text;
    this.date = moment(this.comment.created_at, "YYYYMMDD h:mm:ss")
      .add(7, "hour")
      .fromNow();
    this.getFile();
    this.checkAuthor();
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
      data.append("comment_id", this.comment.id);
      data.append("text", this.addText);
      data.append("type", "comment");
      data.append("post", this.post.id);
      data.append("user_id", this.post.user.id);
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
    addLike(type) {
      this.comment.count_reaction += type === "like" ? 1 : -1;
    },
    getFile() {
      if (this.comment.type === "image") {
        this.image = true;
        this.video = false;
      } else if (this.comment.type === "video") {
        this.video = true;
        this.image = false;
      }
    },

    over(id) {
      $("#" + id).css({ "text-decoration": "underline", color: "blue" });
    },
    leave(id) {
      $("#" + id).css({ "text-decoration": "none", color: "black" });
    },
    checkAuthor() {
      if (this.user.id === this.comment.user.id) {
        this.isAuthor = true;
      }
      this.isBlock = this.blocks.indexOf(this.comment.user.id) != -1;
    },
    block() {
      let data = new FormData();
      data.append("post_id", this.post.id);
      data.append("user_id", this.comment.user.id);
      BaseRequest.post("blocks", data).then(() => (this.isBlock = true));
    },
    unBlock() {
      let data = new FormData();
      data.append("post_id", this.post.id);
      data.append("user_id", this.comment.user.id);
      BaseRequest.post("blocks/destroy", data).then(
        () => (this.isBlock = false)
      );
    },
  },
};
</script>
