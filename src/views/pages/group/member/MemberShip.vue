<template>
    <div class="row g-0 border border-3 rounded">
        <div class="row g-0">
            <div class="row g-0 mt-3 mb-3 ms-2">
                <h5 class="col-auto">Membership</h5>
                <div class="col-auto ms-auto me-4">
                    <i class="bi bi-sliders"></i>
                </div>
            </div>
            <div
                class="col-10 row g-0 ms-1 d-flex align-items-center"
                style="position: relative"
            >
                <input
                    v-on:keyup.enter="addComment"
                    @keyup="myFunction"
                    type="text"
                    class="form-control ms-1 me-1 rounded-pill"
                    placeholder="search in this"
                    style="position: absolute"
                />
            </div>
            <div class="dropdown col-auto ms-auto me-4">
                <div
                    class="bg-light row border ps-4 pe-4"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    newest
                </div>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li>
                        <a class="dropdown-item"> newest </a>
                    </li>
                    <li>
                        <a class="dropdown-item">top</a>
                    </li>
                </ul>
            </div>
            <div class="row g-0 mt-3 ps-3 pe-3 mb-3">
                <div class="row g-0" v-for="profile in pros" :key="profile.id">
                    <profile-app-member
                        :request="false"
                        :id="group.id"
                        class="row g-0"
                        :profile="profile"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileAppMember from "@/views/profile/ProfileAppMember.vue";
import BaseRequest from "@/helpers/BaseRequest";
export default {
    components: { ProfileAppMember },
    props: {
        group: {
            type: Object,
        },
    },
    data() {
        return {
            profiles: [],
            pros: [],
        };
    },
    mounted() {
        this.getRequest();
    },
    methods: {
        getRequest() {
            BaseRequest.get("members/index/" + this.group.id).then((res) => {
                this.profiles = res.data.profiles;
                this.pros = this.profiles;
            });
        },
        myFunction(input) {
            this.pros = [];
            this.profiles.map((e) => {
                if (e.first_name.toLowerCase().indexOf(input.target.value) !== -1) {
                    this.pros.push(e);
                }
            });
        },
    },
};
</script>
