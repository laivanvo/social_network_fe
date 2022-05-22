<template>
    <div class="row">
        <!-- Button trigger modal -->
        <button
            class="w-100 btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#CreateGroup"
        >
            <i class="bi bi-plus-lg"> Create Group</i>
        </button>

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
                        <h5 class="modal-title" id="exampleModalLabel">
                            Create group
                        </h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body row">
                        <div class="row mb-3">Create Group</div>
                        <div class="row mb-3">
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
                                            profile.avatar
                                        "
                                    />
                                </center>
                            </div>
                            <div class="col-10 row">
                                <div class="row">
                                    {{
                                        profile.last_name +
                                        " " +
                                        profile.first_name
                                    }}
                                </div>
                                <div class="opacity-50 row">Admin</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Avatar: </label>
                            <img id="avatar" class="row rounded mb-3" />
                            <input
                                type="file"
                                class="row"
                                v-on:change="onChange"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Name: </label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="group.name"
                                placeholder="name of group"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Audience: </label>
                            <select
                                class="form-control"
                                name="template"
                                v-model="group.audience"
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
                            <label class="form-label">Content: </label>
                            <textarea
                                style="height: 100px"
                                type="text"
                                class="form-control"
                                v-model="group.content"
                                placeholder="say some thing about this group"
                            />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Bonus: </label>
                            <div class="form-control row">
                                <label class="col-3 border">trade</label>
                                <label class="col-3 border">knowledge</label>
                                <label class="col-3 border">entertain</label>
                                <label class="col-3 border">sociable</label>
                                <label class="col-3 border">help new</label>
                                <label class="col-3 border">singing</label>
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
    props: {
        profile: {
            type: Object,
        },
    },
    data() {
        return {
            group: {
                audience: "select option",
            },
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
