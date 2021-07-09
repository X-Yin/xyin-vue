<template>
  <div class="foo">
    <input type="text" :value="value" @input="onInput"></input>
    <p class="what">{{value}}</p>
    <ul>
      <li>{{array[0]}}</li>
      <li>{{array[1]}}</li>
      <li>{{array[2]}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Foo',
  props: ['age'],
  created() {
  },
  mounted() {
  },
  methods: {
    clickHandler() {
      console.log(this.eventBus.store);
      this.trigger('customClick', 'jack', '100');
    },
    onInput(e) {
      console.log(this.value, e.target.value);
      this.value = e.target.value;
    }
  },
  data() {
    return {
      message: 'hello world!',
      value: 'hello world!',
      array: [1, 2, 3]
    }
  }
}
</script>

<style>
.foo {
  color: orange;
}
</style>