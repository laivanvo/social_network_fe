<template>
    <div class="home row p-0 m-0">
        <div class="row g-0 p-0 m-0" v-for="post in posts" :key="post.id">
            <post-app
                class="row g-0 border mb-5 bg-white"
                :postP="post"
                :user="post.user"
            />
        </div>
    </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages//post/PostApp.vue";
import $ from "jquery";
import DefaultLayout from "@/views/layouts/DefaultLayout";

export default {
    components: {
        PostApp,
    },
    computed: {
        layout() {
            return this.$route.meta.layout ?? DefaultLayout;
        },
    },
    created() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    data() {
        return {
            keyPostApp: 0,
            pageOfItems: [],
            pageSize: 4,
            keyPage: 10000,
            isOpen: false,
            user: {},
            file: "",
            success: "",
            images: [],
            videos: [],
            posts: [],
            page: 1,
            profile: {},
        };
    },
    mounted() {
        this.getPost();
    },
    methods: {
        getPost() {
            let _this = this;
            BaseRequest.get("posts/groups")
                .then((response) => {
                    response.data.posts.forEach((e) => {
                        _this.posts.map((x) => x.id).indexOf(e.id) === -1
                            ? _this.posts.push(e)
                            : console.log("This item already exists");
                    });
                    _this.profile = response.data.profile;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleScroll() {
            if (
                $(window).scrollTop() + $(window).height() ==
                $(document).height()
            ) {
                this.getPost(++this.page);
            }
        },
        addPost(post) {
            this.posts.unshift(post);
        },
    },
};
</script>
