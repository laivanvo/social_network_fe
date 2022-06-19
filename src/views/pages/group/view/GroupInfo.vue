<template>
    <div class="row g-0">
        <div class="col-6">
            <div class="row g-0">
                <h6 class="row g-0 mt-3 mb-4">About this group {{ group.id }}</h6>
                <div class="row g-0 d-flex align-items-center mb-4">
                    <center><div class="row g-0 w-75 border"></div></center>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Name:</h5>
                    <div class="col-auto">{{ group.name }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Author:</h5>
                    <div class="col-auto">
                        {{
                            group.user.profile.last_name +
                            " " +
                            group.user.profile.first_name
                        }}
                    </div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Audience:</h5>
                    <div class="col-auto">{{ group.audience }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Card:</h5>
                    <div class="col-auto">{{ group.card }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Content:</h5>
                    <div class="col-auto">{{ group.name }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Bonus:</h5>
                    <div class="col-auto">{{ group.bonus }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Members:</h5>
                    <div class="col-auto">{{ 30 }}</div>
                </div>
                <div class="row g-0 mb-4">
                    <h5 class="col-auto">Create_at:</h5>
                    <div class="col-auto">{{ date }}</div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <img class="w-100" :src="'http://localhost:8080' + group.avatar">
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    props: {
        group: {
            type: Object,
        },
    },
    data() {
        return {
            date: '',
        }
    },
    mounted() {
        this.date = moment(this.group.created_at, "YYYYMMDD h:mm:ss")
            .add(7, "hour")
            .fromNow();
    },
};
</script>
