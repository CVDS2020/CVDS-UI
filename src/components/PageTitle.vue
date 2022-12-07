<template>
<div class="container">
  <span class="txt">{{title}}</span>

</div>
</template>

<script>
export default {
  name: "PageTitle",
  props:{
    title:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped>
.container{
  height: 50px;

}
.txt{
  font-size: 20px;
}

</style>