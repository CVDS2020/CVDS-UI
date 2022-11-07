<template>
  <div>
    <div>系统信息</div>
    <div class="card-container">
      <div class="card-title" style="background-color: #DEEBF7">基本信息：</div>
      <div class="card">
        <a-row class="row margin-top" style="">
          <a-col :span="2"></a-col>
          <a-col :span="4" class="col"><span class="txt">类型代码：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">厂商代码：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">软件版本：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">固件版本：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"></a-col>
          <a-col :span="1"></a-col>
        </a-row>

        <a-row class="row margin-bottom" style="">
          <a-col :span="2"></a-col>
          <a-col :span="4" class="col"><span class="txt">登陆用户：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">用户角色：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">登陆时间：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">登陆设备：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">设备IP：</span>
            <a-input class="input"></a-input>
          </a-col>
          <a-col :span="1"></a-col>
        </a-row>


      </div>
    </div>

    <div class="card-container">
      <div class="card-title" style="background-color: #A9D18E ">系统维护：</div>
      <div class="card">
        <a-row class="row margin-top" style="">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col"><span class="txt">当前时间：</span>
            <a-input class="input" style="width: 200px"></a-input>
          </a-col>
          <a-col :span="4" class="col">
            <a-button class="btn1">手动同步</a-button>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <div style="display: flex">
              <span class="txt">校时设置：</span>
              <a-radio-group>
                <a-radio :value="1">
                  自动校时
                </a-radio>
                <a-radio :value="2">
                  手动校时
                </a-radio>
              </a-radio-group>
            </div>
          </a-col>
        </a-row>
        <div style="margin:15px 0 20px 100px; width: 700px;height: 1px;background-color: #e6e6e6; "></div>
        <a-row class="row">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <div >
              <span class="txt">起始时间：</span>
              <a-date-picker class="picker"/>
              <a-time-picker class="picker"/>
              <span>一</span>
              <a-date-picker class="picker"/>
              <a-time-picker class="picker"/>
            </div>
          </a-col>
          <a-col :span="2" class="col">
            <a-button class="btn1">日志下载</a-button>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <div style="display: flex">
              <span class="txt">校时设置：</span>
              <a-checkbox-group :options="plainOptions" :default-value="['系统日志']" @change="onChange" />
            </div>
          </a-col>
        </a-row>
        <a-row class="row margin-bottom" style="">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <span class="txt">下载路径：</span>
            <a-input class="input" style="width: 400px"></a-input>
            <a-button>浏览</a-button>
          </a-col>

        </a-row>

      </div>
    </div>

  </div>
</template>

<script>
const plainOptions = ['系统日志', '操作日志', '告警日志'];

export default {
  name: "SysInfo",
  data(){
    return{
      plainOptions,
    }
  }
}
</script>

<style scoped>
.row {
  margin: 10px 0;
}

.txt {
  margin-top: 5px;
  font-size: 14px;
}

.input {
  width: 140px;
  height: 30px;
}

.col {
  display: flex;
  flex-direction: row;
}

.padding {
  padding: 0 40px;
}

.picker {
  width: 150px;
}

.center-txt {
  margin-top: 6px;
}

.card-title {
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  text-align: center;
  position: relative;
  top: 15px;
  left: 50px;
  width: 80px;
  height: 30px;
  padding-top: 5px;
  padding-left: 5px;
}

.card {
  border: 1px solid #e6e6e6;
  border-radius: 3px
}

.card-container {
  margin-top: 30px
}

.margin-top {
  margin-top: 25px
}

.margin-bottom {
  margin-bottom: 25px
}
.btn1{
  background-color: #3E64AD;
  color: white;
  height: 25px;
}

</style>