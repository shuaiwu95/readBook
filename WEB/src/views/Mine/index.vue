<template>
    <div>
      <div class="minePanel">
        <div>
          <img :src="userImg"/>
        </div>
        <div>
          <span>{{nickName || '游客123'}}</span>
          <span>{{userId || '123456'}}</span>
        </div>
      </div>
      <yd-cell-group style="margin-top:1rem;">
        <yd-cell-item arrow @click.native="showHistory = true">
            <yd-icon style="margin-left:0.5rem;" slot="icon" name="footmark" color="#00c98d" size="1.2rem"></yd-icon>
            <span style="font-size:1rem; margin-left:1rem;" slot="left">阅读记录</span>
        </yd-cell-item>
        <yd-cell-item arrow @click.native="toBookShelf">
            <yd-icon style="margin-left:0.5rem;" slot="icon" name="shopcart" color="red" size="1.2rem"></yd-icon>
            <span style="font-size:1rem;margin-left:1rem;" slot="left">我的书架</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-button size="large" :type="btnType" @click.native="toLogin">{{btnName}}</yd-button>
        <yd-popup v-model="showHistory" position="right" style="background-color:#f5f5f5;!important">
          <div class="his-title"><span>阅读记录</span></div>
          <div class="historyCon">
            <div class="his-list" :key="index" v-for="(item,index) in hisData" @click="goRead(item)">
              <div class="his-img">
                <img :src="item.img"/>
              </div>
              <div class="his-detail">
                <span><label style="font-size:1rem;color:#000;">{{item.name}}</label></span>
                <span><label>{{item.author}}</label></span>
                <span><label>阅读至：{{item.zj}}</label></span>
              </div>
            </div>
          </div>
        </yd-popup>
    </div>
</template>
<script>
export default {
  methods: {
    toBookShelf () {
      if (!this.userId) {
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '您只有登录后才可以查看书架哦，点击确定去登录',
          opts: () => {
            this.toLogin()
          }
        })
        return
      }
      this.$router.push({ name: 'BookShelf' })
    },
    toLogin () {
      // this.$clearToken()
      if (this.$storage.getItem('TOKEN_STR')) {
        this.$storage.removeItem('TOKEN_STR')
        this.$storage.removeItem('nickName')
      }
      this.$router.push({ name: 'Login' })
    },
    goRead (obj) {
      this.$router.push({
        name: 'ReadBook',
        query: {
          path: obj.path,
          name: obj.name,
          url: obj.path,
          img: obj.img,
          author: obj.author
        }
      })
    }
  },
  mounted () {
    this.$store.state.botNav.activeMine = true
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = true
    // 获取阅读记录
    const storageBooks = JSON.parse(this.$storage.getItem('books'))
    if (storageBooks) {
      for (var key in storageBooks) {
        if (key !== 'undefined') {
          this.hisData.push({
            name: key,
            author: storageBooks[key.toString()].author || '暂无',
            img: storageBooks[key.toString()].img,
            zj: storageBooks[key.toString()].bookZhangjieName,
            path: storageBooks[key.toString()].bookZhangjiePath
          })
        }
      }
    }
    this.userId = this.$storage.getItem('TOKEN_STR')
    this.nickName = this.$storage.getItem('nickName')
    if (this.userId) {
      this.btnType = 'danger'
      this.btnName = '注销登录'
    }
  },
  destroyed () {
    this.$store.state.botNav.activeMine = false
  },
  activated () {
    this.$store.state.botNav.activeMine = true
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = true
  },
  deactivated: function () {

  },
  data () {
    return {
      userImg: 'http://img-tailor.11222.cn/pm/app/img_1508230970.png',
      showHistory: false,
      hisData: [],
      userId: '',
      nickName: '',
      btnType: 'primary',
      btnName: '去登录'
    }
  }
}
</script>
<style scoped>
  .minePanel{
    background: #ffffff;
    display: flex;
    flex-direction: row;
  }
  .minePanel:nth-child(1){
    padding: 1.5rem;
  }
  .minePanel div:nth-child(1) img{
    width: 3rem;
    height: 3rem;
  }
  .minePanel div:nth-child(2){
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
  }
  .minePanel div:nth-child(2) span{
    line-height: 1.5rem;
    font-size: .8rem;
  }
  .minePanel div:nth-child(2) span:nth-child(1){
    font-size: 1rem;
    font-weight: 600;
  }
  .minePanel div:nth-child(2) span:nth-child(2){
    color: #999;
  }
  .shelf {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAeCAYAAADU8sWcAAAABGdBT…a0nMC8+5GpfrUnfJBY4I65pYAlL184BNe9yIE1/mhobb/yD3CDOiQTd4yVAAAAAElFTkSuQmCC) no-repeat;
  }
  .historyCon{
    width: 18rem;
  }
  .his-list{
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
    margin-top: 1rem;
  }
  .his-img{
    padding: 1rem;
  }
  .his-img img{
    width: 4rem;
    height: 4rem;
  }
  .his-detail{
    display: flex;
    flex-direction: column;
  }
  .his-detail span{
    line-height: 1.2rem
  }
  .his-detail span:nth-child(1){
    margin-top: 1rem;
  }
  .his-detail label{
    color: #969ba3;
  }
  .his-title{
    padding: 1rem;
    padding-bottom: 0;
    font-size: 1rem;
  }
  .yd-btn-block{
    height: 2rem;
    font-size: .9rem;
  }
</style>
