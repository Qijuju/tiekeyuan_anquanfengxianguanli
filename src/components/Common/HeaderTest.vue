<template>
  <div class="headerTest">
    <div class="title">
      <div class="back"><</div>
      <div class="title2">施工日计划</div>
      <div class="close">×</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "headerTest",
    components: {

    },
    methods: {
    }
  }
</script>

<style scoped>
  .headerTest{
    padding:46px 0;
    width:100%;
    height:152px;
    background: #0078e8;
    color: #fff;
    font-size:14px;
  }
  .title{
    position: relative;
    width:100%;
    height:60px;
    line-height:60px;
    text-align: center;
    background: #f42a33;
  }
  .title>.title2{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    heigth:60px;
    text-align: center;
    line-height:60px;
    background: #f421db;
    z-index:1;
  }
  .title> .back,
  .title> .close{
    position: absolute;
    top:0;
    width:50px;
    height:60px;
    text-align: center;
    line-height:60px;
    z-index: 2;
  }
  .title> .back{
    left:0px;
  }
  .title> .close{
    right:0px;
  }


</style>
