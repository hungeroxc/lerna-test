<template>
  <div @click="onClick" id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// 测试

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    onClick() {
      console.log(123)
    }
  }
}
</script>

<style>
</style>
