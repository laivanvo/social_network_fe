<template>
    <div class="row g-0" @click="showProfile()">
        <div class="row g-0 mb-2">
            <div class="col-3">
                <img
                    style="
                        width: 50px;
                        height: 50px;
                        border-radius: 50% 50% 50% 50%;
                    "
                    :src="'http://localhost:8080' + profile.avatar"
                />
            </div>
            <div class="col-9 ps-2 row g-0 d-flex align-items-center mb-2">
                <h5 class="row g-0 mb-2 text-truncate">
                    {{ profile.last_name + " " + profile.first_name }}
                </h5>
                <div class="row g-0 mb-2">{{ count }} friend same</div>
            </div>
        </div>
    </div>
</template>

<script>
import EventBus from "@/main";
import BaseRequest from "@/helpers/BaseRequest";
export default {
    props: {
        profileP: {
            type: Object,
        },
    },
    data() {
        return {
            profile: {},
            count: null,
        };
    },
    mounted() {
        this.profile = this.profileP;
        this.getSameFriend();
    },
    methods: {
        showProfile() {
            EventBus.$emit("showProfile", this.profile);
        },
        getSameFriend() {
            BaseRequest.get(
                "relations/sameFriend/" + this.profile.user_id
            ).then((res) => {
                this.count = res.data.count;
            });
        },
    },
};
</script>
