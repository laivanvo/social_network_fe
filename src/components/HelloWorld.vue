<template>
  <div class="hello">
    <button @click="add()">dadad</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    add() {
      this.$router.push({name: 'abc'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

