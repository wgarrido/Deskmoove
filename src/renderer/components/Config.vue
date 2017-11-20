<template>
  <div id="config-wrapper">
    <div id="container-btn">
      <button class="btn">OK</button>
      <button class="btn">CANCEL</button>
      <button class="btn" id="btn-quit">QUIT</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {}
  }
</script>

<style>
  body{
    background-color: #313131;
  }
  .btn{
    width: 120px;
    height: 38px;
    border: 1px solid #FFFFFF;
    font-size: 15px;
    color: #FFFFFF;
    background-color: transparent;
    cursor: pointer
  }

  #config-wrapper{
    position: relative;
    min-height: 180px;
  }

  #container-btn{
    position: absolute;
    bottom: 5px;
    left: 5px;
  }

  #btn-quit{
    border: 1px solid #F67648;
  }


</style>