<template>
  <div class="row g-0">
    <div class="row g-0">
      <div class="col-auto row g-0">
        <img
          style="width: 100px; height: 100px"
          :src="'http://localhost:8080' + post.user.profile.avatar"
        />
      </div>
      <div class="col-8 ms-2">
        <h5 class="col-6 text-truncate mb-1">
          <u>{{ post.text }}</u>
        </h5>
        <div class="row g-0 mb-1">Post . saved To Watch Later</div>
        <div class="row g-0 mb-1">
          <div class="col-auto">
            <img
              style="width: 30px; height: 30px; border-radius: 50%"
              :src="'http://localhost:8080' + post.user.profile.avatar"
            />
          </div>
          <div class="col-auto row g-0 ms-1 d-flex align-items-center">
            <div class="col-auto d-flex align-items-center">posted from</div>
            <div class="col-auto ms-1 fw-bold">
              {{
                post.user.profile.last_name +
                " " +
                post.user.profile.first_name
              }}'s post
            </div>
          </div>
          <div class="row g-0">
            <div
              class="
                col-1
                ms-1
                bg-light
                d-flex
                align-items-center
                ps-2
                pt-1
                pb-1
              "
            >
              <i class="fa fa-ellipsis-h"></i>
            </div>
            <!-- <div class="col-auto" v-show="!(isAccept || isDelete)" @click="accept">
              <button class="btn btn-primary">accept</button>
            </div>
            <div class="col-auto" v-show="!(isAccept || isDelete)" @click="delete_">
              <button class="btn btn-danger">delete</button>
            </div> -->
            <div class="col-auto" v-show="isAccept">
              <button class="btn btn-secondary opacity-25" disabled>accepted</button>
            </div>
            <div class="col-auto" v-show="isDelete">
              <button class="btn btn-secondary opacity-25" disabled>deleted</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
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
      isAccept: false,
      isDelete: false,
    };
  },
  methods: {
    postView() {
      this.$router.push({
        name: "postView",
        params: { post: this.post, user: this.user },
      });
    },
    accept() {
      BaseRequest.get("posts/accept/" + this.post.id).then(() => {
        this.isAccept = true;
      });
    },
    delete_() {
      BaseRequest.get("posts/destroy/" + this.post.id).then(() => {
        this.isDelete = true;
      });
    },
  },
};
</script>
