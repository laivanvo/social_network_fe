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
                    :src="'http://localhost:8080' + user.profile.avatar"
                  />
                </center>
              </div>
              <div class="col-10 row">
                <div class="row g-0">
                  {{ user.profile.last_name + " " + user.profile.first_name }}
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
                <option :value="'select option'">select option</option>
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
              <div
                class="col-4 row g-0"
                v-for="(src, index) in srcs"
                :key="index"
              >
                <img
                  v-if="src.type === 'image'"
                  style="width: 200px"
                  :src="src.path"
                />
                <video v-else controls>
                  <source
                    :src="src.path"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
            <div v-show="isFile" class="row g-0 justify-content-center">
              <div class="col-md-8">
                <div class="card">
                  <div class="card-header">Choose file you want</div>
                  <div class="card-body">
                    <div v-if="success != ''" class="alert alert-success">
                      {{ success }}
                    </div>
                    <input
                      v-show="false"
                      multiple
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
                  :src="'http://localhost:8080' + bgImage.path"
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
                <i @click="showBgImage" class="bi bi-emoji-smile col-3"></i>
                <i @click="showBgImage" class="bi bi-palette col-3"></i>
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
    in_queue: {
      type: Boolean,
    },
  },
  data() {
    return {
      bgImages: [],
      isFile: false,
      isBgImage: false,
      post: {
        audience: "select option",
      },
      success: "",
      height: 100,
      bg: "",
      options: ["public", "private"],
      bg_image: "",
      image: "",
      video: "",
      files: [],
      fileName: null,
      srcs: [],
    };
  },
  mounted() {
    this.getBgImage;
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
      for (let i = 0; i < e.target.files.length; i++) {
        this.srcs.push({'path': URL.createObjectURL(e.target.files[i]), 'type': e.target.files[i].type.substr(0, 5)});
        this.files.push(e.target.files[i]);
      }
    },
    createPost() {
      let data = new FormData();
      let _this = this;
      for (let i = 0; i < this.files.length; i++) {
        data.append("file" + i, this.files[i]);
      }
      data.append("count", this.files.length);
      data.append("text", this.post.text);
      data.append("audience", this.post.audience);
      console.log(this.post.audience)
      data.append("group_id", this.group_id);
      console.log(this.group_id)
      data.append("in_queue", this.in_queue);
      console.log(this.in_queue)
      BaseRequest.post("posts", data)
        .then(function (res) {
          _this.$emit("addPost", res.data.post);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
  },
};
</script>
