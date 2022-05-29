<template>
  <div class="row g-0 ps-0" v-if="profile">
    <div class="row g-0 mb-2 dropdown-item">
      <div class="row g-0">
        <div class="col-auto" @click="viewPersonal()" type="button">
          <img
            style="width: 30px; height: 30px; border-radius: 50% 50% 50% 50%"
            :src="'http://localhost:8080' + profile.avatar"
          />
        </div>
        <div class="col-auto row ms-1 g-0 d-flex align-items-center">
          <h5 class="row g-0">
            <center>
              <div class="row g-0">
                {{ profile.last_name + " " + profile.first_name }}
              </div>
            </center>
          </h5>
          <div class="row g-0 opacity-50 ms-2">
            {{ profile.address }}
          </div>
        </div>
        <div class="col-auto row g-0 ms-auto" v-if ="request">
          <div class="col-auto me-1">
            <button
              @click="accept()"
              v-show="!(isAccept || isDelete)"
              class="btn btn-primary"
            >
              Accept
            </button>
          </div>
          <div class="col-auto">
            <button
              @click="delete_()"
              v-show="!(isAccept || isDelete)"
              class="btn btn-danger"
            >
              Delete
            </button>
          </div>
          <div class="col-auto">
            <button
              v-show="isAccept"
              disabled
              class="opacity-50 btn btn-danger"
            >
              Accepted
            </button>
          </div>
          <div class="col-auto">
            <button
              v-show="isDelete"
              disabled
              class="opacity-50 btn btn-danger"
            >
              Deleted
            </button>
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
    profile: {
      type: Object,
    },
    id: {
      type: Number,
    },
    request: {
      type: Boolean,
    }
  },
  data() {
    return {
      isAccept: false,
      isDelete: false,
    };
  },
  methods: {
    accept() {
      let data = new FormData();
      data.append("group_id", this.id);
      data.append("user_id", this.profile.user_id);
      BaseRequest.post("members/accept", data).then(() => {
        this.isAccept = true;
      });
    },
    delete_() {
      let data = new FormData();
      data.append("group_id", this.id);
      data.append("user_id", this.profile.user_id);
      BaseRequest.post("members/destroy").then(() => {
        this.isDelete = true;
      });
    },
    viewPersonal() {
      this.$router.push({ name: 'personalApp', params: {profile: this.profile}})
    }
  },
};
</script>
