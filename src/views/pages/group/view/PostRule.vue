<template>
    <div class="row g-0 p-2" v-if="group">
        <div class="row g-0 mb-2 border border-5" v-for="rule in group.rules" :key="rule.id">
            {{rule.text}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        group: {
            type: Object,
        },
    },
    mounted() {
        console.log(this.group);
    }
};
</script>
