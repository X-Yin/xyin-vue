<template>
  <div class="A">
    <div v-for="(item, index) in todoList">
      <div>{{item}}-{{index}}</div>
    </div>
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
      todoList: [1, 2, 3]
    }
  },
  mounted() {
  },
  methods: {
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