<template>
    <div class="home row">
        <div class="row" name="posts">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="row">
                    <div class="col-1">
                        <img
                            src="@/assets/logo.png"
                            class="card-img-top"
                            alt="..."
                        />
                    </div>
                    <div class="col-1"></div>
                    <input
                        class="col-10"
                        type="text"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        placeholder="how are you today"
                    />
                    <create-post-modal @getPost="getPost" class="col-10" :user="user" />
                </div>
                <div v-for="item in pageOfItems" :key="item.id">
                    <post-app
                        class="border mt-4"
                        :post="item"
                        :key="keyPostApp"
                        :user="user"
                    />
                </div>
            </div>
            <jw-pagination
                :key="keyPage"
                v-show="false"
                :page-size="pageSize"
                @changePage="onChangePage"
                :items="posts"
            ></jw-pagination>
            <div class="col-3"></div>
        </div>
    </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages/home/post/PostApp.vue";
import $ from "jquery";
import CreatePostModal from "@/views/pages/home/createPostModal/CreatePostModal.vue";
export default {
    components: {
        PostApp,
        CreatePostModal,
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
            posts: [],
            pageOfItems: [],
            pageSize: 4,
            keyPage: 10000,
            isOpen: false,
            user: {},
            file: "",
            success: "",
            images: [],
            videos: [],
        };
    },
    mounted() {
        this.getPost();
        this.getFile();
    },
    methods: {
        getPost() {
            BaseRequest.get("posts")
                .then((response) => {
                    this.posts = response.data.posts;
                    this.user = response.data.user;
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
                this.pageSize += 4;
                this.keyPage++;
            }
        },
        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        getFile() {
            let _this = this;
            BaseRequest.get("file")
                .then(function (res) {
                    _this.images = res.data.images;
                    _this.videos = res.data.videos;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        onChange(e) {
            this.file = e.target.files[0];
            let data = new FormData()
            data.append('file', this.file);
            BaseRequest.post('upload', data)
        },
    },
};
</script>
