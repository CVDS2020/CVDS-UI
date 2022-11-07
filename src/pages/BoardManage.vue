<template>
  <div>
    <div>板卡控制</div>
    <a-row style="margin-top: 150px">
      <a-col :span="2"></a-col>
      <a-col :span="5">
        <a-card class="card">
          <h2 class="p">电源板</h2>
          <div class="btn-container">
            <a-button class="btn">开机</a-button>
            <a-button class="btn">关机</a-button>
            <a-button class="btn">重启</a-button>
          </div>

        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card">
          <h2 class="p">交换板</h2>
          <div class="btn-container">
            <a-button class="btn">开机</a-button>
            <a-button class="btn">关机</a-button>
            <a-button class="btn">重启</a-button>
          </div>

        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card">
          <h2 class="p">视频核心板</h2>
          <div class="btn-container">
            <a-button class="btn">开机</a-button>
            <a-button class="btn">关机</a-button>
            <a-button class="btn">重启</a-button>
          </div>

        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card">
          <h2 class="p">AI分析板</h2>
          <div class="btn-container">
            <a-button class="btn">开机</a-button>
            <a-button class="btn">关机</a-button>
            <a-button class="btn">重启</a-button>
          </div>

        </a-card>
      </a-col>
<!--      <a-col :span="5">-->
<!--        <a-card class="card">交换板</a-card>-->
<!--      </a-col>-->
<!--      <a-col :span="5">-->
<!--        <a-card class="card">视频核心板</a-card>-->
<!--      </a-col>-->
<!--      <a-col :span="5">-->
<!--        <a-card class="card">AI分析版</a-card>-->
<!--      </a-col>-->
      <a-col :span="2"></a-col>
    </a-row>
    <div>


    </div>
  </div>
</template>

<script>
export default {
  name: "BoardInfo"
}
</script>


<style scoped>
.col {

}

.card {
  width: 250px;
  height: 350px;
  background-color: #158BCD;
  text-align: center;
  /*line-height: 400px;*/
}

.p{
  /*background-color: yellow;*/
  margin-top: 120px;
  color: white;
}
.btn-container{
  /*background-color: red;*/
  /*flex-grow: 1;*/
  position: relative;
  top:100px;
}
.btn{
  padding: 0 3px;
  margin: 0 3px;
  width: 50px;
  height: 30px;
}
</style>