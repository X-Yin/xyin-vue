<template>
  <div class="foo">
    <p>hello foo!</p>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Foo',
  created() {
    console.log('>>>>>> foo create', this.message);
    setTimeout(() => {
      this.message = 'hello base';
    }, 2000);
  },
  mounted() {
  },
  data() {
    return {
      message: 'hello world!'
    }
  }
}
</script>

<style>
.foo {
  color: orange;
}
</style>