<template>
  <div class="home row p-0 m-0">
    <div class="row g-0 p-0 m-0">
      <div class="col-1">
        <img
          style="
            border-radius: 50%;
            height: 50px;
            width: 50px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          "
          :src="'http://localhost:8080' + profile.avatar"
          alt=""
        />
      </div>
      <input
        class="col-11 rounded-pill"
        type="text"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        placeholder="how are you today"
      />
    </div>
    <create-post-modal
      :group_id="group.id"
      @addPost="addPost($event)"
      class="row g-0"
      :user="user"
    />
    <div class="row g-0 p-0 m-0" v-for="post in posts" :key="post.id">
      <post-app
        class="row g-0 border mt-5 bg-white"
        :postP="post"
        :user="post.user"
      />
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages//post/PostApp.vue";
import $ from "jquery";
import CreatePostModal from "@/views/pages//post/createPostModal/CreatePostModal.vue";
import DefaultLayout from "@/views/layouts/DefaultLayout";

export default {
  props: {
    group: {
      type: Object,
    },
  },
  components: {
    PostApp,
    CreatePostModal,
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? DefaultLayout;
    },
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
      profile: {},
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    getPost() {
      let _this = this;
      BaseRequest.get("posts/group/" + this.group.id)
        .then((response) => {
          response.data.posts.data.forEach((e) => {
            _this.posts.map((x) => x.id).indexOf(e.id) === -1
              ? _this.posts.push(e)
              : console.log("This item already exists");
          });
          _this.profile = response.data.profile;
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
