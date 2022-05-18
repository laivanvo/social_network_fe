<template>
  <div class="row">
    <div class="row">
        <div class="row">
            <div class="col-4">
                <div class="col-8 row">
                    <button class="btn btn-primary col-3"><i class="bi bi-bank2 fs-1"></i></button>
                    <input type="text" class="col-9 ms-0 ps-0">
                </div>
            </div>
            <div class="col-4"></div>
            <div class="col-4"></div>
        </div>
    </div>
    <div class="row">
      <div class="col-3"></div>
      <div class="col-1"></div>
      <div class="col-4">
        <slot/>
      </div>
      <div class="col-1"></div>
      <div class="col-3"></div>
    </div>
    <div class="row"></div>
  </div>
</template>
