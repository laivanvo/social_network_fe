<template>
    <div class="row">
        <!-- Button trigger modal -->
        <!-- Modal -->
        <div
            class="row modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header row">
                        <div class="row">
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
                        <div class="row">
                            <div class="col-2">
                                <img
                                    src="@/assets/logo.png"
                                    class="card-img-top"
                                    alt="..."
                                />
                            </div>
                            <div class="col-4">
                                <div class="row">
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
                                v-model="post.text"
                                id="content"
                                :class="'form-control ' + post.bg"
                                :style="'; height:' + height + 'px;' + bg_image"
                            ></textarea>
                        </div>
                        <div v-show="isFile" class="row justify-content-center">
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
                                            type="file"
                                            class="form-control"
                                            v-on:change="onChange"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
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
                        <div class="row">
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
    },
    data() {
        return {
            bgImages: [],
            isFile: false,
            isBgImage: false,
            post: {
                text: "",
                file: "",
                audience: "",
                bg: 0,
            },
            success: "",
            height: 100,
            bg: "",
            options: ["public", "private"],
            bg_image: "",
        };
    },
    mounted() {
        if (this.post.bg_image) {
            this.bg_image =
                "background-image: url(http://localhost:8080" +
                this.post.bg_image.path +
                ")";
        }
        this.getBgImage();
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
        addBg(name, id) {
            this.post.bg = id;
            this.bg_image = this.bg_image =
                "background-image: url(http://localhost:8080" + name + ")";
        },
        onChange(e) {
            this.post.file = e.target.files[0];
        },
        createPost() {
            let data = new FormData();
            let _this = this;
            data.append("file", this.post.file);
            data.append("text", this.post.text);
            data.append("audience", this.post.audience);
            data.append("bg", this.post.bg);
            BaseRequest.post("posts", data)
                .then(function (res) {
                    _this.$emit("addPost", res.data.post);
                })
                .catch(function (err) {
                    alert(2)
                    console.log(err)
                });
        },
    },
};
</script>
