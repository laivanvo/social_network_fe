<template>
  <div>
      <div :class="`Modal ${setOpenModal()}`" @click="modalEvent($event)">
  </div>
  </div>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setOpenModal() {
      return this.isOpen ? 'is-open' : ''
    },
    modalEvent(e) {
      const clickCon = document.elementFromPoint(e.clientX, e.clientY)
      if (clickCon && clickCon.classList.contains('Modal')) {
        this.$emit('close')
      }
    }
  }

}
</script>
