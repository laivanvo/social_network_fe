<template>
  <div name="post" class="border rounded p-4 bg-light">
    <edit-post-modal :id="'postEdit' + post.id" :user="user" :postPre="post" />
    <div class="row">
      <div class="card col-2" style="width: 4rem">
        <img src="@/assets/logo.png" class="card-img-top" alt="..." />
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-4">
            <styledLink @click="personal" class="row">{{
              post.user.name
            }}</styledLink>
            <div class="row">
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
            <a class="dropdown-item" href="#">Delete</a>
          </li>
          <li>
            <a class="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row">{{ post.name }}</div>
    <textarea
      class="form-control"
      disabled
      v-model="text"
      id="content"
      :style="'; height: 100px;' + bg_image"
    ></textarea>
    <div class="row">
      <img
        v-show="image"
        class="row"
        :src="'http://localhost:8080' + post.file"
      />
      <video v-show="video" width="row" controls>
        <source :src="'http://localhost:8080' + post.file" type="video/mp4" />
        Your browser does not support HTML video.
      </video>
    </div>
    <div class="row">
      <div class="col-1">
        <i class="bi bi-star-half"></i>
      </div>
      <div class="col-2">{{ post.reactions.length }}</div>
    </div>
    <div></div>
    <div class="row">
      <div class="col-2">
        <i
          @click="addLike()"
          v-show="
            !(post.reactions.map((r) => r.user_id).indexOf(this.user.id) != -1)
          "
          class="bi bi-star"
        ></i>
        <i
          @click="addLike()"
          v-show="
            post.reactions.map((r) => r.user_id).indexOf(this.user.id) != -1
          "
          class="bi bi-star-fill"
        ></i>
      </div>
      <div class="col-2"></div>
      <div class="col-3" @click="showComment">
        <styledLink>comment</styledLink>
      </div>
    </div>
    <div class="row" v-show="commentShow">
      <div>
        <div v-for="item in pageOfItems" :key="item.id">
          <comment-post :comment="item" :user="user" />
        </div>
        <div class="row" @click="loadMoreComment">
          <styledLink>load more</styledLink>
        </div>
        <jw-pagination
          :key="keyPage"
          v-show="false"
          :page-size="pageSize"
          :items="post.comments"
          @changePage="onChangePage"
        ></jw-pagination>
      </div>
    </div>
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
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CommentPost from "./commentsPost/CommentPost.vue";
import styled, { css } from "vue-styled-components";
import EditPostModal from "@/views/pages/home/createPostModal/EditPostModal.vue";
import { bus } from "@/main";

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
    EditPostModal,
  },
  props: {
    post: {
      type: Object,
    },
    user: {
      type: Object,
    },
  },
  data() {
    return {
      commentShow: false,
      pageOfItems: [],
      pageSize: 4,
      keyPage: 10000,
      image: false,
      video: false,
      edit: false,
      file: this.post.file,
      text: "",
      bg_image: "",
      addText: "",
      commentsReverse: [],
    };
  },
  mounted() {
    this.text = this.post.text;
    if (this.post.bg_image) {
      this.bg_image =
        "background-image: url(http://localhost:8080" +
        this.post.bg_image.path +
        ")";
    }
    this.getFile();
  },
  methods: {
    addLike() {
      let data = new FormData();
      data.append("id", this.post.id);
      data.append("type", "post");
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
      data.append("id", this.post.id);
      data.append("type", "post");
      data.append("text", this.addText);
      BaseRequest.post("comment", data)
        .then(function () {
          _this.addText = "";
          bus.$emit("load");
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
