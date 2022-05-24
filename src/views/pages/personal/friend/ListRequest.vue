<template>
  <div class="row g-0" :is="layout">
    <personal-page/>
  </div>
</template>

<script>
import ListRequestLayout from "@/views/layouts/ListRequestLayout.vue";
import PersonalPage from "@/views/pages/personal/PersonalPage.vue"
export default {
  components: {
    PersonalPage,
  },
  props: {
    profile: {
      type: Object,
    },
  },
  computed: {
    layout() {
      return this.$route.meta.layout ?? ListRequestLayout;
    },
  },
};
</script>
