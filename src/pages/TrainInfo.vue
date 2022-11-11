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
        <div class="container2">
          <a-input class="height space input" disabled="true" v-model="trainNo"></a-input>
          <a-input class="height space input" disabled="true" v-model="model"></a-input>
          <a-input class="height space input" disabled="true" v-model="trainNo"></a-input>
          <a-input class="height space input" disabled="true" v-model="longitude"></a-input>
          <a-input class="height space input" disabled="true" v-model="latitude"></a-input>
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
import {request} from "@/network/request";
export default {
  name: "TrainInfo",
  data() {
    return {
      trainNo: '001',
      model: '复兴号',
      carriageNum: 8,
      longitude: 0,
      latitude: 0
    }
  },
  methods: {

    getTrainInfo() {
      request({
        url: '/api/train/get',
      }).then(res => {
        if (res.code == 0) {
          this.trainNo = res.data.trainNo;
          this.model = res.data.model;
          this.carriageNum = res.data.carriageNum;
          this.longitude = res.data.longitude;
          this.latitude = res.data.latitude;
        }
      }).catch(err=>{

      })
    }
  },
  created() {
    this.getTrainInfo()
  }
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

.height {
  height: 40px;
  margin: 3px 0 3px 0;
}

.line-height {
  line-height: 40px;
}

.direction {
  flex-direction: column-reverse;
}

.space {
  margin-left: 10px;
}

.input {
  width: 200px;
}

</style>