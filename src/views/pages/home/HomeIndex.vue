<template>
  <div class="home row p-0 m-0 bg-light">
    <div class="row p-0 m-0">
      <img src="@/assets/logo.png" class="col-1" alt="..." />
      <div class="col-1"></div>
      <input
        class="col-10"
        type="text"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        placeholder="how are you today"
      />
    </div>
    <create-post-modal @addPost="addPost($event)" class="row" :user="user" />
    <div class="row p-0 m-0" v-for="post in posts" :key="post.id">
      <post-app
        class="row border mt-5 bg-white"
        :postP="post"
        :user="post.user"
      />
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages/home/post/PostApp.vue";
import $ from "jquery";
import CreatePostModal from "@/views/pages/home/createPostModal/CreatePostModal.vue";
export default {
  components: {
    PostApp,
    CreatePostModal,
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
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
      posts: [],
      page: 1,
    };
  },
  mounted() {
    this.getPost(this.page);
  },
  methods: {
    getPost(page) {
      let _this = this;
      BaseRequest.get("posts?page=" + page)
        .then((response) => {
          response.data.posts.data.forEach((e) => {
            _this.posts.map((x) => x.id).indexOf(e.id) === -1
              ? _this.posts.push(e)
              : console.log("This item already exists");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleScroll() {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        this.getPost(++this.page);
      }
    },
    addPost(post) {
      this.posts.unshift(post);
    },
  },
};
</script>
