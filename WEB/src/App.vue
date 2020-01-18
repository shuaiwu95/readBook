<template>
<keep-alive :include="cachedViews">
   <router-view />
</keep-alive>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  methods: {
    initRem () {
      const html = document.querySelector('html')
      const { width } = html.getBoundingClientRect()
      html.style.fontSize = `${width / 50}px`
    },
    addViewToVisided () {
      const thisRoute = this.$route.meta.isCache ? this.$route : null
      if (thisRoute) this.$store.dispatch('views/addVisitedViews', { route: thisRoute })
    }
  },
  watch: {
    $route () {
      this.addViewToVisided()
    }
  },
  computed: {
    ...mapGetters('views', { // views.js里面的getters
      cachedViews: 'cachedViews'
    })
  },
  mounted () {
    // this.initRem()
    // window.onresize = () => {
    //   this.initRem()
    // }
    this.addViewToVisided()
  }
}
</script>

<style>
@import url('./assets/styles/iconFont.css');
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
