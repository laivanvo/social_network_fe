<template>
  <div class="home row">
    <div class="row" name="posts">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-1">
            <img src="@/assets/logo.png" class="card-img-top" alt="..." />
          </div>
          <div class="col-1"></div>
          <input
            class="col-10"
            type="text"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            placeholder="how are you today"
          />
          <create-post-modal @getPost="getPost" class="col-10" :user="user" />
        </div>
        <div v-for="post in posts" :key="post.id">
          <post-app :post="post" :user="user"/>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages/home/post/PostApp.vue";
import $ from "jquery";
import CreatePostModal from "@/views/pages/home/createPostModal/CreatePostModal.vue";
import { bus } from "@/main";
export default {
  components: {
    PostApp,
    CreatePostModal,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    bus.$on("load", this.load);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      keyPostApp: 0,
      pageOfItems: [],
      pageSize: 4,
      keyPage: 10000,
      isOpen: false,
      user: {},
      file: "",
      success: "",
      images: [],
      videos: [],
      posts:[],
      page: 1,
    };
  },
  mounted() {
    this.getPost(this.page);
    console.log(this.posts)
  },
  methods: {
    getPost(page) {
      BaseRequest.get('posts?page=' + page)
        .then((response) => {
          this.posts = this.posts.concat(response.data.posts.data);
          console.log(this.posts)
          this.user = response.data.user;

        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleScroll() {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        this.getPost(++this.page)
      }
    },
  },
};
</script>
