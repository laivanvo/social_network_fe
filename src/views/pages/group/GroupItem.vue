<template>
  <div class="row">
    <i class="col-auto ms-2"></i>
    <div class="col-auto ms-2">{{ group.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: {
        Object,
      },
    },
  },
};
</script>
