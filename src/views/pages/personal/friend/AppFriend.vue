<template>
    <div class="row g-0" v-show="!isDelete">
        <div
            class="list-group-item active mt-2 col-10"
            :id="'drop' + profile.id"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-current="true"
        >
            {{ profile.first_name }}
        </div>
        <button @click="deleteMember()" class="col-2 mt-2">
            delete
        </button>
        <ul class="dropdown-menu row" :aria-labelledby="'drop' + profile.id">
            <li class="row g-0">
                <div class="row g-0">
                    <p class="col-3">Last-name:</p>
                    <input
                        class="col-9"
                        type="text"
                        disabled
                        v-model="profile.last_name"
                    />
                </div>
                <div class="row g-0">
                    <p class="col-3">first-name:</p>
                    <input
                        class="col-9"
                        type="text"
                        disabled
                        v-model="profile.first_name"
                    />
                </div>
                <div class="row g-0">
                    <p class="col-3">Address:</p>
                    <input
                        class="col-9"
                        type="text"
                        disabled
                        v-model="profile.address"
                    />
                </div>
                <!-- <div class="row g-0">
                    <p class="col-3">gender:</p>
                    <i v-show="isMale" class="bi bi-gender-male fs-2 col-2"></i>
                    <i
                        v-show="!isMale"
                        class="bi bi-gender-female fs-2 col-2"
                    ></i>
                    <input
                        class="col-7"
                        type="text"
                        disabled
                        v-model="profile.gender"
                    />
                </div> -->
                <!-- <div class="row g-0">
                    <p class="col-3">Birthday:</p>
                    <i class="bi bi-egg-fried fs-2 col-2"></i>
                    <input type="text" class="col-7" disabled v-model="birth" />
                </div> -->
                <div class="row g-0">
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
            </li>
        </ul>
    </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
    props: {
        id: {
            type: Number,
        },
        profileP: {
            type: Object,
        },
    },
    data() {
        return {
            isDelete: false,
            profile: {},
        };
    },
    created() {
        this.profile = this.profileP;
    },
    methods: {
        deleteMember() {
            let _this = this;
            let data = new FormData();
            data.append("group_id", this.id);
            data.append("user_id", this.profile.user_id);
            BaseRequest.post("members/destroy", data).then(() => {
                _this.isDelete = true;
            });
        }
    },
};
</script>
