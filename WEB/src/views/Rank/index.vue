<template>
    <span>排行</span>
</template>
<script>
export default {
  methods: {

  },
  mounted () {
    this.$store.state.botNav.activeRank = true
  },
  destroyed () {
    this.$store.state.botNav.activeRank = false
  }
}
</script>
<style scoped>

</style>
