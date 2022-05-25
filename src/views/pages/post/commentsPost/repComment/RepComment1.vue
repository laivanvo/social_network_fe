<template>
  <div class="row g-0 m-0 p-0" v-show="!isDelete">
    <div class="row g-0 m-0 p-0">
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
          :src="'http://localhost:8080' + user.profile.avatar"
          alt=""
        />
      </div>
      <div class="col-auto" style="white-space: nowrap">
        <div class="col-auto row g-0">
          <div
            class="col-auto ms-1 row border rounded-pill ps-2 bg-light"
            style="white-space: nowrap"
          >
            <div class="col-auto">
              <div class="row g-0">
                <h6 class="col-auto" style="white-space: nowrap">
                  {{ user.profile.last_name + " " + user.profile.first_name }}
                </h6>
              </div>
              <div v-show="!isEdit" class="row g-0">
                <div>{{ editText }}</div>
              </div>
              <div v-show="isEdit" class="row g-0">
                <input
                  type="text"
                  v-on:keyup.enter="editComment"
                  v-model="editText"
                />
              </div>
            </div>
            <div class="col-auto row g-0">
              <div class="row g-0">
                <i
                  class="bi bi-card-list row"
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
                  <li>
                    <a @click="edit" class="dropdown-item"> Edit </a>
                  </li>
                  <li>
                    <a @click="deleteComment" class="dropdown-item">Delete</a>
                  </li>
                </ul>
              </div>
              <div class="row g-0">
                <i class="bi bi-star-fill"> {{ comment.count_reaction }}</i>
              </div>
            </div>
          </div>
        </div>

        <div class="col-auto ms-0 row g-0 mb-1" style="min-width: 300px">
          <div class="col-auto">
            <reaction-app
              @addLike="addLike($event)"
              :id="comment.id"
              :type="'comment'"
              :user="user"
            />
          </div>
          <div class="col-auto ms-3" @click="showComment">rep</div>
          <div class="col-auto ms-3">
            {{ date }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReactionApp from "@/views/pages//post/commentsPost/ReactionApp.vue";
import BaseRequest from "@/helpers/BaseRequest";
import moment from "moment";

export default {
  components: {
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
    };
  },
  mounted() {
    this.comment = this.commentP;
    this.editText = this.comment.text;
    this.date = moment(this.comment.created_at, "YYYYMMDD").fromNow();
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
      data.append("id", this.comment.id);
      data.append("type", "comment");
      data.append("text", this.addText);
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
  },
};
</script>
