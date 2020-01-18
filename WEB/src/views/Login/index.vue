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
    login () {
      // 存储TOKEN
      this.$setToken('TOKEN-855225-1515-9664')
      // 登录跳转
      this.$router.push({ name: 'Home' })
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
</style>
