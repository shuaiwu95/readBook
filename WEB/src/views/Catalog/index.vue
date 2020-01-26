<template>
    <div>
        <yd-navbar height="2.4rem" fontsize="1rem" :fixed="true">
            <span slot="left" @click="back" style="font-size:1rem;">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </span>
            <span slot="center" style="font-size:1rem;color:#000;">{{$route.query.name}}</span>
        </yd-navbar>
        <ul class="artcleSmallList" style="margin-top:2.8rem;">
          <li :key="index2" v-for="(item2,index2) in dataList">
            <router-link :to="{ name: 'ReadBook', query: {path:item2.path,name: $route.query.name, isCatalog: true}}">
                <a href="#">{{item2['name']}}</a>
             </router-link>
          </li>
          <li v-show="dataList.length > 0" @click="nextPage(dataObj.nextPage)"  style="text-align:center;"> <span>点击加载下一页</span></li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'Catalog',
  methods: {
    back () {
      this.$router.go(-1)
    },
    nextPage (path) {
      this.nowPath = path
      this.loadAxios()
    },
    goRead (data) {
      this.$router.push({
        name: 'ReadBook',
        query: {
          name: this.dataObj.title,
          path: data.path,
          isCatalog: true
        }
      })
    },
    loadAxios () {
      this.$dialog.loading.open('正在加载')
      this.$api['getBook.catalog']({ path: this.nowPath }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.dataObj = res.data
          this.dataList = this.dataList.concat(res.data.zjList)
          this.$dialog.loading.close()
        } else {
          this.$dialog.loading.close()
        }
      }).catch(error => {
        console.log(error)
        this.$dialog.loading.close()
        this.$dialog.toast({
          mes: '网络异常',
          timeout: 1500,
          icon: 'error'
        })
      })
    }
  },
  mounted () {
    this.$store.state.botNav.showTopNav = false
    this.$store.state.botNav.showBottomNav = false
    this.loadAxios()
  },
  data () {
    return {
      nowPath: `/${this.$route.query.url.split('/')[1]}_1/`,
      dataObj: {},
      dataList: []
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
