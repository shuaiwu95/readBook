<template>
    <div>
      <yd-navbar height="2.4rem" fontsize="1rem" :fixed="true">
        <span slot="left" @click="back" style="font-size:1rem;">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </span>
        <span slot="center" style="font-size:1rem;color:#000;">{{$route.query.name}}</span>
      </yd-navbar>
      <div class="content">
        <div><span>{{dataObj.title}}</span></div>
        <div>
          {{dataObj.con}}
        </div>
        <div></div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ReadBook',
  methods: {
    back () { this.$router.go(-1) }
  },
  mounted () {
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
    this.$api['getBook.readBook'](
      {
        path: this.$route.query.path,
        url: this.$route.query.url
      }
    ).then(res => {
      if (res.msg.indexOf('OK') >= 0) {
        this.dataObj = res.data
      }
    })
  },
  data () {
    return {
      dataObj: {}
    }
  }
}
</script>
<style scoped>
  .content{
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    padding: 1rem 1rem;
    background-color: #E6E0D0;
  }
  .content div:nth-child(1){
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .content div:nth-child(2){
    font-size: .9rem;
  }
</style>
