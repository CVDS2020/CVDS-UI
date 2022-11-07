<template>
  <div>
    <div class="charts">
      <a-card class="card">
        <div class="progress-title-txt">板卡在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (cameraOnlineNum/cardNum)*100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">在线</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">在线：{{cardOnlineNum}}</div>
        <div class="progress-footer-txt">总数：{{cardNum}}</div>
      </a-card>

      <a-card class="card">
        <div class="progress-title-txt">摄像头在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (cameraOnlineNum/cameraNum)*100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">在线</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">在线：{{cameraOnlineNum}}</div>
        <div class="progress-footer-txt">总数：{{cameraNum}}</div>
      </a-card>
      <a-card class="card">
        <div class="progress-title-txt">板卡在线数量</div>
        <a-progress class="progress" width="300px" type="circle" :percent="100">
          <template #format="percent">
            <div style="flex-direction: column">
              <div class="progress-center-txt">{{ (storageFreeCapacity / storageCapacity)*100 }}%</div>
              <div class="progress-center-txt" style="margin-top: 5px">可用</div>
            </div>
          </template>
        </a-progress>
        <div class="progress-footer-txt">总容量：{{ storageCapacity }}T</div>
        <div class="progress-footer-txt">可用容量：{{ storageFreeCapacity }}T</div>
        <div class="progress-footer-txt">已用容量：{{ storageUsedCapacity }}T</div>
      </a-card>


    </div>
    <div><span style="color:#0FF;margin-top: 5px;">告警列表[共</span><span>10</span><span>条]</span></div>
    <a-button type="primary" style="float: right" @click="toAlarmInfo">更多>></a-button>

    <a-table :columns="columns" :data-source="tableData" bordered :pagination="false" :scroll="{y: 300 }">
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
    // scopedSlots: {customRender: 'name'},
  },
  {
    title: '时间',
    // className: 'alarmTime',
    dataIndex: 'alarmTime',
  },
  {
    title: '故障类别',
    dataIndex: 'alarmType',
  },
  {
    title: '告警级别',
    dataIndex: 'alarmPriority',
  },
  {
    title: '故障详细内容',
    dataIndex: 'alarmDescription',
  },
  {
    title: '处理确认',
    dataIndex: 'result',
  },
  {
    title: '操作',
    dataIndex: 'confirm',
  },
];
const tableData = [
  {
    key: '1',
    number: '1',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '三级',
    alarmDescription: '摄像头05已关闭，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '2',
    number: '2',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '三级',
    alarmDescription: '摄像头03已关闭，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '3',
    number: '3',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '二级',
    alarmDescription: '摄像头01被部分遮挡，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '4',
    number: '4',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '二级',
    alarmDescription: '摄像头02故障，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '5',
    number: '5',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '一级',
    alarmDescription: '存储空间不足，自动停止保存视频',
    result: '未处理',
    confirm: '确认',
  }, {
    key: '6',
    number: '6',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '一级',
    alarmDescription: '04摄像头，受电弓故障，请确认并联系人员检修',
    result: '未处理',
    confirm: '确认',
  },


  {
    key: '7',
    number: '1',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '三级',
    alarmDescription: '摄像头05已关闭，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '8',
    number: '2',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '三级',
    alarmDescription: '摄像头03已关闭，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '9',
    number: '3',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '二级',
    alarmDescription: '摄像头01被部分遮挡，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '10',
    number: '4',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '二级',
    alarmDescription: '摄像头02故障，请检查',
    result: '未处理',
    confirm: '确认',
  },
  {
    key: '11',
    number: '5',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '一级',
    alarmDescription: '存储空间不足，自动停止保存视频',
    result: '未处理',
    confirm: '确认',
  }, {
    key: '12',
    number: '6',
    alarmTime: '2022/10/22 10:12:36',
    alarmType: '故障类别',
    alarmPriority: '一级',
    alarmDescription: '04摄像头，受电弓故障，请确认并联系人员检修',
    result: '未处理',
    confirm: '确认',
  },
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
    toAlarmInfo() {
      this.$router.replace('/alarmInfo')
    },
    requestChartsData() {
      request({
        url: '/api/statistics/get',
        method: 'get',
      }).then(res => {
        if (res.code == 0) {
          this.cardNum=res.data.cardNum;
          this.cardOnlineNum=res.data.cardOnlineNum;
          this.cameraNum=res.data.cameraOnlineNum;
          this.storageCapacity=res.data.storageCapacity;
          this.storageUsedCapacity=res.data.storageUsedCapacity;
          this.storageFreeCapacity=res.data.storageCapacity-res.data.storageUsedCapacity;
        }else {
          alert("数据请求失败!")
        }
      }).catch(err => {
        // console.log(err);
        alert("数据请求失败")
      })
    },
  },
  created() {
    this.requestChartsData()
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
</style>