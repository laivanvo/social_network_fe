<template>
  <div class="bg-light text-dark border row m-0 p-0" v-show="!isDelete">
    <div class="row">
      <div class="col-10">
        <div class="row">
          <div class="col-2">
            <!-- <img src="#"/> -->
          </div>
          <div class="col-3">
            {{ user.name }}
          </div>
        </div>
        <div v-show="!isEdit" class="row">
          {{ editText }}
        </div>
        <div v-show="isEdit" class="row">
          <input
            type="text"
            v-on:keyup.enter="editComment"
            v-model="editText"
          />
        </div>
      </div>
      <div class="col-2">
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
              <a @click="edit" class="dropdown-item"> Edit </a>
            </li>
            <li>
              <a @click="deleteComment" class="dropdown-item">Delete</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Something else here</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <reaction-app :id="comment.id" :type="'comment'" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import ReactionApp from "@/views/pages//post/commentsPost/ReactionApp.vue";
import BaseRequest from "@/helpers/BaseRequest";

export default {
  components: {
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
    edit() {
      this.isEdit = !this.isEdit;
    },
    editComment() {
      let _this = this;
      let data = new FormData();
      data.append("text", this.editText);
      BaseRequest.get("comments/" + this.comment.id)
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
      data.append("id", this.comment.id);
      data.append("type", "comment");
      BaseRequest.get("comments/" + this.comment.id, data)
        .then(function () {
          _this.isDelete = true;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
