<template>
    <div class="row g-0" v-if="user.profile">
        <!-- Button trigger modal -->
        <!-- Modal -->
        <div
            class="row g-0 modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header row">
                        <div class="row g-0">
                            <h5 class="col-10 text-center">Create Post</h5>
                            <button
                                type="button"
                                class="col-2 btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                    <div class="modal-body row">
                        <div class="row g-0 mb-3">
                            <div class="col-2 p-2">
                                <center>
                                    <img
                                        class="ms-1"
                                        style="
                                            width: 30px;
                                            height: 30px;
                                            border-radius: 50% 50% 50% 50%;
                                        "
                                        :src="
                                            'http://localhost:8080' +
                                            user.profile.avatar
                                        "
                                    />
                                </center>
                            </div>
                            <div class="col-10 row">
                                <div class="row g-0">
                                    {{
                                        user.profile.last_name +
                                        " " +
                                        user.profile.first_name
                                    }}
                                </div>
                                <div class="opacity-50 row">Admin</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Audience: </label>
                            <select
                                class="form-control"
                                name="template"
                                v-model="post.audience"
                            >
                                <option :value="'select option'">
                                    select option
                                </option>
                                <option
                                    v-for="(item, index) in options"
                                    :value="item"
                                    :key="index"
                                >
                                    {{ item }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">text: </label>
                            <textarea
                                style="height: 100px"
                                type="text"
                                class="form-control"
                                v-model="post.text"
                                placeholder="say some thing about this post"
                            />
                        </div>
                        <div class="row g-0">
                            <img
                                :id="'image'"
                                v-show="image"
                                class="row g-0"
                                :src="'http://localhost:8080' + fileName"
                            />
                            <video
                                :id="'video'"
                                v-show="video"
                                width="row"
                                controls
                            >
                                <source
                                    :src="'http://localhost:8080' + fileName"
                                    type="video/mp4"
                                />
                                Your browser does not support HTML video.
                            </video>
                        </div>
                        <div
                            v-show="isFile"
                            class="row g-0 justify-content-center"
                        >
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">
                                        Choose file you want
                                    </div>
                                    <div class="card-body">
                                        <div
                                            v-if="success != ''"
                                            class="alert alert-success"
                                        >
                                            {{ success }}
                                        </div>
                                        <input
                                            v-show="false"
                                            id="file-upload"
                                            type="file"
                                            class="form-control"
                                            v-on:change="onChange"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row g-0">
                            <div
                                class="col-2"
                                v-for="bgImage in bgImages"
                                :key="bgImage.id"
                                v-show="isBgImage"
                            >
                                <img
                                    class="form-control"
                                    :src="
                                        'http://localhost:8080' + bgImage.path
                                    "
                                    @click="addBg(bgImage.name, bgImage.id)"
                                />
                            </div>
                        </div>
                        <div class="row g-0">
                            <div class="col-6">Thêm vào bài viết</div>
                            <div class="col-6 row">
                                <label for="file-upload" class="col-3">
                                    <i class="bi bi-image row"></i>
                                </label>
                                <i
                                    @click="showBgImage"
                                    class="bi bi-emoji-smile col-3"
                                ></i>
                                <i
                                    @click="showBgImage"
                                    class="bi bi-palette col-3"
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            @click="createPost"
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
    components: {},
    props: {
        user: {
            type: Object,
        },
        group_id: {
            type: Number,
        },
    },
    data() {
        return {
            bgImages: [],
            isFile: false,
            isBgImage: false,
            post: { 
                audience: 'select option',
             },
            success: "",
            height: 100,
            bg: "",
            options: ["public", "private"],
            bg_image: "",
            image: "",
            video: "",
            file: "",
            fileName: null,
        };
    },
    mounted() {
        this.getBgImage();
        this.getFile();
    },
    methods: {
        upload() {
            this.isFile = !this.isFile;
        },
        getBgImage() {
            let _this = this;
            BaseRequest.get("bgImage")
                .then(function (res) {
                    _this.bgImages = res.data.bgImages;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        showBgImage() {
            this.isBgImage = !this.isBgImage;
        },
        addBg(name) {
            this.post.bg = name;
            this.bg_image = this.bg_image =
                "background-image: url(http://localhost:8080" + name + ")";
        },
        onChange(e) {
            this.file = e.target.files[0];
            this.post.type = this.file.type.substr(0, 5);
            this.getFile();
            document.getElementById(this.post.type).src = URL.createObjectURL(
                e.target.files[0]
            );
        },
        createPost() {
            let data = new FormData();
            let _this = this;
            data.append("file", this.file);
            console.log(this.file);
            data.append("text", this.post.text);
            data.append("audience", this.post.audience);
            data.append("bg", this.post.bg ? this.post.bg : "");
            data.append("group_id", this.group_id);
            BaseRequest.post("posts", data)
                .then(function (res) {
                    console.log(res.data.post);
                    _this.$emit("addPost", res.data.post);
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        getFile() {
            if (this.post.type === "image") {
                this.image = true;
                this.video = false;
            } else if (this.post.type === "video") {
                this.image = false;
                this.video = true;
            } else {
                this.isFile = false;
            }
        },
    },
};
</script>
