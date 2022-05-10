<template>
  <div class="dropdown col-1">
    <i
      class="bi bi-three-dots"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
    </i>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li>
        <a
          class="dropdown-item"
          data-bs-toggle="modal"
          :data-bs-target="'#commentEdit' + comment.id"
        >
          Edit
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#">Delete</a>
      </li>
      <li>
        <a class="dropdown-item" href="#">Something else here</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
        },
    },
}
</script>

