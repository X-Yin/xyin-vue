<template>
  <div class="A">
    <input type="text" :value="value" @input="onInput">
    <p>value: {{value}}</p>
    <li v-for="item in todoList">
      {{item}}
    </li>
    <p>{{obj.name}}</p>
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
      todoList: [1, 2, 3, 4],
      obj: {
        name: 'jack'
      }
    }
  },
  mounted() {
  },
  methods: {
    addList() {
      console.log(1234);
      const num = this.todoList.length + 1;
      this.todoList.push(num);
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