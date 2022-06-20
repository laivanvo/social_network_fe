<template>
  <div class="row g-0" v-if="posts && user">
    <div class="col-3 row g-0 pt-2 border d-flex align-items-start">
      <div class="row g-0">
        <div class="row g-0 mb-2">Search Results</div>
        <div class="row g-0 ps-2 pe-2 mb-2">
          <div class="row g-0 border"></div>
        </div>
        <div
          class="row g-0 mb-2 dropdown-item ps-1"
          type="button"
          @click="showPost()"
        >
          <div class="row g-0">
            <div
              class="
                col-auto
                bg-secondary
                d-flex
                align-items-center
                justify-content-center
              "
              style="width: 35px; height: 35px; border-radius: 50%"
            >
              <i class="fa fa-newspaper-o" style="color: white"></i>
            </div>
            <div class="col-auto ms-2 d-flex align-items-center">Post</div>
          </div>
        </div>
        <div
          class="row g-0 mb-2 dropdown-item ps-1"
          type="button"
          @click="showPeople()"
        >
          <div class="row g-0">
            <div
              class="
                col-auto
                bg-secondary
                d-flex
                align-items-center
                justify-content-center
              "
              style="width: 35px; height: 35px; border-radius: 50%"
            >
              <i class="bi bi-people" style="color: white"></i>
            </div>
            <div class="col-auto ms-2 d-flex align-items-center">People</div>
          </div>
        </div>
        <div class="row g-0" v-show="isPeople">
          <div class="col-2"></div>
          <div class="col-10 row g-0">
            <div class="row g-0">
              <div class="col-auto">Friends of friends</div>
              <div class="col-auto ms-auto me-1">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    @click="searchOfFriend"
                  />
                </div>
              </div>
            </div>
            <div class="row g-0 mb-2">
              <div
                class="row g-0 border pt-1 pb-1 dropdown-item"
                v-show="!isAddress"
                type="button"
                @click="showAddress()"
              >
                <div class="row g-0">
                  <div class="col-auto">Address/street</div>
                  <div class="col-auto ms-auto me-1">
                    <i class="fa fa-sort-desc"></i>
                  </div>
                </div>
              </div>
              <div class="row g-0" v-show="isAddress">
                <input
                  type="text"
                  id="address"
                  list="brow"
                  @blur="offAddress()"
                />
              </div>
            </div>
            <datalist id="brow">
              <option value="An Giang"></option>
              <option value="Bac Giang"></option>
              <option value="Bac Kan"></option>
              <option value="Bac Lieu"></option>
              <option value="Bac Ninh"></option>
              <option value="Ba Ria"></option>
              <option value="Ben Tre"></option>
              <option value="Binh Dinh"></option>
              <option value="Binh Duong"></option>
              <option value="Binh Phuoc"></option>
              <option value="Binh Thuan"></option>
              <option value="Ca Mau"></option>
              <option value="Cao Bang"></option>
              <option value="Dac Lak"></option>
              <option value="Dac Nong"></option>
              <option value="Dien Bien"></option>
              <option value="Dong Nai"></option>
              <option value="Dong Thap"></option>
              <option value="Gia Lai"></option>
              <option value="Ha Giang"></option>
              <option value="Hai Duong"></option>
              <option value="Ha Nam"></option>
              <option value="Ha Tay"></option>
              <option value="Ha Tinh"></option>
              <option value="Hau Giang"></option>
              <option value="Hoa Binh"></option>
              <option value="Hung Yen"></option>
              <option value="Khanh Hoa"></option>
              <option value="Kien Giang"></option>
              <option value="Kon Tum"></option>
              <option value="Lai Chau"></option>
              <option value="Lam Dong"></option>
              <option value="Lang Son"></option>
              <option value="Lao Cai"></option>
              <option value="Long An"></option>
              <option value="Nam Dinh"></option>
              <option value="Nghe An"></option>
              <option value="Ninh Binh"></option>
              <option value="Ninh Thuan"></option>
              <option value="Phu Tho"></option>
              <option value="Phu Yen"></option>
              <option value="Quang Binh"></option>
              <option value="Quang Nam"></option>
              <option value="Quang Ngai"></option>
              <option value="Quang Ninh"></option>
              <option value="Quang Tri"></option>
              <option value="Soc Trang"></option>
              <option value="Son La"></option>
              <option value="Tay Ninh"></option>
              <option value="Thai Binh"></option>
              <option value="Thai Nguyen"></option>
              <option value="Thanh Hoa"></option>
              <option value="Thua Thien"></option>
              <option value="Tien Giang"></option>
              <option value="Tra Vinh"></option>
              <option value="Tuyen Quang"></option>
              <option value="Vinh Long"></option>
              <option value="Vinh Phuc"></option>
              <option value="Yen Bai"></option>
              <option value="Can Tho"></option>
              <option value="Da Nang"></option>
              Hai Phong
            </datalist>
          </div>
        </div>
        <div
          class="row g-0 mb-2 dropdown-item ps-1"
          type="button"
          @click="showGroup()"
        >
          <div class="row g-0">
            <div
              class="
                col-auto
                bg-secondary
                d-flex
                align-items-center
                justify-content-center
              "
              style="width: 35px; height: 35px; border-radius: 50%"
            >
              <i class="bi bi-people" style="color: white"></i>
            </div>
            <div class="col-auto ms-2 d-flex align-items-center">People</div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-8">
      <div class="row g-0" v-show="isPost">
        <div class="row g-0" v-for="post in posts" :key="post.id">
          <post-app class="row g-0 bg-white" :postP="post" :user="user" />
        </div>
      </div>
      <div class="row g-0 p-2" v-show="isPeople">
        <div
          class="row g-0 mb-2 bg-light rounded"
          v-for="profile in peoples"
          :key="profile.id"
        >
          <profile-item :profile="profile" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Login from "@/views/pages/auth/LoginApp.vue";
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "../post/PostApp.vue";
import ProfileItem from "../personal/profile/ProfileItem.vue";
export default {
  components: { PostApp, ProfileItem },
  data() {
    return {
      isPeople: false,
      isAddress: false,
      isGroup: false,
      text: "",
      posts: [],
      peoples: [],
      user: {},
      isPost: false,
    };
  },
  created() {
    this.text = this.$route.params.text ? this.$route.params.text : "";
    if (!this.text) {
      this.text = JSON.parse(window.localStorage.getItem("text", this.text));
    }
    window.localStorage.setItem("text", JSON.stringify(this.text));
  },
  mounted() {},
  methods: {
    showPost() {
      if (!this.posts.length) {
        this.searchPost();
      }
      this.isPost = true;
      this.isPeople = false;
    },
    showPeople() {
      if (!this.peoples.length) {
        this.searchPeople();
      }
      this.isPost = false;
      this.isPeople = true;
    },
    showAddress() {
      this.isAddress = true;
      console.log(this.isAddress);
      $("#address").focus();
    },
    offAddress() {
      this.isAddress = false;
    },
    openModal() {
      this.$FModal.show(
        { component: Login },
        { msg: "Welcome to Your Vue.js App" }
      );
    },
    showGroup() {
      this.isGroup = !this.isGroup;
    },
    searchPost() {
      let data = new FormData();
      data.append("text", this.text);
      BaseRequest.post("posts/search", data).then((res) => {
        this.posts = res.data.posts;
        this.user = res.data.user;
      });
    },
    searchPeople() {
      let data = new FormData();
      data.append("text", this.text);
      BaseRequest.post("profiles/search", data).then((res) => {
        this.peoples = res.data.profiles;
      });
    },
    searchOfFriend(e) {
      let data = new FormData();
      data.append("text", this.text);
      if (e.target.value) {
        BaseRequest.post("profiles/searchOfFriend", data).then((res) => {
          this.peoples = res.data.profiles;
        });
      } else {
        BaseRequest.post("profiles/search", data).then((res) => {
          this.peoples = res.data.profiles;
        });
      }
    },
  },
};
</script>
