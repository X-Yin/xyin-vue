<template>
  <div class="container">
    <div class="item-wrapper" v-for="(item, index) in todoList">
      <div class="done-btn" @click="complete" data-index="{{index}}">done</div>
      <div class="item-content">{{index + 1}}. {{item}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: ['todoList'],
    methods: {
      complete(e) {
        const index = e.target.dataset.index;
        this.trigger('complete', index);
      }
    }
  }
</script>

<style>
.item-wrapper {
  margin-top: 30px;
  width: 600px;
  display: flex;
  align-items: center;
}
.done-btn {
  flex: 0 60px;
  width: 60px;
  height: 30px;
  line-height: 30px;
  border: 1px solid orange;
  border-radius: 5px;
  text-align: center;
  color: orange;
  cursor: pointer;
}
.item-content {
  flex: 1;
  height: 30px;
  line-height: 30px;
  margin-left: 30px;
  font-weight: 600;
  color: #222;
}

</style>