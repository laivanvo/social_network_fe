<template>
  <div class="row">
    <!-- Button trigger modal -->
    <div class="row">
      <div class="col-4"></div>
      <button
        type="button"
        class="btn btn-primary col-4"
        data-bs-toggle="modal"
        data-bs-target="#CreateGroup"
      >
        <i class="bi bi-cloud-plus"></i>
      </button>
      <div class="col-4"></div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="CreateGroup"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <img id="avatar" class="row rounded" />
            <input type="file" class="row" v-on:change="onChange" />
            <div class="row">
              <p class="col-3">name:</p>
              <input type="text" class="col-9" v-model="group.name" />
            </div>
            <select
              class="form-control"
              name="template"
              v-model="group.audience"
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
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              @click="createGroup()"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import EventBus from "@/main";

export default {
  data() {
    return {
      group: {},
      file: "",
      options: ["public", "private"],
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      document.getElementById("avatar").src = URL.createObjectURL(
        e.target.files[0]
      );
    },
    createGroup() {
      let data = new FormData();
      data.append("name", this.group.name);
      data.append("audience", this.group.audience);
      data.append("file", this.file);
      BaseRequest.post("groups", data).then((res) => {
        EventBus.$emit("createGroup", res.data.group);
      });
    },
  },
};
</script>
