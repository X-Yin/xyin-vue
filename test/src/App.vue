<template>
  <div class="app">
    <h1>App</h1>
    <componenta/>
  </div>
</template>

<script>
import componenta from './A.vue';
export default {
  name: 'App',
  created() {
  },
  mounted() {
  },
  data() {
    return {
    }
  },
  components: {
    componenta
  }
}
</script>

<style>
.app {
  width: 600px;
  margin: 0 auto;
}


</style>
