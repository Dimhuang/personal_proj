<template>
  <div class="m-main">
      <slot></slot>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    components: {

    },
    methods:{

    }
  }
</script>
<style>
  .m-main{
    position: absolute;
    top: 54px;
    bottom: 0;
    left:0;
    right: 0;
    background-color: #f4f4f4;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
