<template>
    <div class="row" v-if="group.id">
        <div class="row g-0 dropdown-item" type="button">
            <div class="row g-0">
                <i class="col-auto ms-2 d-flex align-items-center">
                    <center>
                        <img
                            :src="'http://localhost:8080' + group.avatar"
                            style="width: 50px; height: 50px"
                        />
                    </center>
                </i>
                <div class="col-auto row g-0 ms-2">
                    <h6 class="row g-0 mt-3 mb-3">{{ group.name }}</h6>
                    <div class="row g-0 mb-3 opacity-50">
                        {{ date }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        group: {
            type: {
                Object,
            },
        },
    },
    data() {
        return {
            date: "",
        };
    },
    mounted() {
        this.date = moment(this.group.created_at, "YYYYMMDD").fromNow();
    },
};
</script>
