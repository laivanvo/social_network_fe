<template>
  <div class="row g-0">
    <div class="row g-0 mt-5 mb-5"></div>
    <div class="row g-0 mt-5 mb-5"></div>
    <div class="row g-0 mb-5">
      <div class="col-3"></div>
      <div class="col-6 row g-0 border border-5 rounded">
          <slot />
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>
