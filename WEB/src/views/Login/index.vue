<template>
    <div class="login-container">
      <div class="login-con-item"></div>
      <div class="login-con-item">
        <div class="login-con-item-group">
          <v-input
            :roles="[{required:true,message:'账号不得为空！'}]"
            @on-model="getUsN"
            placeholder="请输入账号"
            icon="icon-userInput"/>
        </div>
        <div class="login-con-item-group">
          <v-input
          :roles="[{required:true,message:'密码不得为空！'}]"
          @on-model="getPsw"
          placeholder="请输入密码"
          icon="icon-pswInput"
          type="password"/>
        </div>
        <div class="login-con-item-group">
          <v-button
          :isDisabled="btnDisabled"
          label="立即登录"
          @on-click="login"/>
        </div>
        <div class="zhucezh">
          <span>忘记密码？</span>
          <span @click="toReg">注册账号</span>
          <span @click="youke">游客模式进入</span>
        </div>
      </div>
    </div>
</template>
<script>
// 输入框组件
import VInput from '@common/VInput'
import VButton from '@common/VButton'
export default {
  name: 'Login',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    VInput,
    VButton
  },
  methods: {
    youke () {
      this.$router.push({ name: 'Home' })
    },
    login () {
      this.$dialog.loading.open('正在验证登录信息')
      this.$api['system.login']({
        userName: this.userName,
        psw: this.psw
      }).then(res => {
        if (res && res.msg.indexOf('OK') >= 0) {
          this.$dialog.loading.close()
          this.$dialog.toast({
            mes: '登录成功！',
            timeout: 1500,
            icon: 'success',
            callback: () => {
              // 存储TOKEN
              this.$setToken(res.data[0].USERNAME)
              this.$storage.setItem('nickName', res.data[0].NICKNAME)
              this.$router.push({ name: 'Home' })
            }
          })
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: 'error'
          })
          this.$dialog.loading.close()
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        this.$dialog.toast({
          mes: '服务器异常，请稍后再试',
          timeout: 1500,
          icon: 'error'
        })
        this.$dialog.loading.close()
      })
      // 登录跳转
      // this.$router.push({ name: 'Home' })
    },
    toReg () { // 去注册界面
      this.$router.push({ name: 'Reg', query: { name: '注册账号' } })
    },
    getUsN (val) {
      this.userName = val
      this.btnDisabled = !!(this.userName === '' || this.psw === '')
    },
    getPsw (val) {
      this.psw = val
      this.btnDisabled = !!(this.userName === '' || this.psw === '')
    }
  },
  data () {
    return {
      userName: '',
      psw: '',
      btnDisabled: true
    }
  }
}
</script>
<style scoped>
  .login-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .login-con-item{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
  }
  .login-con-item:nth-child(1){
    flex: 1;
  }
  .login-con-item:nth-child(2){
    flex: 2;
  }
  .login-con-item-group{
    width: 70%;
  }
  .login-con-item-group:nth-child(3){
    margin-top: 3rem;
  }
  .zhucezh{
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    padding: 1rem 15%;
  }
  .zhucezh span{
    margin-left: 1rem;
    color: blue;
  }
</style>
