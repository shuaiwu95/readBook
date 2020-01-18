<template>
    <div class="v-button-container" :style="{width:width}">
        <button @click="clickBtn" :class="isDisabled? 'disColor': ''" :style="{backgroundColor:btnType[type]}">{{label}}</button>
    </div>
</template>
<script>
// 按钮组件
export default {
  name: 'VButton',
  props: {
    label: {
      default: '按钮'
    },
    width: {
      default: '100%'
    },
    type: {
      default: 'blue'
    },
    isDisabled: {
      default: ''
    }
  },
  methods: {
    clickBtn () {
      if (this.isDisabled) {
        return
      }
      this.$emit('on-click')
    }
  },
  data () {
    return {
      btnType: {
        blue: '#4284F3'
      }
    }
  }
}
</script>
<style scoped>
.v-button-container button {
    width: 100%;
    height: 2.2rem;
    border: 0;
    border-radius: 0.5rem;
    color: #ffffff;
}
button:focus {outline:none;}
.disColor{
  background-color: #b9d1e0!important;
}
</style>
