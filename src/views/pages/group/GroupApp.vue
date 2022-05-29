<template>
    <div class="row g-0" :is="layout">
        <post-group v-show="isPostGroup"/>
        <group-discover v-show="isDiscover"/>
        <!-- <group-notification v-show="false"/> -->
    </div>
</template>

<script>
import ListOfMe from "@/views/pages/group/List/ListOfMe.vue";
import ListSend from "@/views/pages/group/List/ListSend.vue";
import ListGroup from "@/views/pages/group/List/ListGroup.vue";
import styled, { css } from "vue-styled-components";
import LayoutGroup from "@/views/layouts/LayoutGroup.vue"
import PostGroup from "@/views/pages/group/PostGroup.vue"
import EventBus from '@/main';
import GroupDiscover from "@/views/pages/group/GroupDiscover.vue"

const styledLink = styled.button`
    &:hover {
        ${() => css`
            color: blue;
        `}
    }
`;

export default {
    components: {
        ListOfMe,
        ListSend,
        ListGroup,
        styledLink,
        LayoutGroup,
        PostGroup,
        GroupDiscover,
    },
    created() {
        EventBus.$on("showDiscoverGroup", this.showDiscoverGroup);
        EventBus.$on("showPostGroup", this.showPostGroup);
    },
    computed: {
        layout() {
            return this.$route.meta.layout ?? LayoutGroup;
        },
    },
    data() {
        return {
            isOfMe: true,
            isSend: false,
            isList: false,
            isDiscover: false,
            isPostGroup: true,
        };
    },
    methods: {
        listOfMe() {
            this.isOfMe = true;
            this.isSend = false;
            this.isList = false;
        },
        listSend() {
            this.isOfMe = false;
            this.isSend = true;
            this.isList = false;
        },
        list() {
            this.isOfMe = false;
            this.isSend = false;
            this.isList = true;
        },
        showDiscoverGroup() {

           this.isDiscover = true;
           this.isPostGroup = false;
        },
        showPostGroup() {
            this.isPostGroup = true;
            this.isDiscover = false;
        }
    },
};
</script>
