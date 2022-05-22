<template>
    <div class="home row p-0 m-0 border">
        <create-post-modal
            @addPost="addPost($event)"
            class="row"
            :user="user"
        />
        <div class="row">
            <div class="col-4">
                <i class="bi bi-person-plus fs-2"></i>
            </div>
            <img
                class="col-4 rounded-circle"
                :src="'http://localhost:8080' + profile.avatar"
                alt=""
            />
            <div class="col-4"></div>
        </div>
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4 text-center">
                <edit-profile class="row" />
            </div>
            <div class="col-4"></div>
        </div>
        <div class="row m-0 p-0">
            <styledLink @click="showPost()" class="col-3">
                <i class="bi bi-postcard fs-2"></i>
            </styledLink>
            <styledLink @click="showInfo()" class="col-3">
                <i class="bi bi-info-square fs-2"></i>
            </styledLink>
            <styledLink @click="showFriend()" class="col-3">
                <i class="bi bi-people fs-2"></i>
            </styledLink>
            <styledLink @click="showImage()" class="col-3">
                <i class="bi bi-card-image fs-2"></i>
            </styledLink>
        </div>
        <div v-show="isPost" class="row m-0 p-0">
            <div class="row">
                <div class="row p-0 m-0">
                    <div class="col-1">
                        <img
                            style="
                                border-radius: 50%;
                                height: 100%;
                                width: 100%;
                                overflow: hidden;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "
                            :src="'http://localhost:8080' + profile.avatar"
                            alt=""
                        />
                    </div>
                    <input
                        class="col-11"
                        type="text"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        placeholder="how are you today"
                    />
                </div>
                <div class="row p-0 m-0" v-for="post in posts" :key="post.id">
                    <post-app
                        class="row border mt-5 bg-white"
                        :postP="post"
                        :user="post.user"
                    />
                </div>
            </div>
        </div>
        <div class="row m-0 p-0" v-show="isInfo">
            <div class="row">
                <p class="col-3">Last-name:</p>
                <input
                    class="col-9"
                    type="text"
                    disabled
                    v-model="profile.last_name"
                />
            </div>
            <div class="row">
                <p class="col-3">first-name:</p>
                <input
                    class="col-9"
                    type="text"
                    disabled
                    v-model="profile.first_name"
                />
            </div>
            <div class="row">
                <p class="col-3">Address:</p>
                <input
                    class="col-9"
                    type="text"
                    disabled
                    v-model="profile.address"
                />
            </div>
            <div class="row">
                <p class="col-3">gender:</p>
                <i v-show="isMale" class="bi bi-gender-male fs-2 col-2"></i>
                <i v-show="!isMale" class="bi bi-gender-female fs-2 col-2"></i>
                <input
                    class="col-7"
                    type="text"
                    disabled
                    v-model="profile.gender"
                />
            </div>
            <div class="row">
                <p class="col-3">Birthday:</p>
                <i class="bi bi-egg-fried fs-2 col-2"></i>
                <input type="text" class="col-7" disabled v-model="birth" />
            </div>
            <div class="row">
                <p class="col-3">Phone-number:</p>
                <input
                    disabled
                    class="col-9"
                    type="tel"
                    id="phone"
                    v-model="profile.phone_number"
                    name="phone"
                    placeholder="123-45-678"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                />
            </div>
        </div>
        <div class="row m-0 p-0" v-show="isFirend">
            <div class="row m-0 p-0">
                <styledLink @click="showList()" class="col-3">
                    list Friend
                </styledLink>
                <styledLink @click="showRequest()" class="col-3">
                    List request
                </styledLink>
                <styledLink @click="showByAddress()" class="col-3">
                    Countryman
                </styledLink>
                <styledLink @click="showSend()" class="col-3">
                    List Send request
                </styledLink>
            </div>

            <div class="row mt-2 p-0 ">
                <div class="col-2">Search</div>
                <div class="col-3"></div>
                <input type="text" class="col-4" v-model="searchFriend" />
                <div class="col-3"></div>
            </div>
            <list-friend v-show="isAllFriend"/>
            <list-request v-show="isRequest"/>
            <list-send v-show="isByBirthday"/>
        </div>
        <div class="row m-0 p-0" v-show="isImage"></div>
    </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import PostApp from "@/views/pages//post/PostApp.vue";
import $ from "jquery";
import CreatePostModal from "@/views/pages//post/createPostModal/CreatePostModal.vue";
import styled, { css } from "vue-styled-components";
import EditProfile from "@/views/pages/personal/profile/EditProfile.vue";
import ListFriend from "@/views/pages/personal/friend/ListFriend.vue";
import ListSend from "@/views/pages/personal/friend/ListSend.vue";
import ListRequest from "@/views/pages/personal/friend/ListRequest.vue";


const styledLink = styled.button`
    &:hover {
        ${() => css`
            color: blue;
        `}
    }
`;
export default {
    components: {
        PostApp,
        CreatePostModal,
        styledLink,
        EditProfile,
        ListFriend,
        ListSend,
        ListRequest,
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
            isPost: false,
            isInfo: false,
            isFirend: false,
            isImage: false,
            isMale: false,
            birth: "",
            isAllFriend: false,
            isRequest: false,
            isByAddress: false,
            isByBirthday: false,
            searchFriend: "",
            relations: [],
        };
    },
    mounted() {
        this.getPost(this.page);
    },
    methods: {
        getPost(page) {
            let _this = this;
            BaseRequest.get("posts/personal?page=" + page)
                .then((response) => {
                    _this.profile = response.data.profile;
                    console.log(_this.profile);
                    _this.isMale =
                        this.profile.gender === "female" ? false : true;
                    let date = new Date(_this.profile.birthday);
                    _this.birth = date.toLocaleDateString("en-us", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                    });
                    response.data.posts.data.forEach((e) => {
                        _this.posts.map((x) => x.id).indexOf(e.id) === -1
                            ? _this.posts.push(e)
                            : console.log("This item already exists");
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getRelation(type) {
            let _this = this;
            BaseRequest.get("relations" + type)
                .then((response) => {
                    console.log(response);
                    _this.relations = response.data.relations;
                    console.log(_this.relations);
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
        showPost() {
            this.isPost = true;
            this.isInfo = false;
            this.isFirend = false;
            this.isImage = false;
        },
        showInfo() {
            this.isPost = false;
            this.isInfo = true;
            this.isFirend = false;
            this.isImage = false;
        },
        showFriend() {
            this.isPost = false;
            this.isInfo = false;
            this.isFirend = true;
            this.isImage = false;
        },
        showImage() {
            this.isPost = false;
            this.isInfo = false;
            this.isFirend = false;
            this.isImage = true;
        },
        showList() {
            this.isAllFriend = true;
            this.isRequest = false;
            this.isByAddress = false;
            this.isByBirthday = false;
        },
        showRequest() {
            this.isAllFriend = false;
            this.isRequest = true;
            this.isByAddress = false;
            this.isByBirthday = false;
        },
        showByAddress() {
            this.isAllFriend = false;
            this.isRequest = false;
            this.isByAddress = true;
            this.isByBirthday = false;
        },
        showSend() {
            this.isAllFriend = false;
            this.isRequest = false;
            this.isByAddress = false;
            this.isByBirthday = true;
        },
    },
};
</script>
