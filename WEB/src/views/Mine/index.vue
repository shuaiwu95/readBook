<template>
    <span><button @click="toLogin">去登录</button></span>
</template>
<script>
export default {
  methods: {
    toLogin () {
      this.$clearToken()
      this.$router.push({ name: 'Login' })
    }
  },
  mounted () {
    this.$store.state.botNav.activeMine = true
    this.$store.state.botNav.showTopNav = true
    this.$store.state.botNav.showBottomNav = true
  },
  destroyed () {
    this.$store.state.botNav.activeMine = false
  },
  activated () {

  },
  deactivated: function () {

  }
}
</script>
<style scoped>

</style>
