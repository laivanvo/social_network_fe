<template>
    <div class="row">
        <div class="row">
            <div class="col-6">
                <i class="bi bi-star-half"></i>
            </div>
            <div class="col-6">
                {{ countReaction }}
            </div>
        </div>
        <div class="row">
            <i @click="addLike()" v-show="!isLike" class="bi bi-star"></i>
            <i @click="addLike()" v-show="isLike" class="bi bi-star-fill"></i>
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
        type: {
            type: String,
        },
        count_reaction: {
            type: Number,
        },
    },
    data() {
        return {
            isLike: false,
            countReaction: 0,
        };
    },
    mounted() {
        this.getReaction();
        this.countReaction = this.count_reaction;
    },
    methods: {
        getReaction() {
            let _this = this;
            let data = new FormData();
            data.append("id", this.id);
            data.append("type", this.type);
            BaseRequest.post("reactions", data)
                .then((response) => {
                    _this.isLike = response.data.isLike;
                    _this.countReaction = response.data.count;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        addLike() {
            let data = new FormData();
            let _this = this;
            data.append("id", this.id);
            data.append("type", this.type);
            BaseRequest.post("reaction", data)
                .then(function () {
                    if (_this.isLike) {
                        _this.countReaction--;
                    } else {
                        _this.countReaction++;
                    }
                    _this.isLike = !_this.isLike;
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
    },
};
</script>
