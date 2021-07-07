<template>
  <div class="app">
    <p>hello world!</p>
    <Foo :age="age"></Foo>
    <p>{{age}}</p>
    <button @click="">click</button>
  </div>
</template>

<script>
import Foo from './foo.vue';
export default {
  name: 'App',
  created() {
    console.log('App created');
    setTimeout(() => {
      this.age = 50;
    }, 4000);
  },
  mounted() {
    console.log('App mounted');
  },
  data() {
    return {
      age: 30
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