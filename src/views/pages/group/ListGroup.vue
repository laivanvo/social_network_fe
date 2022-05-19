<template>
    <div class="row">
        <create-group />
        <div v-for="item in groups" :key="item.id">
            <div class="card" style="width: 18rem">
                <img
                    :src="'http://localhost:8080' + item.avatar"
                    class="card-img-top"
                />
                <div class="row card-body">
                    <p class="row card-text">
                        welcome to {{ item.name }}
                    </p>
                    <p class="row card-text">
                        Author:  {{ item.user.profile.last_name + " " + item.user.profile.first_name}}
                    </p>
                    <button class="row btn btn-primary" @click="joinGroup()">Join group</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseRequest from "@/helpers/BaseRequest";
import CreateGroup from "@/views/pages/group/CreateGroup.vue";
export default {
    components: {
        CreateGroup,
    },
    data() {
        return {
            groups: [],
        };
    },
    mounted() {
        this.getGroup();
    },
    methods: {
        getGroup() {
            let _this = this;
            BaseRequest.get("groups").then((res) => {
                _this.groups = res.data.groups;
            });
        },
    },
};
</script>
