<template>
  <div class="app">
    <p>hello world!</p>
    <p>{{jack}}</p>
    <foo></foo>
  </div>
</template>

<script>
import foo from './foo.vue';
export default {
  data() {
    return {
      name: 'jack'
    }
  },
  components: {
    foo
  }
}
</script>

<style>
.app {
  color: red;
}
</style>