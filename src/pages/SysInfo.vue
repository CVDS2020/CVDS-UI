<template>
  <div>
    <page-title title="系统信息"></page-title>
    <div class="card-container">
      <div class="card-title" style="background-color: #DEEBF7">基本信息：</div>
      <div class="card">
        <a-row class="row margin-top" style="">
          <a-col :span="2"></a-col>
          <a-col :span="4" class="col"><span class="txt">类型代码：</span>
            <span class="span">{{ typeCode }}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">厂商代码：</span>
            <span class="span">{{ manufacturerCode }}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">软件版本：</span>
            <span class="span">{{ softwareVersion }}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">固件版本：</span>
            <span class="span">{{ firmwareVersion }}</span>
          </a-col>
          <a-col :span="4" class="col"></a-col>
          <a-col :span="1"></a-col>
        </a-row>

        <a-row class="row margin-bottom" style="">
          <a-col :span="2"></a-col>
          <a-col :span="4" class="col"><span class="txt">登陆用户：</span>
            <span class="span">{{this.$store.state.user.username}}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">用户角色：</span>
            <span class="span">{{this.$store.state.user.roleName}}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">登陆时间：</span>
            <span class="span" style="width: 180px">{{this.$store.state.user.loginTime}}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">登陆设备：</span>
            <span class="span">{{this.$store.state.user.loginDev}}</span>
          </a-col>
          <a-col :span="4" class="col"><span class="txt">设备IP：</span>
            <span class="span">{{this.$store.state.user.ip}}</span>
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
            <a-input
                class="input"
                style="width: 200px"
                :value="currentTime"
                @blur="onBlur"
                @focus="onFocus"></a-input>
          </a-col>
          <a-col :span="4" class="col">
            <a-button class="btn1" @click="onCorrectionBtnClicked">手动同步</a-button>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <div style="display: flex">
              <span class="txt">校时设置：</span>
              <a-radio-group :value="correctionType" @change="onRadioSelected">
                <a-radio value="0">
                  自动校时
                </a-radio>
                <a-radio value="1">
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
            <div>
              <span class="txt">起始时间：</span>
              <a-date-picker
                  class="picker"
                  @change="onStartDateChange"
                  :value="startDate"
                  placeholder="选择日期"
                  :allowClear="false"/>
              <a-time-picker
                  class="picker"
                  @change="onStartTimeChange"
                  :value="startTime"
                  placeholder="选择时间"
                  :allowClear="false"/>
              <span style="padding: 0 5px">一</span>
              <a-date-picker
                  class="picker"
                  @change="onEndDateChange"
                  :value="endDate"
                  placeholder="选择日期"
                  :allowClear="false"/>
              <a-time-picker
                  class="picker"
                  @change="onEndTimeChange"
                  :value="endTime"
                  placeholder="选择时间"
                  :allowClear="false"/>
            </div>
          </a-col>
          <a-col :span="2" class="col">
            <a-button class="btn1" @click="onDownloadBtnClicked">日志下载</a-button>
          </a-col>
          <a-col :span="2"></a-col>
        </a-row>
        <a-row class="row">
          <a-col :span="2"></a-col>
          <a-col :span="16" class="col">
            <div style="display: flex">
              <span class="txt">校时设置：</span>
<!--              <a-checkbox-group :options="plainOptions" :default-value="['系统日志']" @change="onCheckboxChange"/>-->
              <a-checkbox-group :options="plainOptions" @change="onCheckboxChange"/>
            </div>
          </a-col>
        </a-row>
        <!--应用无法更改下载路径，只能在浏览器设置-->
<!--        <a-row class="row margin-bottom" style="">-->
<!--          <a-col :span="2"></a-col>-->
<!--          <a-col :span="16" class="col">-->
<!--            <span class="txt">下载路径：</span>-->
<!--            <a-input class="input" style="width: 400px"></a-input>-->
<!--            <a-button style="margin-left: 5px" @click="onBrowseBtnclicked">浏览</a-button>-->
<!--          </a-col>-->
<!--        </a-row>-->
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import {request} from "@/network/request";
import 'moment/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
function isNotEmpty(param) {
  return param && param != ''
}
const plainOptions = ['系统日志', '操作日志', '告警日志'];

export default {
  name: "SysInfo",
  components: {
    PageTitle,
  },
  data() {
    return {
      plainOptions,
      typeCode: '',
      manufacturerCode: '',
      softwareVersion: '',
      firmwareVersion: '',

      currentTime:'',
      timer:'',
      correctionType:'0',

      allowClear:false,
      dateFormat: 'YYYY-MM-DD',
      timeFormat: 'HH:mm:ss',
      startDateString: '',
      startDate: null,
      startTimeString: '',
      startTime: null,
      endDateString: '',
      endDate: null,
      endTimeString: '',
      endTime: null,

      typeValue:[],
    }
  },
  methods: {
    moment,
    getAlarmType(){
      request({
        url:'/api/alarm/getAlarmType',
      }).then(res=>{
        if(res.code==0){

        }
      }).catch(err=>{ this.$message.error(err.code+'!  '+err.message)})
    },
    getSysInfo() {
      request({
        url: '/api/system/info',
      }).then(res => {
        // {
        //   "code": 0,
        //     "data": {
        //   "systemInfo": {
        //     "firmwareVersion": "1.0",
        //         "manufacturerCode": "CSS-CVDS-CMU",
        //         "softwareVersion": "1.0",
        //         "typeCode": "cvds-cmu"
        //   }
        // },
        //   "message": "成功"
        // }
        if (res.code == 0) {
          this.typeCode = res.data.systemInfo.typeCode;
          this.manufacturerCode = res.data.systemInfo.manufacturerCode;
          this.softwareVersion = res.data.systemInfo.softwareVersion;
          this.firmwareVersion = res.data.systemInfo.firmwareVersion;
        }else{
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })

    },
    getCurrentTime(){
      this.currentTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    onRadioSelected(e){
      this.correctionType=e.target.value;
    },
    onCorrectionBtnClicked(){
      const params={};
      params.type=parseInt(this.correctionType);
      if(!isNotEmpty(this.currentTime)){
        this.currentTime=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      }
      params.time=this.currentTime;
      request({
        url:'/api/system/correction',
        method:'put',
        data:JSON.parse(JSON.stringify(params)),
      }).then(res=>{
        if(res.code==0){
          this.$message.info('校时成功');
        }else{
          this.$message.error(res.message);
        }
      }).catch(err=>{ this.$message.error(err.code+'!  '+err.message)})
    },
    onBlur(){
      this.timer=setInterval(this.getCurrentTime,1000)
      // this.correctionType=0;
    },
    onFocus(){
      clearInterval(this.timer);
      // this.correctionType=1;
    },
    onStartDateChange(date, dateString) {
      this.startDateString = dateString;
      this.startDate = this.moment(dateString, this.dateFormat)
    },
    onStartTimeChange(time, timeString) {
      this.startTimeString = timeString;
      this.startTime = this.moment(timeString, this.timeFormat)
    },
    onEndDateChange(date, dateString) {
      this.endDateString = dateString;
      this.endDate = this.moment(dateString, this.dateFormat)
    },
    onEndTimeChange(time, timeString) {
      // console.log('time:', time, 'timeString:', timeString)
      this.endTimeString = timeString;
      this.endTime = this.moment(timeString, this.timeFormat)
    },
    onCheckboxChange(checkeList){
      this.typeValue=[];
      checkeList.forEach(item=>{
        if(item===plainOptions[0])this.typeValue.push(0);
        else if(item===plainOptions[1])this.typeValue.push(1);
        else if(item===plainOptions[2])this.typeValue.push(2);
      })
    },
    onDownloadBtnClicked(){
      if (!isNotEmpty(this.startDateString)) {
        this.$message.warn('开始日期不能为空！');
        return;
      }
      if (!isNotEmpty(this.startTimeString)) {
        this.$message.warn('开始时间不能为空！');
        return;
      }
      if (!isNotEmpty(this.endDateString)) {
        this.$message.warn('结束日期不能为空！');
        return;
      }
      if (!isNotEmpty(this.endTimeString)) {
        this.$message.warn('结束时间不能为空！');
        return;
      }
      const s = this.startDateString + ' ' + this.startTimeString;
      const e = this.endDateString + ' ' + this.endTimeString;
      if (s < e) {
        this.cleanPicker();
        this.$message.warn("开始时间不能大于结束时间");
        return;
      }
      const params={
        startTime: this.startDateString+' '+this.startTimeString,
        endTime:this.endTimeString+' '+this.endTimeString,
      }
      params.type=this.typeValue;

      request({
        url: '/api/log/download',
        params,
      }).then(res => {
        if(res.code==0){
          this.$message.info('日志下载成功')
        }else{
          this.$message.error(res.message)
        }
      }).catch(err=>{ this.$message.error(err.code+'!  '+err.message)})
    },
    cleanPicker() {
      this.startDateString = '';
      this.startDate = null;
      this.startTimeString = '';
      this.startTime = null;
      this.endDateString = '';
      this.endDate = null;
      this.endTimeString = '';
      this.endTime = null;
    },
    onBrowseBtnclicked(){
      this.$message.warn('下载路径仅可以通过浏览器下载，应用无法更改下载路径')
    },
  },
  created() {
    this.getSysInfo();
    this.timer=setInterval(this.getCurrentTime,1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  destroyed() {
  },

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

.span {
  width: 140px;
  height: 30px;
  line-height: 30px;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding-left: 5px;

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
  padding-top: 3px;
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

.btn1 {
  background-color: #3E64AD;
  color: white;
  height: 25px;
}

</style>