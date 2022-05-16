<template>
  <div class="bg-light text-dark border row">
    <div class="col-1">
      <img src="@/assets/logo.png" class="card-img-top" alt="..." />
    </div>
    <div class="col-11">
      <div class="row">{{ user.name }}</div>
      <div class="row">{{ comment.text }}</div>
      <div class="row">
        <reaction-app :comment="comment" :user="user" />
        <div class="col-2"></div>
        <div class="col-3" @click="showComment"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import ReactionApp from "@/views/pages/home/post/commentsPost/ReactionApp.vue";


export default {
  components: { ReactionApp },
  props: {
    comment: {
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
      let data = new FormData();
      data.append("id", this.comment.id);
      data.append("type", "comment");
      data.append("text", this.addText);
      this.addText = "";
      BaseRequest.post("comment", data)
        .then(function () {
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
