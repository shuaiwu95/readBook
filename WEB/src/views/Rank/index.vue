<template>
    <span>排行</span>
</template>
<script>
export default {
  methods: {

  },
  mounted () {

  },
  destroyed () {

  },
  activated () {
    this.$store.state.botNav.activeRank = true
    this.$store.state.botNav.showTopNav = true
    this.$store.state.botNav.showBottomNav = true
  },
  deactivated: function () {
    this.$store.state.botNav.activeRank = false
  }
}
</script>
<style scoped>

</style>
