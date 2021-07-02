let vue = `<template>
  <div class="foo">
    <p>hello foo!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>
.foo {
  color: orange;
}
</style>`;

const template = /<template>([\s\S]+)<\/template>/;
const style = /<style>([\s\S]+)<\/style>/;
const script = /<script>([\s\S]+)<\/script>/;

vue = vue.replace(/[\n|\s]/g, '');

console.log(vue.match(template));