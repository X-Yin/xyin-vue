<template>
  <div class="container">
    <div class="item-wrapper" v-for="(item, index) in todoList">
      <div class="done-btn" @click="complete" data-index="{{index}}"></div>
      <div class="item-content">{{item}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: ['todoList'],
    data() {
      return {
      }
    },
    methods: {
      complete(e) {
        const index = e.target.dataset.index;
        e.target.classList.add('complete');
        e.target.parentNode.classList.add('delete-item');
        setTimeout(() => {
          e.target.classList.remove('complete');
          e.target.parentNode.classList.remove('delete-item');
          this.trigger('complete', index);
        }, 500);
      }
    }
  }
</script>

<style>
.container {
  transition: all 0.2s;
}
.item-wrapper {
  padding: 15px;
  width: 600px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.item-wrapper:hover {
  background-color: rgba(118,219,174, 0.2);
}
.done-btn {
  box-sizing: border-box;
  flex: 0 19px;
  width: 19px;
  height: 19px;
  border: 2px solid #ccc;
  cursor: pointer;
  transition: all 0.2s;
}
.item-content {
  flex: 1;
  height: 30px;
  line-height: 30px;
  margin-left: 30px;
  font-weight: 600;
  color: #222;
}

.complete {
  box-sizing: border-box;
  background-color: #41b883;
  border-color: #41b883;
  border-width: 4px;
  background-image: url("data:image/png;base64,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");
  background-size: contain;
  width: 19px;
  height: 19px;
  background-repeat: no-repeat;
  overflow: hidden;
}

.delete-item .item-content {
  text-decoration: line-through;
}


</style>