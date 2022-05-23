<template>
    <div class="row g-0">
        <div v-for="profile in profiles" :key="profile.id">
            {{ profile.first_name }}
        </div>
    </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
export default {
    props: {
        id: {
            type: Number,
        },
    },
    data() {
        return {
            profiles: [],
        };
    },
    created() {
        this.getProfile();
    },
    methods: {
        getProfile() {
            let _this = this;
            BaseRequest.get("members/" + this.id + "/accept").then(
                (res) => {
                    _this.profiles = res.data.profiles;
                }
            );
        },
    },
};
</script>
