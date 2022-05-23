<template>
    <div class="row g-0">
        <!-- Button trigger modal -->
        <!-- Modal -->
        <div
            class="row g-0 modal fade"
            :id="id"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header row">
                        <div class="row g-0">
                            <h5 class="col-10 text-center">Edit Post</h5>
                            <button
                                type="button"
                                class="col-2 btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                    </div>
                    <div class="modal-body row">
                        <div class="row g-0">
                            <div class="col-2">
                                <img
                                    src="@/assets/logo.png"
                                    class="card-img-top"
                                    alt="..."
                                />
                            </div>
                            <div class="col-4">
                                <div class="row g-0">
                                    {{ user.name }}
                                </div>
                                <label>Choose option:</label>

                                <select
                                    class="form-control"
                                    name="template"
                                    v-model="post.audience"
                                >
                                    <option :value="''">---</option>
                                    <option
                                        v-for="(item, index) in options"
                                        :value="item"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-floating row">
                            <textarea
                                :style="'; height:' + height + 'px;' + bg_image"
                                v-model="post.text"
                                id="content"
                                :class="'form-control'"
                            ></textarea>
                        </div>
                        <div class="row g-0">
                            <img
                                :id="'image' + post.id"
                                v-show="image"
                                class="row g-0"
                                :src="'http://localhost:8080' + fileName"
                            />
                            <video
                                :id="'video' + post.id"
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
                        <div v-show="isFile" class="row g-0 justify-content-center">
                            <div class="row g-0">
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
                                    @click="addBg(bgImage.path)"
                                />
                            </div>
                        </div>
                        <div class="row g-0">
                            <div class="col-6">Thêm vào bài viết</div>
                            <div class="col-6 row">
                                <i
                                    @click="upload"
                                    class="bi bi-image col-3"
                                ></i>
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
                            @click="updatePost"
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
// import $ from "jquery";

export default {
    components: {},
    props: {
        user: {
            type: Object,
        },
        postPre: {
            type: Object,
        },
        id: {
            type: String,
        },
    },
    data() {
        return {
            bgImages: [],
            isFile: true,
            isBgImage: false,
            post: {},
            success: "",
            height: 100,
            bg: "",
            options: ["public", "private"],
            image: false,
            video: false,
            edit: false,
            file: "",
            fileName: "",
            bg_image: "",
        };
    },
    mounted() {
        this.post = this.postPre;
        if (this.post.bg_image) {
            this.bg_image =
                "background-image: url(http://localhost:8080" +
                this.post.bg_image.path +
                ")";
        }
        this.fileName = this.post.file;
        this.getBgImage();
        this.getFile();
    },
    methods: {
        upload() {
            this.height = 30;
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
            document.getElementById(this.post.type + this.post.id).src =
                URL.createObjectURL(e.target.files[0]);
        },
        updatePost() {
            let data = new FormData();
            let _this = this
            data.append("file", this.file);
            data.append("text", this.post.text);
            data.append("audience", this.post.audience);
            data.append("bg", this.post.bg ? this.post.bg : '');
            BaseRequest.post("post/" + this.post.id, data)
                .then(function (res) {
                    _this.$emit('updatePost', res.data.post);
                })
                .catch(function () {});
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
