<template>
    <div class="row g-0">
        <div class="col-3 border">
            <div class="row g-0 mt-3 mb-3">
                <h6 class="col-auto">Manager Group</h6>
                <div class="col-3"></div>
                <div class="col-auto ms-auto me-3">
                    <i class="bi bi-list"></i>
                </div>
            </div>
            <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                    <img
                        style="width: 50px; height: 50px"
                        :src="'http://localhost:8080' + group.avatar"
                    />
                </div>
                <div class="col-auto row g-0 ms-2 mb-3">
                    <h6 class="row g-0 ms-2">
                        {{ group.name }}
                    </h6>
                    <div class="row g-0 opacity-50">
                        <div class="col-auto ms-2">
                            <i class="bi bi-unlock"></i>
                        </div>
                        <div class="col-auto ms-2">
                            {{ group.audience }}
                        </div>
                    </div>
                </div>
            </div>
            <div type="button" @click="showPost()" class="dropdown-item">
                <div class="row g-0 mb-3">
                    <div class="col-auto">
                        <i class="bi bi-house"></i>
                    </div>
                    <div class="col-auto ms-3">Group Page</div>
                </div>
            </div>
            <div type="button" @click="showInfo()" class="dropdown-item">
                <div class="row g-0 mb-3">
                    <div class="col-auto">
                        <i class="bi bi-book"></i>
                    </div>
                    <div class="col-auto ms-3">Overview</div>
                </div>
            </div>
            <div class="row g-0 mb-3 d-flex align-items-center">
                <center><div class="row g-0 mb-3 border w-75"></div></center>
            </div>
            <h6 class="row g-0 opacity-50 mb-3">Administration Tools</h6>
            <div type="button" @click="showRequest()" class="dropdown-item">
                <div class="row g-0 mb-3">
                    <div class="col-auto">
                        <i style="color: blue" class="bi bi-person-plus"></i>
                    </div>
                    <div class="col-auto ms-3">Request Membership</div>
                </div>
            </div>
            <div type="button" @click="showMember()" class="dropdown-item">
                <div class="row g-0 mb-3">
                    <div class="col-auto">
                        <i style="color: blue" class="bi bi-people"></i>
                    </div>
                    <div class="col-auto ms-3">Membership</div>
                </div>
            </div>
            <div type="button" @click="showQueue()" class="dropdown-item">
                <div class="row g-0 mb-3">
                    <div class="col-auto">
                        <i style="color: blue" class="bi bi-archive"></i>
                    </div>
                    <div class="col-auto ms-3">Post In The Queue</div>
                </div>
            </div>
            <div
                class="row g-0 mb-3 dropdown-item"
                type="button"
                @click="showRule()"
            >
                <div class="row g-0">
                    <div class="col-auto">
                        <i
                            style="color: blue"
                            class="bi bi-file-earmark-ruled"
                        ></i>
                    </div>
                    <div class="col-auto ms-2">The Rule</div>
                </div>
            </div>
            <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                    <i style="color: blue" class="bi bi-camera"></i>
                </div>
                <div class="col-auto ms-2">Image</div>
            </div>
            <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                    <i style="color: blue" class="bi bi-camera-video"></i>
                </div>
                <div class="col-auto ms-2">Video</div>
            </div>
            <div class="row g-0 mb-3">
                <div class="col-auto ms-2">
                    <i style="color: blue" class="bi bi-gear"></i>
                </div>
                <div class="col-auto ms-2">Setting</div>
            </div>
        </div>
        <div class="col-9 row g-0 d-flex align-items-start">
            <div class="row g-0">
                <group-info :group="group" v-show="isInfo" />
                <post-group-view :group="group" v-show="isPost" />
                <request-member :group="group" v-show="isRequest" />
                <member-ship :group="group" v-show="isMember" />
                <post-queue :group="group" v-show="isQueue" />
                <post-rule :group="group" v-show="isRule" />
            </div>
        </div>
    </div>
</template>

<script>
import GroupInfo from "@/views/pages/group/view/GroupInfo.vue";
import PostGroupView from "@/views/pages/group/view/PostGroupView.vue";
import RequestMember from "@/views/pages/group/member/request/RequestMember.vue";
import MemberShip from "../member/MemberShip.vue";
import PostQueue from "@/views/pages/group/view/PostQueue.vue";
import PostRule from "@/views/pages/group/view/PostRule.vue";

export default {
    components: {
        GroupInfo,
        PostGroupView,
        RequestMember,
        MemberShip,
        PostQueue,
        PostRule,
    },
    created() {
        this.group = this.$route.params.group ? this.$route.params.group : null;
        if (!this.group) {
            this.group = JSON.parse(
                window.localStorage.getItem("groupView", this.group)
            );
        }
        window.localStorage.setItem("groupView", JSON.stringify(this.group));
    },
    data() {
        return {
            group: {},
            isInfo: false,
            isPost: true,
            isRequest: false,
            isMember: false,
            isQueue: false,
            isRule: false,
        };
    },
    methods: {
        showInfo() {
            this.isInfo = true;
            this.isPost = false;
            this.isRequest = false;
            this.isMember = false;
            this.isQueue = false;
            this.isRule = false;
        },
        showPost() {
            this.isInfo = false;
            this.isPost = true;
            this.isRequest = false;
            this.isMember = false;
            this.isQueue = false;
            this.isRule = false;
        },
        showRequest() {
            this.isInfo = false;
            this.isPost = false;
            this.isRequest = true;
            this.isMember = false;
            this.isQueue = false;
            this.isRule = false;
        },
        showMember() {
            this.isInfo = false;
            this.isPost = false;
            this.isRequest = false;
            this.isMember = true;
            this.isQueue = false;
            this.isRule = false;
        },
        showQueue() {
            this.isInfo = false;
            this.isPost = false;
            this.isRequest = false;
            this.isMember = false;
            this.isQueue = true;
            this.isRule = false;
        },
        showRule() {
            this.isInfo = false;
            this.isPost = false;
            this.isRequest = false;
            this.isMember = false;
            this.isQueue = false;
            this.isRule = true;
        },
    },
};
</script>
