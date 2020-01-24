<template>
  <div>
    <yd-navbar height="2.4rem" fontsize="1rem">
        <span slot="left" @click="back" style="font-size:1rem;">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </span>
        <span slot="center" style="font-size:1rem;color:#000;">{{$route.query.name}}</span>
    </yd-navbar>
    <div style="padding: 1rem;background: #ffffff;">
       <yd-cell-group>
        <yd-cell-item>
            <span slot="left">用户名：</span>
            <yd-input slot="right" required v-model="user" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">密码：</span>
            <yd-input slot="right" type="password" v-model="psw" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">确认密码：</span>
            <yd-input slot="right" type="password" v-model="pswa" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">昵称：</span>
            <yd-input slot="right" required v-model="nickName" max="20" placeholder="请输入你想用的称谓"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow type="label">
            <span slot="left">性别：</span>
            <select slot="right" v-model="sex">
                <option value="">请选择性别</option>
                <option value="1">男</option>
                <option value="2">女</option>
                <option value="3">未知</option>
            </select>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">邮箱：</span>
            <yd-input ref="email" slot="right" v-model="email" :debug="true" regex="email" placeholder="请输入邮箱地址"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    </div>
     <yd-button size="large" type="primary" @click.native="toSubmit">提交</yd-button>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  methods: {
    back () { this.$router.go(-1) },
    toSubmit () {
      if (this.user && this.psw && this.email && this.nickName) {
        const email = this.$refs.email
        const errorCode = `${email.errorCode}`
        if (errorCode === 'NOT_REGEX_RULE') {
          this.$dialog.toast({
            mes: '请填入正确邮箱',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (this.psw !== this.pswa) {
          this.$dialog.toast({
            mes: '两次密码不一致，请确认密码',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        if (this.user.length < 8 || this.psw < 6) {
          this.$dialog.toast({
            mes: '账号必须不少于8位，密码不少于6位字符',
            timeout: 1500,
            icon: 'error'
          })
          return false
        }
        this.$api['system.reg'](
          {
            user: this.user,
            psw: this.psw,
            pswa: this.pswa,
            email: this.email,
            sex: this.sex,
            nickName: this.nickName
          }
        ).then(res => {
          if (res && res.msg.indexOf('OK') >= 0) {
            this.$dialog.toast({
              mes: '注册成功！请返回登录！',
              timeout: 1500,
              icon: 'success'
            })
          } else {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: 'error'
            })
          }
        }).catch(res => {
          this.$dialog.toast({
            mes: '服务器异常，请稍后再试',
            timeout: 1500,
            icon: 'error'
          })
        })
      } else {
        this.$dialog.toast({
          mes: '请填写必填项',
          timeout: 1500,
          icon: 'error'
        })
      }
    }
  },
  data () {
    return {
      user: '',
      psw: '',
      pswa: '',
      email: '',
      sex: '',
      nickName: ''
    }
  }
}
</script>

<style scoped>
  .yd-btn-block{
    height: 2rem;
    font-size: .9rem!important;
  }
</style>
