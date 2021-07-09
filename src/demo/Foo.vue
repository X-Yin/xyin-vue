<template>
  <div class="foo">
    <input type="text" :value="value" @input="onInput"></input>
    <p class="what">{{value}}</p>
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
      this.value = e.target.value;
    }
  },
  data() {
    return {
      message: 'hello world!',
      value: 'hello world!'
    }
  }
}
</script>

<style>
.foo {
  color: orange;
}
</style>