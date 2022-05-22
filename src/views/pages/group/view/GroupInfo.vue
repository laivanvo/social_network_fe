<template>
  <div class="row">
    <div class="row">
      <div class="col-6">
        <div class="row">
          <img src="" class="col-3" alt="" />
          <div class="col-9">
            <div class="row">{{ group.name }}</div>
            <div class="row">{{ group.card }}</div>
            <div class="row">{{ group.content }}</div>
          </div>
        </div>
        <div class="row">
          <div class="row">{{ group.bonus }}</div>
          <div class="row"></div>
        </div>
      </div>
      <div class="col-6">
        <div class="col-6">
          <div class="row">member</div>
          <div class="row">audience</div>
          <div class="row">language</div>
          <div class="row">content</div>
          <div class="row">author</div>
        </div>
        <div class="col-6">
          <div class="row">{{ group.members ? group.members.length : 0 }}</div>
          <div class="row">{{ group.audience }}</div>
          <div class="row">ngon ngu</div>
          <div class="row">chu de</div>
          <div class="row">abc</div>
        </div>
      </div>
    </div>
    <div class="row">
        <div class="row"></div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="row">
        <div class="col-2">
            <button>chinh</button>
        </div>
        <div class="col-8"></div>
        <div class="col-2">roi</div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        group: {
            type: Object,
        }
    },
}
</script>
