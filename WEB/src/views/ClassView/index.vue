<template>
    <div>
      <yd-grids-group :rows="3" title="" style="margin-top:0.6rem;">
        <yd-grids-item :key="n" v-for="n in listData" @click.native="goList(n)">
            <div class="itemfenlei" slot="text" style="font-size:0.8rem;">
              <img :src="listIcon[n.name]"/>
              <span>{{n.name}}</span>
            </div>
        </yd-grids-item>
      </yd-grids-group>
    </div>
</template>
<script>
export default {
  name: 'ClassView',
  methods: {
    goList (n) {
      this.$router.push({ name: 'Sort', query: { title: n.name, url: n.url } })
    }
  },
  mounted () {
    // 请求小说分类
    this.$dialog.loading.open('正在加载')
    this.$api['getBook.classification']().then(res => {
      if (res.msg.indexOf('OK') >= 0) {
        this.listData = res.data
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
  },
  destroyed () {

  },
  activated () {
    this.$store.state.botNav.activeClass = true
    this.$store.state.botNav.showTopNav = true
    this.$store.state.botNav.showBottomNav = true
  },
  deactivated: function () {
    this.$store.state.botNav.activeClass = false
  },
  data () {
    return {
      listData: [],
      listIcon: {
        玄幻魔法: 'https://images.xxsy.net/bimg/1340869.jpg',
        修真武侠: 'https://images.xxsy.net/bimg/970761.jpg',
        言情都市: 'https://images.xxsy.net/bimg/1345696.jpg',
        历史穿越: 'https://images.xxsy.net/bimg/977272.jpg',
        网游竞技: 'https://images.xxsy.net/bimg/1349800.jpg',
        异灵推理: 'https://images.xxsy.net/bimg/1107059.jpg'
      }
    }
  }
}
</script>
<style scoped>
  .itemfenlei img{
    width: 50%;
    height: 60%;
  }
  .itemfenlei {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
  }
</style>
