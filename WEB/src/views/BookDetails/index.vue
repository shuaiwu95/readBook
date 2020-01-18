<template>
    <div>
      <yd-navbar height="2.4rem" fontsize="1rem">
        <span slot="left" @click="back" style="font-size:1rem;">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </span>
        <span slot="center" style="font-size:1rem;color:#000;">{{$route.query.name}}</span>
      </yd-navbar>
      <!-- <yd-list theme="4">
        <yd-list-item style="height: 5rem;">
            <img style="height: 4rem;width:4rem;" slot="img" :src="detail.imgUrl">
            <span slot="title" style="font-size:0.8rem;">{{detail.title}}</span>
        </yd-list-item>
      </yd-list> -->
    </div>
</template>
<script>
export default {
  name: 'Detail',
  methods: {
    back () { this.$router.go(-1) }
  },
  mounted () {
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
    this.$api['getBook.details']({ id: this.$route.query.url }).then(res => {
      if (res.msg.indexOf('OK') >= 0) {
        this.detail = res.data
      }
    })
  },
  data () {
    return {
      detail: {}
    }
  }
}
</script>
<style scoped>

</style>
