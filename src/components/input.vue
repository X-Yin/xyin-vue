<template>
  <div class="input-wrapper">
    <input class="input" type="text" :value="value" :placeholder="placeholder" @input="onInput"></input>
    <div class="confirm-btn" @click="confirm">confirm</div>
  </div>
</template>


<script>
  export default {
    name: 'input',
    data() {
      return {
        value: '',
        placeholder: 'please input todo content...'
      }
    },
    methods: {
      onInput(e) {
        this.value = e.target.value;
      },
      confirm() {
        this.trigger('input', this.value);
        this.value = '';
      }
    }
  }
</script>

<style>
  .input-wrapper {
    width: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .input {
    flex: 0 400px;
    width: 400px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #ccc;
    text-indent: 2rem;
    margin: 20px auto;
    font-size: 16px;
    color: #222;
    outline: none;
  }

  .confirm-btn {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: white;
    background: orange;
    text-align: center;
    margin-left: 20px;
    border: 1px solid orange;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }

</style>