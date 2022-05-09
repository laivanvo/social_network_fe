<template>
    <div class="row" name="posts">
        <div class="col-3"></div>
        <div class="col-6">
            <div v-for="item in pageOfItems" :key="item.id">
                <post-app class="border mt-4" :post="item" :key="keyPostApp" />
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
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages/personal/post/PostApp.vue";
import $ from "jquery";
export default {
    components: {
        PostApp,
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
        };
    },
    mounted() {
        this.getPost();
    },
    methods: {
        getPost() {
            BaseRequest.get("posts/personal")
                .then((response) => {
                    this.posts = response.data.posts;
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
    },
};
</script>

