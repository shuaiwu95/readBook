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
.yd-back-icon:before, .yd-next-icon:before{
  font-size: 1rem !important;
}
.yd-popup-content{
  background-color: #f5f5f5!important;
}
.yd-cell-left {
    color: #555;
    font-size: .9rem!important;
    white-space: nowrap;
    -ms-flex-align: center;
}
.yd-input-error:after {
    content: "\E614";
    color: #f43530;
    font-size: 1rem!important;
}
.yd-input-password:after {
    content: "\E77E";
    color: #b2b2b2;
   font-size: 1rem!important;
}
.yd-input>input{
  font-size: .9rem!important;
}
.yd-cell-right select{
   font-size: .9rem!important;
}
</style>
