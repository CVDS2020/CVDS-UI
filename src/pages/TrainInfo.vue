<template>
  <a-layout style="background-color: white;">
    <span style="margin-bottom: 10px ">车辆信息</span>
    <a-card>
      <div class="container1">
        <div class="container2">
          <span class="span height line-height">车次</span>
          <span class="span height line-height">车型</span>
          <span class="span height line-height">车厢数</span>
          <span class="span height line-height">经度</span>
          <span class="span height line-height">纬度</span>
        </div>
        <div class="container2" >
          <a-input class="height space" disabled="true" value="G111" style="width: 200px;"></a-input>
          <a-input class="height space" disabled="true" value="CRH380BL" style="width: 200px;"></a-input>
          <a-input class="height space" disabled="true" value="8" style="width: 200px;"></a-input>
          <a-input class="height space" disabled="true" value="116.345345345" style="width: 200px;"></a-input>
          <a-input class="height space" disabled="true" value="37.345345345" style="width: 200px;"></a-input>
        </div>
        <div class="container2 direction">
          <span class="height line-height">（北纬）</span>
          <span class="height line-height">（东经）</span>
        </div>
      </div>
    </a-card>
  </a-layout>
</template>

<script>
export default {
  name: "TrainInfo"
}
</script>

<style scoped>
.container1 {
  display: flex;
  padding-left: 60px;
}

.container2 {
  display: flex;
  flex-direction: column;
}

.span {
  display: flex;
  margin: 0 15px 0 60px
}
.height{
  height: 40px;
  margin:3px 0 3px 0;
}
.line-height{
  line-height: 40px;
}
.direction{
  flex-direction: column-reverse;
}
.space{
  margin-left: 10px;
}

</style>