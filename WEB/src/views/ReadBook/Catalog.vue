<template>
     <yd-popup v-model="show" position="left" width="60%">
       <span style="position:absolute;left:5rem;top:10rem;" v-show="showLoad">正在加载...</span>
       <ul class="artcleSmallList">
        <li v-show="dataList.length > 0"  style="text-align:right;"> <span @click="reLoad(0)">正序</span><span @click="reLoad(1)">倒序</span></li>
          <li :key="index2" v-for="(item2,index2) in dataList">
            <!-- <router-link :to="{ name: 'ReadBook', query: {path:item2.path,name: $route.query.name, isCatalog: true}}">
                <a href="#">{{item2['name']}}</a>
             </router-link> -->
              <a href="#" @click="onClickRead(item2)">{{item2['name']}}</a>
          </li>
          <li v-show="dataList.length > 0" @click="nextPage(dataObj.nextPage)"  style="text-align:center;"> <span>点击加载下一页</span></li>
        </ul>
    </yd-popup>
</template>
<script>
export default {
  name: 'CatalogView',
  props: {
    show: Boolean,
    path: String
  },
  watch: {
    show (val) {
      this.$emit('onHandle', val)
    }
  },
  methods: {
    nextPage (path) {
      this.nowPath = path
      this.loadAxios()
    },
    reLoad (num) {
      this.dataList = []
      this.showLoad = true
      if (num === 0) {
        this.nowPath = this.dataObj.zxPath
      } else {
        this.nowPath = this.dataObj.dxPath
      }
      this.loadAxios()
    },
    onClickRead (data) {
      this.$emit('on-clickRead', data)
    },
    loadAxios () {
      this.$api['getBook.catalog']({ path: this.nowPath }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.dataObj = res.data
          this.dataList = this.dataList.concat(res.data.zjList)
          this.showLoad = false
        } else {
          this.$dialog.toast({
            mes: '加载出错',
            timeout: 1500,
            icon: 'error'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$dialog.toast({
          mes: '网络异常',
          timeout: 1500,
          icon: 'error'
        })
      })
    }
  },
  mounted () {
    this.loadAxios()
  },
  data () {
    return {
      nowPath: `/${this.path.split('/')[1]}_1/`,
      dataObj: {},
      dataList: [],
      showLoad: true
    }
  }
}
</script>
<style scoped>
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
