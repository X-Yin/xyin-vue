<template>
  <div class="app">
    <p>hello world!</p>
    <Foo :age="age" @customClick="customClickHandler"></Foo>
    <p>{{age}}</p>
    <button @click="clickHandler" name="base">click</button>
    <Bar></Bar>
  </div>
</template>

<script>
import Foo from './foo.vue';
import Bar from './bar.vue';
export default {
  name: 'App',
  created() {
  },
  mounted() {
  },
  data() {
    return {
      age: 30
    }
  },
  methods: {
    clickHandler(e) {
      this.age = 44;
    },
    customClickHandler(name, age) {
      this.age = 88;
      console.log('>>>>>>>>> customClickHandler', name, age);
    }
  },
  components: {
    Foo,
    Bar
  }
}
</script>

<style>
.app {
  color: red;
}
</style>