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
  },
  destroyed () {
    this.$store.state.botNav.activeMine = false
  }
}
</script>
<style scoped>

</style>
