<template>
    <span>Class</span>
</template>
<script>
export default {
  mounted () {
    this.$store.state.botNav.activeClass = true
  },
  destroyed () {
    this.$store.state.botNav.activeClass = false
  }
}
</script>
<style scoped>

</style>
