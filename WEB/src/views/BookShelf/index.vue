<template>
    <div>
        <yd-navbar height="2.4rem" fontsize="1rem">
            <span slot="left" @click="back" style="font-size:1rem;">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </span>
            <span slot="center" style="font-size:1rem;color:#000;">我的书架</span>
        </yd-navbar>
        <yd-grids-group :rows="3" title="" style="margin-top:0.6rem;">
            <yd-grids-item v-for="(item,index) in books" :key="index" @click.native="show = true;acttiveItem = item">
                <div class="itemfenlei" slot="text" style="font-size:0.8rem;">
                <img :src="item.IMGPATH"/>
                <span>{{item.BOOKNAME}}</span>
                </div>
            </yd-grids-item>
        </yd-grids-group>
        <yd-actionsheet :items="myItems" v-model="show" cancel="取消"></yd-actionsheet>
    </div>
</template>
<script>
export default {
  name: 'BookShelf',
  methods: {
    back () {
      this.$router.go(-1)
    },
    goRead (data) {
      console.log(data)
      this.$router.push({
        name: 'ReadBook',
        query: {
          path: data.PATH,
          name: data.BOOKNAME,
          img: data.IMGPATH,
          author: data.AUTHOR
        }
      })
    },
    removeBook (data) {
      this.$dialog.loading.open('正在移除')
      this.$api['system.delBookShelf']({
        userId: this.$storage.getItem('TOKEN_STR'),
        bookName: data.BOOKNAME
      }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: '移除成功！',
            timeout: 1500,
            icon: 'success'
          })
          this.loadAxios()
        } else {
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: 'error'
          })
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
    },
    loadAxios () {
      this.$dialog.loading.open('正在加载')
      this.$api['system.searchBookShelf']({
        userId: this.$storage.getItem('TOKEN_STR')
      }).then(res => {
        if (res.msg.indexOf('OK') >= 0) {
          this.$dialog.loading.close()
          this.books = res.data
        } else {
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: 'error'
          })
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
      books: [],
      acttiveItem: {},
      show: false,
      myItems: [
        {
          label: '去阅读此书',
          callback: () => {
            this.goRead(this.acttiveItem)
            /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
          }
        },
        {
          label: '从书架移除此书',
          callback: () => {
            this.removeBook(this.acttiveItem)
          }
        }
      ]
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
