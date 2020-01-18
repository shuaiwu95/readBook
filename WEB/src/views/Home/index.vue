<template>
    <div>
        <con-view>
          <yd-search :result="result" fullpage v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler"></yd-search>
          <yd-rollnotice autoplay="2000">
            <yd-rollnotice-item><span style="color:#F00;"> 公告 </span>本站只用于学习交流，没有任何盈利手段</yd-rollnotice-item>
        </yd-rollnotice>
        <yd-slider autoplay="3000" style="height:7rem;">
          <yd-slider-item :key="index" v-for="(item,index) in bannerUrl">
              <a href="#">
                  <img :src="item">
              </a>
          </yd-slider-item>
        </yd-slider>
        <yd-tab font-size="0.8rem" height="2rem" style="margin-top:0.8rem;">
          <yd-tab-panel :key="index" v-for="(item,index) in tabData" :label="item['articleTitle']">
            <ul class="artcleSmallList">
              <li :key="index2" v-for="(item2,index2) in item['listArr']">
                <span>{{item2['type']}}</span>
                <!-- <a href="#" @click="goRead(item2['url'])">{{item2['name']}}</a> -->
                <router-link :to="{path: '/detail', query: {url:item2['url'],name:item2['name']}}">
                  <a href="#">{{item2['name']}}</a>
                </router-link>
                /
                <span>{{item2['authorName']}}</span>
              </li>
            </ul>
          </yd-tab-panel>
        </yd-tab>
        </con-view>
    </div>
</template>
<script>
import ConView from '@common/ConView'
export default {
  name: 'Home',
  components: {
    ConView
  },
  methods: {
    goRead (url) {
      this.$router.push({ name: 'Detail' })
    },
    getResult (val) {
      if (!val) return []
      return [
        'Apple', 'Banana', 'Orange', 'Durian', 'Lemon', 'Peach', 'Cherry', 'Berry',
        'Core', 'Fig', 'Haw', 'Melon', 'Plum', 'Pear', 'Peanut', 'Other'
      ].filter(value => new RegExp(val, 'i').test(value))
    },
    itemClickHandler (item) {
      this.$dialog.toast({ mes: `搜索：${item}` })
    },
    submitHandler (value) {
      this.$dialog.toast({ mes: `搜索：${value}` })
    }
  },
  mounted () {
    this.$api['getBook.getSmallRank']().then(res => {
      if (res.msg.indexOf('OK') >= 0) {
        this.tabData = res.data
      }
    })
  },
  destroyed () {

  },
  activated () {
    this.$store.state.botNav.activeHome = true
    this.$store.state.botNav.showTopNav = true
    this.$store.state.botNav.showBottomNav = true
  },
  deactivated: function () {
    this.$store.state.botNav.activeHome = false
  },
  data () {
    return {
      value2: '',
      result: [],
      tabData: [],
      bannerUrl: [
        '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/b3565877b754e06f2330e7c9102738b8.jpg',
        '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/6deaee8847a4c7852f754fe6fc1856bb.jpg',
        '//bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/5bd6f7285054e68a544a8f4a7adac00b.jpg'
      ]
    }
  }
}
</script>
<style scoped>
  .rl-child{
    padding: 20px 0;
  }
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
