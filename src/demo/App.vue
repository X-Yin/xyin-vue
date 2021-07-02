<template>
  <div class="app">
    <p>hello world!</p>
    <p>{{jack}}</p>
  </div>
</template>

<script>
import Foo from './foo.vue';
export default {
  data() {
    return {
      name: 'jack'
    }
  },
  components: {
    Foo
  }
}
</script>

<style>
.app {
  color: red;
}
</style>