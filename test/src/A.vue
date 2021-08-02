<template>
  <div class="A">
    <input
        type="text"
        :value="value"
        @input="onInput"
        @keydown="onKeyDown"
        placeholder="please input content...">
    <li v-for="item in todoList">
      {{item}}
    </li>
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
      value: '',
      todoList: [
          'todo1',
          'todo2'
      ],
      obj: {
        name: 'jack'
      }
    }
  },
  mounted() {
  },
  methods: {
    addList() {
      const num = this.todoList.length + 1;
      this.todoList.push(num);
    },
    onKeyDown(e) {
      if (e.keyCode === 13) {
        this.todoList.push(this.value);
        this.value = '';
      }
    },
    onInput(e) {
      this.value = e.target.value;
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