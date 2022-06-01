<template>
  <div class="row g-0" :is="layout">
    <div class="row g-0">
      <div class="row g-0 border rounded p-4 bg-light">
        <form @submit.prevent="login()">
          <div class="row g-0 mb-3">
            <input
              class="form-control"
              v-model="user.email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div class="row g-0 mb-3">
            <input
              class="form-control"
              v-model="user.password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="row g-0 mb-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
          <a href="#"><p class="text-center">forget password</p></a>
          <div class="row g-0 mb-3">
            <button class="btn btn-success">create new</button>
          </div>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import AuthLayout from "@/views/layouts/AuthLayout";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? AuthLayout;
    },
  },
  methods: {
    login() {
      let data = new FormData();
      data.append("email", this.user.email);
      data.append("password", this.user.password);
      BaseRequest.post("login", data)
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("token", res.data.access_token);
          this.$router.push({ name: "home" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
