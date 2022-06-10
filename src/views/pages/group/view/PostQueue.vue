<template>
  <div class="row g-0">
    <div class="col-2 bg-white"></div>
    <div
      class="row g-0 mb-3 pt-3 rounded border bg-white"
      v-for="post in posts"
      :key="post.id"
    >
      <post-item class="row g-0" :post="post" :user="user" />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostItem from "@/views/pages/post/save/PostItem.vue";
export default {
  components: { PostItem },
  props: {
    group: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      posts: [],
      user: {},
    };
  },
  mounted() {
    this.getSave();
  },
  methods: {
    getSave() {
      BaseRequest.get("posts/queue/" + this.group.id).then((res) => {
        this.posts = res.data.posts;
        console.log(this.posts);
        this.user = res.data.user;
      });
    },
  },
};
</script>
