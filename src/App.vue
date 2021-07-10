<template>
  <div class="app">
    <vInput @input="addItem"></vInput>
    <list :todoList="todoList" @complete="onComplete"></list>
  </div>
</template>

<script>
import vInput from './components/input.vue';
import List from './components/list.vue';
export default {
  name: 'App',
  created() {
  },
  mounted() {
  },
  data() {
    return {
      todoList: [
          '看美女',
          '看好看的美女',
          '看漂亮的美女',
          '看绝世美女'
      ]
    }
  },
  methods: {
    addItem(value) {
      this.todoList.unshift(value);
    },
    onComplete(index) {
      this.todoList.splice(parseInt(index), 1);
    }
  },
  components: {
    vInput,
    List
  }
}
</script>

<style>
.app {
  width: 600px;
  margin: 0 auto;
}
</style>