<template>
    <div class="row">
        <div
            class="list-group dropdown row"
            v-for="profile in profiles"
            :key="profile.id"
        >
            <member-app :id="id" :profileP="profile" v-if="profile"/>
        </div>
    </div>
</template>
<script>
import BaseRequest from "@/helpers/BaseRequest";
import MemberApp from '@/views/pages/group/view/MemberApp.vue'
export default {
    components: {
        MemberApp,
    },
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
            BaseRequest.get("members/" + this.id + "/request").then((res) => {
                _this.profiles = res.data.profiles;
            });
        },
    },
};
</script>
