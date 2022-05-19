<template>
  <div class="row">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#CreateGroup"
    >
      Launch demo modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="CreateGroup"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <img id="avatar" class="row rounded-circle" alt="Cinque Terre" />
            <input type="file" class="row" v-on:change="onChange" />
            <div class="row">
              <p class="col-3">name:</p>
              <input type="text" class="col-9" v-model="group.name"/>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      group: {},
    };
  },
  methods: {
    onChange(e) {
      this.file = e.target.files[0];
      document.getElementById("avatar").src = URL.createObjectURL(
        e.target.files[0]
      );
    },
  },
};
</script>
