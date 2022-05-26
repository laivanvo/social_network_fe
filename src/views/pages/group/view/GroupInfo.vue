<template>
  <div class="row g-0">
      <div class="col-2 row g-0">
        <div class="col-auto ms-auto border" style="width: 0px;"></div>
      </div>
      <div class="col-8">
        <div class="row g-0">
          <h6 class="row g-0 mt-3 ms-2 mb-4">About this group</h6>
          <div class="row g-0 d-flex align-items-center mb-4">
            <center><div class="row g-0 w-75 border"></div></center>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Name:</h5>
            <div class="col-auto ms-2">{{ group.name }}</div>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Author:</h5>
            <div class="col-auto ms-2">
              {{
                group.user.profile.last_name +
                " " +
                group.user.profile.first_name
              }}
            </div>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Audience:</h5>
            <div class="col-auto ms-2">{{ group.audience }}</div>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Card:</h5>
            <div class="col-auto ms-2">{{ group.card }}</div>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Content:</h5>
            <div class="col-auto ms-2">{{ group.name }}</div>
          </div>
          <div class="row g-0 mb-4">
            <h5 class="col-auto ms-2">Bonus:</h5>
            <div class="col-auto ms-2">{{ group.bonus }}</div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
    },
  },
};
</script>
