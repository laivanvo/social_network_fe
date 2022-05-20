<template>
  <div class="row">
    <div v-for="member in members" :key="member.id">
        {{ member.user.profile.first_name }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    members: {
      type: Array,
    },
  },
};
</script>
