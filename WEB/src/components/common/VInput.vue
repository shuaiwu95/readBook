<template>
<div ref="input" class="v-input-container" :style="{width:width}">
    <div class="v-input-label"><span class="iconFont" :class="icon"></span>{{label}}</div>
    <div class="v-input-inp">
        <input
        v-on:blur="blurInput"
        v-model="inpVal"
        :placeholder="placeholder"
        :type="type" />
        <span v-show="tipMsg!==''" class="v-input-msg">{{tipMsg}}</span>
    </div>
</div>
</template>
<script>
// 输入框组件
export default {
  name: 'VInput',
  props: {
    width: {
      default: '100%'
    },
    label: {
      default: ''
    },
    type: {
      default: 'text'
    },
    icon: {
      default: ''
    },
    placeholder: {
      default: '请输入内容'
    },
    roles: {
      default: []
    }
  },
  methods: {
    // 输入框校验
    blurInput () {
      this.roles.filter((value, key, arr) => {
        for (const key in value) {
          switch (key) {
            case 'required':
              if (value[key]) {
                if (this.inpVal === '') {
                  this.setInputError(value.message)
                } else {
                  this.setOk()
                }
              } else {
                this.setOk()
              }
              break
          }
        }
      })
    },
    setOk () {
      this.$refs.input.style['border-bottom'] = '1px solid #E7E7E7'
      this.tipMsg = ''
    },
    setInputError (msg) {
      this.$refs.input.style['border-bottom'] = '1px solid red'
      this.tipMsg = msg
    }
  },
  mounted () {

  },
  watch: {
    inpVal (val) {
      this.$emit('on-model', val)
    }
  },
  data () {
    return {
      inpVal: '',
      tipMsg: ''
    }
  }
}
</script>
<style scoped>
.v-input-container {
    display: inline-flex;
    flex-direction: row;
    padding: 1rem 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #E7E7E7;
}
.v-input-label{
    font-size: 1rem;
    flex: 1;
    height: 1rem;
}
.v-input-label span {
    font-size: 1rem;
    margin-right: 0.5rem;
}
.v-input-inp {
  flex: 10;
  position: relative;
}
.v-input-container input {
    border: 0;
    height: 1rem;
    font-size: 1rem;
    outline:none;
    margin-left: 0.5rem;
}
.v-input-msg{
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  z-index: 50;
  color: red;
}
</style>
