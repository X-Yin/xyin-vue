<template>
  <div class="input-wrapper">
    <input
          class="input"
          type="text"
          :value="value"
          :placeholder="placeholder"
          @input="onInput"
          @keydown="onKeyDown"
          @focus="onFocus"
          @blur="onBlur"/>
    <div class="border" :style="borderStyle"></div>
  </div>
</template>


<script>
  export default {
    name: 'input',
    data() {
      return {
        value: '',
        placeholder: 'please input todo content...',
        borderStyle: ''
      }
    },
    methods: {
      onInput(e) {
        this.value = e.target.value;
      },
      onFocus(e) {
        this.borderStyle = `opacity: 1; right: 0; left: 0;`;
      },
      onBlur(e) {
        this.borderStyle = `opacity: 0; right: 250px; left: 250px;`;
      },
      onKeyDown(e) {
        if (e.keyCode === 13) {
          this.trigger('input', this.value);
          this.value = '';
        }
      }
    }
  }
</script>

<style>
  .input-wrapper {
    background: #f7fcfa;
    padding: 0 15px;
    transition: background 0.3s;
    display: flex;
    align-items: center;
    position: relative;
  }
  .input {
    flex: 1;
    height: 40px;
    background: 0 0;
    border: none;
    color: #2c3e50;
    display: block;
    font-family: inherit;
    font-size: 16px;
    line-height: 16px;
    outline: 0;
    padding: 0;
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .border {
    position: absolute;
    bottom: 0;
    left: 250px;
    right: 250px;
    height: 2px;
    background: #76dbae;
    opacity: 0;
    transition: all 0.2s;
  }


</style>