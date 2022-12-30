<template>
  <div>
    <page-title title="告警信息"></page-title>
    <div style="border: 1px solid #e6e6e6;border-radius: 3px;padding: 15px">
      <a-row style="align-items: baseline;">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">起始时间：</a-col>
        <a-col :span="6">
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
        </a-col>
        <a-col :span="1" class="center-txt">一</a-col>
        <a-col :span="7">
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
        </a-col>

        <a-col :span="3"></a-col>
        <a-col :span="1">
          <a-button @click="onResetBtnClicked">重置</a-button>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <a-row style="margin-top: 15px">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">故障类别：</a-col>
        <a-col :span="4">
          <a-select
              :value="troubleType"
              class="select"
              @change="onTroubleTypeSelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of troubleTypeList"
                :key="index"
            >
              {{ item}}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">告警级别：</a-col>
        <a-col :span="4">
          <a-select
              :value="alarmPriority"
              class="select"
              @change="onAlarmPrioritySelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of alarmPriorityList"
                :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="4"></a-col>
        <a-col :span="1">
          <a-button @click="onQueryBtnClicked">查询</a-button>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <a-row style="margin-top: 15px">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">处理状态：</a-col>
        <a-col :span="20">
          <a-button :class="{btn:true,active:isAllActive}" @click="changeBtnAcive(-1)">全部</a-button>
          <a-button :class="{btn:true,active:isUntreatedActive}" @click="changeBtnAcive(0)">未处理</a-button>
          <a-button :class="{btn:true,active:isAlreadyActive}" @click="changeBtnAcive(1)">已处理</a-button>
        </a-col>
      </a-row>
    </div>
    <div style="margin: 20px 0 10px 0">告警列表[共{{tableData.length}}条]</div>
    <a-table
        bordered
        :columns="columns"
        :data-source="tableData"
        @change="onPaginationClicked"
        :pagination="pagination">
      <template #already="value,record,index">
        <div>
          <span v-if="value==='未处理'" style="color: red">未处理</span>
          <span v-else>{{value}}</span></div>
      </template>
    </a-table>
  </div>
</template>

<script>
import 'moment/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import PageTitle from "@/components/PageTitle"
import {request} from "@/network/request";
function isNotEmpty(param) {
  return param && param != ''
}
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
    align: 'center',
    sorter: (a, b) => a.alarmTime >b.alarmTime,
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
    scopedSlots: {customRender: 'alarmPriority'},
    sorter: (a, b) => a.alarmPriority >b.alarmPriority,
  },
  {
    title: '故障详细内容',
    key: 'alarmDescription',
    dataIndex: 'alarmDescription',
    align: 'center'
  },
  {
    title: '处理确认',
    key: 'already',
    dataIndex: 'already',
    align: 'center',
    scopedSlots: {customRender: 'already'},
    sorter: (a, b) => a.already > b.already,
  },
  {
    title: '操作员',
    key: 'alreadyUserName',
    dataIndex: 'alreadyUserName',
    align: 'center',
  },
];
const tableData = [
  {
    key: 1,
    number: 1,
    alarmTime: '2022-01-01 01:01:01',
    alarmType:'',
    alarmPriority:'二级警情',
    alarmDescription:'收到徐教练咖啡',
    already:'未处理',
    alreadyUserName:'administator',
  },
  {
    key: 2,
    number: 2,
    alarmTime: '2022-01-03 01:04:01',
    alarmType:'',
    alarmPriority:'一级警情',
    alarmDescription:'收到徐教练咖啡',
    already:'已处理',
    alreadyUserName:'administator',
  },
  {
    key: 3,
    number: 3,
    alarmTime: '2022-01-03 01:32:01',
    alarmType:'',
    alarmPriority:'三级警情',
    alarmDescription:'收到徐教练咖啡',
    already:'已处理',
    alreadyUserName:'administator',
  },
  ]
export default {
  name: "AlarmInfo",
  components: {PageTitle},
  data() {
    return {
      columns,
      tableData,
      // filteredInfo: null,
      // sortedInfo: null,
      isAllActive: true,//全部
      isAlreadyActive: false,//已处理
      isUntreatedActive: false,//未处理
      already: -1,//-1全部 0未处理 1已处理

      allowClear: false,
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

      troubleType:'',
      troubleTypeList:[],

      alarmPriority:'',
      alarmPriorityList:[],

      count: 200,
      // 分页参数
      pagination: {
        current: 1,
        pageSize: 10,
        total: tableData.length,
        // pageSizeOptions: ['2', '4', '6'], // 可选的页面显示条数
        // showTotal: (total, range) => {
        //   return range[0] + '-' + range[1] + ' 共' + total + '条'
        // }, // 展示每页第几条至第几条和总数
        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false // 是否可以改变pageSize
      },
    };
  },
  computed: {
  },
  methods: {
    moment,
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
    getTableData() {
      const params = {}
      params.page = this.pagination.current;
      params.count = this.pagination.pageSize;
      params.startTime = this.startDateString + ' ' + this.startTimeString;
      params.endTime = this.endTimeString + ' ' + this.endTimeString;
      if (this.already >= 0) {
        params.already = this.already;
      }
      request({
        url: '/api/alarm/list',
        params: {}
      }).then(res => {
        if (res.code == 0) {
          const resData = res.data;
          const resTableData = resData.list;
          const len = resTableData.length;

          let alarmPrioritySet=new Set();
          let troubleTypeSet=new Set();
          for (let i = 1; i <= len; i++) {
            // {
            //   "id": "",
            //     "deviceId": "",
            //     "channelId": "",
            //     "alarmPriority": "",
            //     "alarmTime": "",
            //     "alarmDescription": "",
            //     "alarmType": "",
            //     "createTime": "",
            //     "alreadyTime": "",
            //     "alreadyUser": 0,
            //     "alreadyUserName": ""
            // }

            //  key: 3,
            // number: 3,
            // alarmTime: '2022-01-03 01:32:01',
            // alarmType:'',
            // alarmPriority:'三级警情',
            // alarmDescription:'收到徐教练咖啡',
            // already:'已处理',
            // alreadyUserName:'administator',
            const info = resTableData[i - 1];
            info.key = info.number = i;
            if(!isNotEmpty(info.alreadyTime)){
              info.already='未处理';
            }
            this.tableData.push(info);

            alarmPrioritySet.add(info.alarmPriority);
            //todo
            // troubleTypeSet.set(info.troubleType);
          }

          this.alarmPriorityList=[];
          this.troubleTypeList=[];
          this.alarmPriorityList=Array.from(alarmPrioritySet);
          this.troubleTypeList=Array.from(troubleTypeSet);

        }

      }).catch(err => {
      })
    },
    onPaginationClicked(e) {
      this.pagination = e
    },
    onResetBtnClicked() {
      this.startDate = null;
      this.startDateString = '';

      this.startTime = null;
      this.startTimeString = '';

      this.endDate = null;
      this.endDateString = '';

      this.endTime = null;
      this.endTimeString = '';

      this.already = -1;
      this.isAllActive = true;
      this.isAlreadyActive = false;
      this.isUntreatedActive = false;
      //todo 置空两个select


      //todo '处理确认'排序失效
    },
    onQueryBtnClicked() {
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
      this.getTableData();
      console.log('=====>' + this.startDateString + ' ' + this.startTimeString + this.endDateString + ' ' + this.endTimeString);
    },
    changeBtnAcive(already) {
      if (already == -1) {
        this.isAllActive = true;
        this.isAlreadyActive = this.isUntreatedActive = false;
      } else if (already == 1) {
        this.isAlreadyActive = true;
        this.isAllActive = this.isUntreatedActive = false;
      } else if (already == 0) {
        this.isUntreatedActive = true;
        this.isAllActive = this.isAlreadyActive = false;
      }
      this.already = already
    },
    onTroubleTypeSelectChange(index,option){
      this.troubleType=this.troubleTypeList[index];
    },
    onAlarmPrioritySelectChange(index,option){
      this.alarmPriority=this.alarmPriorityList[index];
    },
  },
  created() {
    //两个select的数据
    this.endDateString = moment(new Date()).format(this.dateFormat);
    this.startTimeString = this.endTimeString = moment(new Date()).format(this.timeFormat);
    this.startDateString = moment().subtract(23, 'hours').format(this.dateFormat);
    this.getTableData()
  }
}
</script>

<style scoped>

.picker {
  width: 180px;
}

.center-txt {
  margin-top: 6px;
}

.select {
  width: 200px;
}

.btn {
  margin-right: 15px;
  width: 70px;
}

.active {
  background-color: #158BCD;
  color: white;
}

</style>