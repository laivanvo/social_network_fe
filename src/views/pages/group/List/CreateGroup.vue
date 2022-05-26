<template>
    <div class="row g-0">
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
                        <div class="row g-0 mb-3">Create Group</div>
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
                                            profile.avatar
                                        "
                                    />
                                </center>
                            </div>
                            <div class="col-10 row">
                                <div class="row g-0">
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
                            <label class="form-label row">Avatar: </label>
                            <label for="avatar-group" class="row">
                                <div class="bg-secondary row g-0" style="height: 300px">
                                    <img id="avatar" class="w-100 h-100 mb-3" />
                                </div>
                            </label>
                            <input
                                id="avatar-group"
                                v-show="false"
                                type="file"
                                class="row g-0"
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
                                <label class="col-3 border" id="trade" @click="setBonus('trade')">trade</label>
                                <label class="col-3 border" id="knowledge" @click="setBonus('knowledge')">knowledge</label>
                                <label class="col-3 border" id="entertain" @click="setBonus('entertain')">entertain</label>
                                <label class="col-3 border" id="sociable" @click="setBonus('sociable')">sociable</label>
                                <label class="col-3 border" id="help" @click="setBonus('help')">help new</label>
                                <label class="col-3 border" id="singing" @click="setBonus('singing')">singing</label>
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
import $ from "jquery";

export default {
    props: {
        profile: {
            type: Object,
        },
    },
    data() {
        return {
            group: {
                bonus: "",
                audience: "select option",
            },
            file: "",
            options: ["public", "private"],
            bonus: [],
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
            this.bonus.forEach((e) => {
                this.group.bonus += e + " ";
            });
            data.append("name", this.group.name);
            data.append("audience", this.group.audience);
            data.append("file", this.file);
            data.append("content", this.group.content);
            data.append("bonus", this.group.bonus);
            BaseRequest.post("groups", data).then((res) => {
                this.$router.push({ name: 'groupView', params: {group: res.data.group}})
            });
        },
        setBonus(item) {
            if (!this.bonus.includes(item)) {
                this.bonus.push(item);
                console.log(this.bonus)
                $('#' + item).addClass("bg-primary");
            } else {
                this.bonus.splice(this.bonus.indexOf(item), 1);
                console.log(this.bonus)
                $('#' + item).removeClass("bg-primary");
            }
        }
    },
};
</script>
