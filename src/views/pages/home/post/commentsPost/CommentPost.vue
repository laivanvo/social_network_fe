<template>
    <div class="row" v-show="!isDelete">
        <div class="row">
            <div class="col-10">
                <div class="row">
                    <div class="col-2">
                        <!-- <img src="#"/> -->
                    </div>
                    <div class="col-3">
                        {{ user.name }}
                    </div>
                </div>
                <div v-show="!isEdit" class="row">
                    {{ editText }}
                </div>
                <div v-show="isEdit" class="row">
                    <input
                        type="text"
                        v-on:keyup.enter="editComment"
                        v-model="editText"
                    />
                </div>
            </div>
            <div class="col-2">
                <div class="dropdown col-1">
                    <i
                        class="bi bi-card-list"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                    </i>
                    <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                    >
                        <li>
                            <a @click="edit" class="dropdown-item"> Edit </a>
                        </li>
                        <li>
                            <a @click="deleteComment" class="dropdown-item"
                                >Delete</a
                            >
                        </li>
                        <li>
                            <a class="dropdown-item" href="#"
                                >Something else here</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <reaction-app :id="comment.id" :type="'comment'" :user="user" />
            </div>
            <div class="col-3" @click="showComment">
                <styledLink>comment</styledLink>
            </div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-10">
                <div class="row" v-show="commentShow">
                    <div v-for="item in comments" :key="item.id">
                        <RepComment1 class="m-0 p-0" :comment="item" :user="user" />
                    </div>
                    <div class="row" @click="loadMoreComment">
                        <styledLink>load more</styledLink>
                    </div>
                    <input
                        v-on:keyup.enter="addComment"
                        type="text"
                        class="form-control"
                        placeholder="comment in this"
                        v-model="addText"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import styled, { css } from "vue-styled-components";
const styledLink = styled.p`
    &:hover {
        ${() => css`
            text-decoration: underline;
            color: blue;
        `}
    }
`;
import RepComment1 from "@/views/pages/home/post/commentsPost/repComment/RepComment1.vue";
import ReactionApp from "@/views/pages/home/post/commentsPost/ReactionApp.vue";
import BaseRequest from "@/helpers/BaseRequest";

export default {
    components: {
        styledLink,
        RepComment1,
        ReactionApp,
    },
    props: {
        comment: {
            type: Object,
        },
        user: {
            type: Object,
        },
        post: {
            type: Object,
        },
    },
    data() {
        return {
            commentShow: false,
            pageOfItems: [],
            addText: "",
            comments: [],
            page: 0,
            editText: "",
            isEdit: false,
            isDelete: false,
        };
    },
    mounted() {
        this.editText = this.comment.text;
    },
    methods: {
        getComment(page) {
            let data = new FormData();
            let _this = this;
            data.append("id", this.comment.id);
            data.append("type", "comment");
            BaseRequest.post("comments?page=" + page, data)
                .then((response) => {
                    _this.comments = _this.comments.concat(
                        response.data.comments.data
                    );
                    _this.countComment = response.data.countComment;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        showComment() {
            this.commentShow = !this.commentShow;
        },
        loadMoreComment() {
            this.getComment(++this.page);
        },
        personal() {
            this.$router.push({ name: "personal" });
        },
        getFile() {
            if (this.post.type === "image") {
                this.image = true;
            } else if (this.post.type === "video") {
                this.video = true;
            }
        },
        EditPost() {
            this.edit = true;
        },
        addLike(isLike) {
            if (isLike) {
                this.countReaction++;
            } else {
                this.countReaction--;
            }
        },
        edit() {
            this.isEdit = !this.isEdit;
        },
        editComment() {
            let _this = this;
            let data = new FormData();
            data.append("text", this.editText);
            BaseRequest.get("comments/" + this.comment.id)
                .then(function () {
                    _this.isEdit = !_this.isEdit;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        deleteComment() {
            let _this = this;
            let data = new FormData();
            data.append("text", this.editText);
            BaseRequest.post("comments/" + this.comment.id, data)
                .then(function () {
                    _this.isDelete = true;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        addComment() {
            let data = new FormData();
            let _this = this;
            data.append("id", this.comment.id);
            data.append("type", "comment");
            data.append("text", this.addText);
            this.addText = "";
            BaseRequest.post("comment", data)
                .then(function (res) {
                    _this.comments.push(res.data.comment);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    },
};
</script>
