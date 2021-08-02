<template>
  <div class="A">
    <input type="text" :value="value" @input="onInput">
    <p>value: {{value}}</p>
    <li v-for="item in todoList">
      {{item}}
    </li>
    <p>
      <button @click="addList">addList</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'A',
  props: ['message'],
  data() {
    return {
      count: 1,
      flag: false,
      value: 'hello',
      todoList: [1, 2, 3]
    }
  },
  mounted() {
  },
  methods: {
    addList() {
      const num = this.todoList.length + 1;
      this.todoList = [...this.todoList, num];
    },
    onInput(e) {
      console.log(e);
      this.value = e.target.value;
    },
    toggleFlag() {
      this.flag = !this.flag;
    },
    changeMessage() {
      this.trigger('changeMessage', this.count++ + ":" + this.message);
    },
    changeName() {
      this.count++;
    }
  }
}
</script>

<style>
.a {
  color: red;
}
.b {
  color: orange;
}
</style>