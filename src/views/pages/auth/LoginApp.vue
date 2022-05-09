<template>
    <div>
        <div class="row">
            <div class="mt-5"></div>
            <div class="col-3">
                Chào mừng các bạn đến với website mạng xã hội của chúng tôi
            </div>
            <div class="col-6 border rounded p-4 bg-light">
                <form @submit.prevent="login()">
                    <div class="row">
                        <input
                            class="form-control"
                            v-model="user.email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div class="row">
                        <input
                            class="form-control"
                            v-model="user.password"
                            type="text"
                            placeholder="Password"
                        />
                    </div>
                    <div class="row">
                        <button type="submit" class="btn btn-primary">
                            Đăng nhập
                        </button>
                    </div>
                    <a href="#"><p class="text-center">Quên mật khẩu</p></a>
                    <div class="row">
                        <button class="btn btn-success">
                            Tạo tài khoản mới
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
