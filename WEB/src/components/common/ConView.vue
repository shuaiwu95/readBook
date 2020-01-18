<template>
    <div id="con-view" ref="conView">
        <slot></slot>
    </div>
</template>
<script>
export default {
  props: {
    hasTopNav: {
      default: true
    },
    hasBtoNav: {
      default: true
    }
  },
  methods: {
    setHeight () {
      const winH = window.screen.availHeight
      let tNavH = 0
      let bNavH = 0
      if (this.hasTopNav) {
        tNavH = document.getElementsByClassName('yd-navbar')[0].offsetHeight
      }
      if (this.hasBtoNav) {
        bNavH = document.getElementsByClassName('yd-tabbar')[0].offsetHeight
      }
      document.getElementById('con-view').style.height = winH - tNavH - bNavH + 'px'
    }
  },
  mounted () {
    this.setHeight()
    window.onresize = () => {
      this.setHeight()
    }
  }
}
</script>
<style scoped>

</style>
