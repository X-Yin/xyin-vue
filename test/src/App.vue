<template>
  <div class="app">
    <componenta :message="mes1" @changeMessage="changeMessage1"/>
  </div>x
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
      mes1: 'hello',
      mes2: 'world'
    }
  },
  methods: {
    changeMessage1(msg) {
      console.log('message1', msg);
      this.mes1 = msg;
      console.log('this.mes1', this.mes1);
    },
    changeMessage2(msg) {
      console.log('message2', msg);
      this.mes2 = msg;
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
