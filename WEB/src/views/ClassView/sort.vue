<template>
  <div>
      <yd-navbar height="2.4rem" fontsize="1rem" :fixed="true">
        <span slot="left" @click="back" style="font-size:1rem;">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </span>
        <span slot="center" style="font-size:1rem;color:#000;">{{$route.query.title}}</span>
      </yd-navbar>
      <!-- <vue-scroll
            :refreshStart='refreshStart'
            :loadStart='loadStart'
            :noData='true'
            style="margin-top:2.4rem;"
          > -->
          <ul class="artcleSmallList" style="margin-top:2.8rem;">
              <li :key="index2" v-for="(item2,index2) in dataList">
                <span>{{item2['type']}}</span>
                <!-- <a href="#" @click="goRead(item2['url'])">{{item2['name']}}</a> -->
                <router-link :to="{path: '/detail', query: {url:item2['path'],name:item2['name']}}">
                  <a href="#">{{item2['name']}}</a>
                </router-link>
                /
                <span>{{item2['author']}}</span>
              </li>
              <li v-show="dataList.length > 0" @click="nextPage"  style="text-align:center;"> <span>点击加载下一页</span></li>
            </ul>
      <!-- </vue-scroll> -->
  </div>
</template>

<script>
// import VueScroll from '@common/VueScroll'
export default {
  name: 'Sort',
  components: {
    // VueScroll
  },
  methods: {
    back () { this.$router.go(-1) },
    nextPage () {
      this.loadAxios(this.nextPath)
    },
    loadAxios (path) {
      this.$dialog.loading.open('正在加载')
      this.$api['getBook.getClassList']({ path: path }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.dataList = this.dataList.concat(res.data.list)
          this.nextPath = res.data.next
          this.$dialog.loading.close()
        } else {
          this.$dialog.loading.close()
        }
      })
    }
  },
  watch: {
    $route (to, from) {
      if (from.path === '/classview' && this.$route.path === '/sort') {
        this.dataList = []
        this.nextPath = ''
        this.loadAxios(this.$route.query.url)
      }
    }
  },
  mounted () {
    this.loadAxios(this.$route.query.url)
  },
  activated () {
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
  },
  data () {
    return {
      dataList: [],
      nextPath: ''
    }
  }
}
</script>

<style scoped>
  .artcleSmallList{
    margin-top: 0.5rem;
  }
  .artcleSmallList li{
    padding: 0.6rem 1rem;
    background-color: #ffffff;
    margin-top: 0.4rem;
  }
  .artcleSmallList li span{
    margin-right: 0.6rem;
  }
  .artcleSmallList li a{
    margin-right: 0.2rem;
    color: #007BB1;
  }
</style>
