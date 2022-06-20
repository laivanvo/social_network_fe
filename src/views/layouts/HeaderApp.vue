<template>
  <div class="row g-0">
    <div class="row g-0 border" style="background-color: white">
      <div class="col-4 row g-0">
        <div
          type="button"
          @click="homePage()"
          class="col-auto ms-2 d-flex align-items-center"
        >
          <i class="fa fa-home fs-1" aria-hidden="true"></i>
        </div>
        <div
          class="col-10 ms-2 d-flex align-items-center"
          style="position: relative"
        >
          <input
            type="text"
            id="search"
            @focus="isSearch = true"
            @blur="isSearch = false"
            class="form-control ms-1 me-1 rounded-pill opacity-50"
            style="position: absolute"
            placeholder="      input in social-media"
            @keyup.enter="search"
          />
        </div>
      </div>
      <div class="col-4 row g-0">
        <div type="button" @click="homePage()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-house-door fs-3"></i>
          </div>
        </div>
        <div type="button" @click="personal()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-person-workspace fs-3"></i>
          </div>
        </div>
        <div type="button" @click="forYou()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="bi bi-people fs-3"></i>
          </div>
        </div>
        <div type="button" @click="group()" class="col-3 text-center">
          <div class="row g-0 dropdown-item">
            <i class="fa fa-users fs-3 mt-2"></i>
          </div>
        </div>
      </div>
      <div
        class="
          col-4
          row
          ps-0
          m-0
          bg-light
          d-flex
          align-items-center
          text-center
        "
      >
        <div class="col-auto row g-0" type="button" @click="ViewPersonal()">
          <div class="col-auto">
            <img
              style="
                border-radius: 50%;
                height: 30px;
                width: 30px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
              "
              :src="'http://localhost:8080' + profile.avatar"
              alt=""
            />
          </div>
          <div class="col-auto ms-2 d-flex align-items-center text-center">
            {{ profile.last_name + " " + profile.first_name }}
          </div>
        </div>
        <div
          class="
            col-auto
            ms-auto
            me-1
            ps-0
            border
            d-flex
            align-items-center
            text-center
          "
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <center>
            <div class="dropdown">
              <div
                style="width: 30px; height: 30px; border-radius: 50%"
                class="btn btn-secondary d-flex align-items-center text-center justify-content-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-bell"></i>
              </div>
              <div
                class="dropdown-menu row g-0"
                style="width: 300px"
                aria-labelledby="dropdownMenuButton1"
              >
                <div
                  class="row g-0 dropdown-item"
                  type="button"
                  v-for="noti in noties"
                  :key="noti.id"
                >
                  <div class="row g-0" @click="notification(noti)">
                    <div class="col-3 ps-1">
                      <img
                        style="width: 50px; height: 50px; border-radius: 50%"
                        :src="
                          'http://localhost:8080' +
                          noti.user_from.profile.avatar
                        "
                      />
                    </div>
                    <textarea
                      class="col-9 ps-1 pe-1"
                      type="button"
                      style="
                        border: none;
                        background-color: transparent;
                        resize: none;
                        outline: none;
                      "
                      v-model="noti.content"
                    >
                    </textarea>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
        <div
          class="col-auto me-1 ps-0 border d-flex align-items-center"
          style="border-radius: 50% 50% 50% 50%; width: 30px; height: 30px"
        >
          <center>
            <div class="dropdown">
              <div
                style="width: 30px; height: 30px; border-radius: 50%"
                class="btn btn-secondary d-flex align-items-center text-center justify-content-center"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              <i class="dropdown-toggle"></i>
              </div>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li @click="logout()">
                  <a class="dropdown-item" type="button"
                    ><i class="fa fa-sign-out" aria-hidden="true"> Logout</i></a
                  >
                </li>
              </ul>
            </div>
          </center>
        </div>
      </div>
    </div>
    <div class="row g-0 pt-3 border me-0">
      <slot />
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
  components: {},
  data() {
    return {
      profile: {},
      groups: [],
      isSearch: false,
      noties: [],
    };
  },
  mounted() {
    this.getProfile();
    this.getGroup();
    this.getNotification();
  },
  methods: {
    homePage() {
      this.$router.push("/home");
    },
    personal() {
      this.$router.push("/personal");
    },
    forYou() {
      this.$router.push("/for_you");
    },
    group() {
      this.$router.push("/group");
    },
    register() {
      this.$router.push("/register");
    },
    getProfile() {
      BaseRequest.get("posts/profile").then((res) => {
        this.profile = res.data.profile;
      });
    },
    getGroup() {
      BaseRequest.get("groups/mec").then((res) => {
        this.groups = res.data.groups;
      });
    },
    ViewPersonal() {
      this.$router.push({
        name: "personal",
        params: { profile: this.profile },
      });
    },
    logout() {
      this.$router.push({ name: "login" });
    },
    getNotification() {
      BaseRequest.get("noties").then((res) => {
        this.noties = res.data.noties;
      });
    },
    notification(noti) {
      this.$router.push({
        name: "postView",
        params: { post: noti.post, user: noti.user_to },
      });
    },
    search(e) {
      this.$router.push({ name: "search", params: { text: e.target.value } });
    },
  },
};
</script>
