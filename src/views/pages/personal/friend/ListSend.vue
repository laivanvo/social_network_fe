<template>
    <div class="row g-0">
        <div class="row g-0" v-for="profile in profiles" :key="profile.id">
            <app-friend :profileP="profile" />
        </div>
    </div>
</template>

<script>
import AppFriend from "@/views/pages/personal/friend/AppFriend.vue";
import BaseRequest from "@/helpers/BaseRequest";
export default {
    components: {
        AppFriend,
    },
    data() {
        return {
            profiles: [],
        };
    },
    mounted() {
        this.getProfile();
    },
    methods: {
        getProfile() {
            let _this = this;
            BaseRequest.get("relation/listSend").then((res) => {
                _this.profiles = res.data.profiles;
            });
        },
    },
};
</script>
