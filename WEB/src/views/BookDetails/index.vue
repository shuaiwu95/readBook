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
      <div class="detail-card">
        <div class="detail-item-1">
          <img :src="detail['imgUrl']"/>
        </div>
        <div class="detail-item-2">
          <span>{{detail['title']}}</span>
          <span><label>作者：</label>{{detail['author']}}</span>
          <span><label>分类：</label>{{detail['type']}}</span>
          <span><label>{{detail['status']}}</label></span>
          <span><label>{{detail['update']}}</label></span>
          <span><label>最新：</label>{{detail['newData']}}</span>
        </div>
      </div>
      <div class="detail-btn">
        <yd-button type="primary" @click.native="goRead">开始阅读</yd-button>
        <yd-button type="danger">加入书架</yd-button>
        <yd-button type="warning">查看目录</yd-button>
      </div>
      <div class="detail-jianjie">
        {{detail['info']}}
      </div>
      <div class="detail-jianjie">
        <span style="font-size: 1rem;">最新章节</span>
        <yd-cell-group>
          <yd-cell-item arrow v-for="(item,index) in detail['newChapters']" :key="index">
              <router-link  slot="left" :to="{ name: 'ReadBook', query: {path:item.url,name: detail.title}}">
                {{item.name}}
              </router-link>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </div>
</template>
<script>
export default {
  name: 'Detail',
  methods: {
    back () { this.$router.go(-1) },
    goRead () {
      this.$router.push({
        name: 'ReadBook',
        query: {
          path: this.detail.firstHtml,
          name: this.detail.title,
          url: this.$route.query.url,
          img: this.detail.imgUrl,
          author: this.detail.author
        }
      })
    },
    loadAxios () {
      this.$dialog.loading.open('正在加载')
      this.$store.state.botNav.showTopNav = false
      this.$store.state.botNav.showBottomNav = false
      this.$api['getBook.details']({ id: this.$route.query.url }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.detail = res.data
          this.$dialog.loading.close()
        } else {
          this.$dialog.loading.close()
        }
      }).catch(error => {
        console.log(error)
        this.$dialog.loading.close()
        this.$dialog.loading.close()
        this.$dialog.toast({
          mes: '网络异常',
          timeout: 1500,
          icon: 'error'
        })
      })
    }
  },
  watch: {
    $route (to, from) {
      if ((from.path === '/' || from.path === '/mine' || from.path === '/sort') && (this.$route.path === '/detail')) {
        this.detail = {}
        this.loadAxios()
      }
    }
  },
  mounted () {
    this.loadAxios()
  },
  activated () {
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
  },
  data () {
    return {
      detail: {}
    }
  }
}
</script>
<style scoped>
  .detail-card{
    display: flex;
    flex-direction: row;
    background-color: #ffffff;
  }
  .detail-item-1{
    padding: 1rem;
    flex: 1;
  }
  .detail-item-1 img{
    width: 100%;
  }
  .detail-item-2{
    padding: 1rem 0;
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .detail-item-2 span{
    font-size: .9rem;
    margin-bottom: 0.2rem;
    color: #000000;
  }
  .detail-item-2 span label{
    color: #999999;
   }
  .detail-item-2 span:nth-child(1){
    font-size: 1rem;
    color: #000000;
  }
  .detail-btn{
    padding: 1rem;
    background: #ffffff;
  }
  .yd-btn {
    text-align: center;
    position: relative;
    border: none;
    pointer-events: auto;
    -webkit-user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    user-select: none;
    height: 1.6rem!important;
    font-size: .8rem!important;
    display: inline-block;
    padding: 0 .6rem!important;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    border-radius: 2px;
    white-space: nowrap;
    margin-right: .6rem;
  }
  .detail-jianjie{
    padding: 1rem;
    background: #ffffff;
  }
</style>
<style>
.yd-cell-left {
    color: #555;
    font-size: .8rem;
    white-space: nowrap;
    -ms-flex-align: center;
  }
  .yd-cell-arrow:after {
    margin-left: .05rem;
    margin-right: -.08rem;
    display: block;
    font-family: YDUI-INLAY;
    font-size: 1rem;
    color: #c9c9c9;
    content: "\E608";
  }
  .yd-cell-item {
    padding: .6rem 0;
  }
</style>
