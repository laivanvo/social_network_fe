<template>
    <div class="row g-0 bg-secondary">
        <div class="row g-0">
            <div class="col-2"></div>
            <div class="col-8 p-2 bg-white border">
                <post-app class="row g-0 bg-white" :postP="post" :user="user" />
            </div>
        </div>
    </div>
</template>

<script>
import PostApp from "../PostApp.vue";

export default {
    components: {
        PostApp,
    },
    props: {},
    data() {
        return {
            post: {},
            user: {},
        };
    },
    created() {
        console.log(this.$route.params);
        this.post = this.$route.params.post ? this.$route.params.post : null;
        this.user = this.$route.params.user ? this.$route.params.user : null;
        this.group = this.$route.params.group ? this.$route.params.group : null;
        if (!this.post) {
            this.post = JSON.parse(
                window.localStorage.getItem("postView", this.post)
            );
        }
        window.localStorage.setItem("postView", JSON.stringify(this.post));
        if (!this.user) {
            this.user = JSON.parse(
                window.localStorage.getItem("userView", this.user)
            );
        }
        window.localStorage.setItem("userView", JSON.stringify(this.user));
    },
};
</script>
