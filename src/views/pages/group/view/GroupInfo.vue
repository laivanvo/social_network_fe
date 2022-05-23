<template>
  <div class="row g-0">
    <div class="row g-0">
      <div class="col-6">
        <div class="row g-0">
          <img src="" class="col-3" alt="" />
          <div class="col-9">
            <div class="row g-0">{{ group.name }}</div>
            <div class="row g-0">{{ group.card }}</div>
            <div class="row g-0">{{ group.content }}</div>
          </div>
        </div>
        <div class="row g-0">
          <div class="row g-0">{{ group.bonus }}</div>
          <div class="row g-0"></div>
        </div>
      </div>
      <div class="col-6">
        <div class="col-6">
          <div class="row g-0">member</div>
          <div class="row g-0">audience</div>
          <div class="row g-0">language</div>
          <div class="row g-0">content</div>
          <div class="row g-0">author</div>
        </div>
        <div class="col-6">
          <div class="row g-0">{{ group.members ? group.members.length : 0 }}</div>
          <div class="row g-0">{{ group.audience }}</div>
          <div class="row g-0">ngon ngu</div>
          <div class="row g-0">chu de</div>
          <div class="row g-0">abc</div>
        </div>
      </div>
    </div>
    <div class="row g-0">
        <div class="row g-0"></div>
        <div class="row g-0">
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
            <div class="col-3"></div>
        </div>
    </div>
    <div class="row g-0">
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
