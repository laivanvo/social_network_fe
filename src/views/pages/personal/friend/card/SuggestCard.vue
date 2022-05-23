<template>
  <div class="row g-0">
    <div class="row g-0" style="height: 50px">
      <img
        class="w-100"
        :src="'http://localhost:8080' + profile.avatar"
      />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        profile: {
            type: Object,
        },
    },
}
</script>
