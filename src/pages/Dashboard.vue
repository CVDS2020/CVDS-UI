<template>
  <div>
    <div class="charts">
      <a-card class="card">
        <div class="progress-title-txt">板卡在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (cameraOnlineNum / cardNum) * 100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">在线</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">在线：{{ cardOnlineNum }}</div>
        <div class="progress-footer-txt">总数：{{ cardNum }}</div>
      </a-card>

      <a-card class="card">
        <div class="progress-title-txt">摄像头在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (cameraOnlineNum / cameraNum) * 100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">在线</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">在线：{{ cameraOnlineNum }}</div>
        <div class="progress-footer-txt">总数：{{ cameraNum }}</div>
      </a-card>
      <a-card class="card">
        <div class="progress-title-txt">板卡在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (storageFreeCapacity / storageCapacity) * 100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">可用</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">总容量：{{ storageCapacity }}T</div>
        <div class="progress-footer-txt">可用容量：{{ storageFreeCapacity }}T</div>
        <div class="progress-footer-txt">已用容量：{{ storageUsedCapacity }}T</div>
      </a-card>
    </div>
    <a-row style="margin-bottom: 15px;padding-top: 20px">
      <a-col :span="20"><span style="font-size: 15px;color:#8FAADC;">告警列表[共{{ tableData.length }}条]</span></a-col>
      <a-col :span="4" style="display: flex;flex-direction: row-reverse">
        <a-button type="primary" @click="toAlarmInfo">更多>></a-button>
      </a-col>
    </a-row>
    <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        size="small"
        :pagination="false"
        :scroll="{y: 300 }">
      <template #alarmPriority="value,record,index">
        <div>
          <img v-if="value==='三级'" class="img" src="../assets/img/icon-alarm-blue.png" alt="">
          <img v-else-if="value==='二级'" class="img" src="../assets/img/icon-alarm-yellow.png" alt="">
          <img v-else-if="value==='一级'" class="img" src="../assets/img/icon-alarm-red.png" alt="">
          <span style="margin-left: 15px">{{ value }}</span>
        </div>
      </template>
      <template #alreadyTime="value,record,index">
        <div>
          <span v-if="value===''" style="color: red">未处理</span>
          <span v-else>{{value}}</span></div>
      </template>
    </a-table>
  </div>
</template>

<script>
import {request} from "@/network/request";

//table 表头及表格数据
const columns = [
  {
    title: '编号',
    dataIndex: 'number',
    key: 'number',
    width: '70px',
    align: 'center'
  },
  {
    title: '时间',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
    align: 'center'
  },
  {
    title: '故障类别',
    dataIndex: 'alarmType',
    key: 'alarmType',
    align: 'center'
  },
  {
    title: '告警级别',
    dataIndex: 'alarmPriority',
    key: 'alarmPriority',
    align: 'center',
    scopedSlots: {customRender: 'alarmPriority'}
  },
  {
    title: '故障详细内容',
    key: '故障详细内容',
    dataIndex: 'alarmDescription',
    align: 'center'
  },
  {
    title: '处理确认',
    key: '处理确认',
    dataIndex: 'alreadyTime',
    align: 'center',
    scopedSlots: {customRender: 'alreadyTime'}
  },
];
const tableData = [
  {
    key: 1,
    number: 1,
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '三级',
    alarmDescription: '摄像头05已关闭，请检查',
    alreadyTime: '',
    imgUrl: '../assets/img/icon-alarm-blue.png',
  },
  {
    key: 2,
    number: 2,
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '一级',
    alarmDescription: '摄像头03已关闭，请检查',
    alreadyTime: '已处理',
    imgUrl: '../assets/img/icon-alarm-blue.png',
  },
  {
    key: 3,
    number: 3,
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '二级',
    alarmDescription: '摄像头01被部分遮挡，请检查',
    alreadyTime: '',
    imgUrl: '../assets/img/icon-alarm-blue.png',
  }


  // {
  //   key: 4,
  //   number: 4,
  //   alarmTime: '2022/10/22 10:12:36',
  //   alarmType: '故障类别',
  //   alarmPriority: '二级',
  //   alarmDescription: '摄像头02故障，请检查',
  //   alreadyTime: '未处理',
  // },
  // {
  //   key: 5,
  //   number: 5,
  //   alarmTime: '2022/10/22 10:12:36',
  //   alarmType: '故障类别',
  //   alarmPriority: '一级',
  //   alarmDescription: '存储空间不足，自动停止保存视频',
  //   alreadyTime: '未处理',
  // },
  // {
  //   key: 6,
  //   number: 6,
  //   alarmTime: '2022/10/22 10:12:36',
  //   alarmType: '故障类别',
  //   alarmPriority: '一级',
  //   alarmDescription: '04摄像头，受电弓故障，请确认并联系人员检修',
  //   alreadyTime: '未处理',
  // },
];

export default {
  name: "Dashboard",
  data() {
    return {
      tableData,
      columns,
      cardNum: 1,
      cardOnlineNum: 1,
      cameraNum: 1,
      cameraOnlineNum: 1,
      storageCapacity: 1,
      storageUsedCapacity: 1,
      storageFreeCapacity: 1,
    }
  },
  mounted() {
  },
  methods: {
    imgUlr(value, record, index) {
      console.log("====>", value, record, index)
    },
    toAlarmInfo() {
      this.$router.replace('/alarmInfo')
    },
    getStatistics() {
      request({
        url: '/api/statistics/get',
        method: 'get',
      }).then(res => {
        if (res.code == 0) {
          this.cardNum = res.data.cardNum;
          this.cardOnlineNum = res.data.cardOnlineNum;
          this.cameraNum = res.data.cameraNum;
          this.cameraOnlineNum = res.data.cameraOnlineNum;
          this.storageCapacity = res.data.storageCapacity;
          this.storageUsedCapacity = res.data.storageUsedCapacity;
          this.storageFreeCapacity = res.data.storageCapacity - res.data.storageUsedCapacity;
        } else {
          alert("数据请求失败!")
        }
      }).catch(err => {
        // console.log(err);
        alert("数据请求失败")
      })
    },
    getLastAlarm() {
      request({
        url: '/api/alarm/getLast'
      }).then(res => {
        if (res.code == 0) {
          this.tableData = [];
          const resData = res.data;
          const len = res.data.length;
          for (let i = 1; i <= len; i++) {
            this.tableData[i].key = i;
            this.tableData[i].number = i;
            this.tableData[i].alarmTime = resData[i].alarmTime;
            this.tableData[i].alarmPriority = resData[i].alarmPriority;
            this.tableData[i].alarmDescription = resData[i].alarmDescription;
            this.tableData[i].alreadyTime = resData[i].alreadyTime;
          }
        }
      }).catch(err => {

      })
    },
  },
  created() {
    this.getStatistics()
    this.getLastAlarm()
  }

}
</script>

<style scoped>
.charts {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px
}

.card {
  /*padding: 0 20px;*/
}

.progress {
  margin: 20px 40px;
}

.progress-title-txt {
  font-size: 25px;
}

.progress-center-txt {
  font-size: 20px;
}

.progress-footer-txt {
  font-size: 15px;
  text-align: center;
}

.img {
  width: 25px;
  height: 25px;
}

.txt-red {
  color: red;
}
</style>