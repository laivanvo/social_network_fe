<template>
    <div>
        <div class="row g-0">
            <div class="mt-5"></div>
            <div class="col-3">
                Chào mừng các bạn đến với website mạng xã hội của chúng tôi
            </div>
            <div class="col-6 border rounded p-4 bg-light">
                <form @submit.prevent="login()">
                    <div class="row g-0">
                        <input
                            class="form-control"
                            v-model="user.email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div class="row g-0">
                        <input
                            class="form-control"
                            v-model="user.password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div class="row g-0">
                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </div>
                    <a href="#"><p class="text-center">forget password</p></a>
                    <div class="row g-0">
                        <button class="btn btn-success">
                            create new
                        </button>
                    </div>
                </form>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";

export default {
    data() {
        return {
            user: {
                email: "",
                password: "",
            },
        };
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
