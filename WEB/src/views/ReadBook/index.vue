<template>
    <div style="height:100%;background-color: #E6E0D0;">
      <yd-navbar height="2.4rem" fontsize="1rem" :fixed="true" bgcolor="#333">
        <span slot="left" @click="back" style="font-size:1rem;">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </span>
        <span slot="center" style="font-size:1rem;color:#d2d4e1;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{$route.query.name}}</span>
      </yd-navbar>
      <div class="content">
        <div><span>{{dataObj.title}}</span></div>
        <div v-html="dataObj.con">
        </div>
        <div>
          <span @click="last" :class="dataObj.lastPath.indexOf('html') < 0 ? 'noneClick' : ''">上一章</span>
          <span>目录</span>
          <span @click="next">下一章</span>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: 'ReadBook',
  methods: {
    back () {
      this.$router.go(-1)
      this.$dialog.loading.close()
    },
    axiosPost (path) {
      this.$dialog.loading.open('正在加载')
      this.$api['getBook.readBook'](
        {
          path: path
        }
      ).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.dataObj = res.data
          window.scrollTo(0, 0)
          this.$dialog.loading.close()
          this.$set(this.storageBooks, this.$route.query.name, {})
          this.$set(this.storageBooks[this.$route.query.name], 'bookZhangjieName', this.dataObj.title)
          this.$set(this.storageBooks[this.$route.query.name], 'bookZhangjiePath', path)
          this.setStorageBooks(this.storageBooks)
        }
      }).catch(error => {
        console.log(error)
        this.$dialog.loading.close()
        this.$dialog.toast('网络出错，请稍后重试！', 'error', 2000)
      })
    },
    next () {
      this.axiosPost(this.dataObj.nextPath)
    },
    last () {
      if (this.dataObj.lastPath.indexOf('html') < 0) { return }
      this.axiosPost(this.dataObj.lastPath)
    },
    setStorageBooks (obj) { // 存储阅读记录
      var checkedIdStr = JSON.stringify(obj)
      this.$storage.setItem('books', checkedIdStr)
    }
  },
  mounted () {
    this.axiosPost(this.$route.query.path)
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
  },
  data () {
    return {
      dataObj: {},
      storageBooks: {}
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
    padding-bottom: 4rem;
  }
  .content div:nth-child(3){
    font-size: .9rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #333;
    color: #d2d4e1;
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 2rem;
  }
  .noneClick{
    color: #8b8282!important;
  }
</style>
