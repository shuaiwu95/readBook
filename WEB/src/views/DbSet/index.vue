<template>
  <div style="padding:2rem;">
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">数据库名称：</span>
            <yd-input slot="right" required v-model="database" max="20" placeholder="请输入数据库名称"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">数据库账号：</span>
            <yd-input slot="right" required v-model="user" max="20" placeholder="请输入数据库账号"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">数据库密码：</span>
            <yd-input slot="right" required v-model="password" max="20" placeholder="请输入数据库密码"></yd-input>
        </yd-cell-item>
         <yd-cell-item>
            <span slot="left">数据库IP：</span>
            <yd-input slot="right" required v-model="ip" max="20" placeholder="请输入数据库IP"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">数据库端口：</span>
            <yd-input slot="right" required v-model="port" max="20" placeholder="请输入数据库端口"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <yd-checkbox v-model="unitBase">同时初始化数据库表</yd-checkbox>
    <yd-button-group>
        <yd-button style="height:2rem;" size="large" @click.native="createDb">初始化数据库</yd-button>
    </yd-button-group>
  </div>
</template>

<script>
export default {
  name: 'Dbset',
  methods: {
    createDb () {
      this.$api['system.createDb']({
        database: this.database,
        user: this.user,
        password: this.password,
        ip: this.ip,
        port: this.port,
        unitBase: this.unitBase
      }).then(res => {
        if (res && res.msg.indexOf('OK') >= 0) {
          alert(res.msg)
        } else {
          alert('数据库初始化失败')
        }
      })
    }
  },
  data () {
    return {
      database: '',
      user: '',
      password: '',
      ip: '',
      port: '',
      unitBase: true
    }
  }
}
</script>

<style>

</style>
