<template>
  <div>

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
        <a-col :span="2" class="center-txt" style="text-align: right">用户：</a-col>
        <a-col :span="4">
          <a-select
              :value="user.username"
              class="select"
              @change="onUserSelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of userList"
                :key="index"
            >
              {{ item.username }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">授权终端：</a-col>
        <a-col :span="4">
          <a-select
              :value="terminal.username"
              class="select"
              @change="onTerminalSelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of terminalList"
                :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="4"></a-col>
        <a-col :span="1">
          <a-button @click="onQueryBtnClicked">查询</a-button>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
    </div>
    <div style="margin: 20px 0 10px 0">信息列表[共{{ tableData.length }}条]</div>
    <a-table
        bordered
        :columns="columns"
        :data-source="tableData"
        @change="onPaginationClicked"
        :pagination="pagination"
    />
  </div>
</template>

<script>
import 'moment/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';
import {request} from "@/network/request";

function isNotEmpty(param) {
  return param && param != ''
}
// 日期格式化
function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
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
    dataIndex: 'createTime',
    key: 'createTime',
    width: '300px',
    sorter: (a, b) => a.createTime > b.createTime,
    align: 'center'
  },
  {
    title: '用户',
    dataIndex: 'username',
    key: 'username',
    align: 'center'
  },
  {
    title: '授权终端',
    dataIndex: 'terminal',
    key: 'terminal',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center'
  },
  {
    title: '详细内容',
    dataIndex: 'content',
    key: 'content',
    align: 'center'
  },
]
const tableData = [
  {
    key: 1,
    number: 1,
    createTime: '2022-01-01 01:01:01',
    username: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆',
    content: '详细内容阿水淀粉速度史蒂夫'
  },
  {
    key: 2,
    number: 2,
    createTime: '2022-01-06 01:01:01',
    username: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆',
    content: '详细内容阿水淀粉速度史蒂夫'
  },
  {
    key: 3,
    number: 3,
    createTime: '2022-01-05 01:01:01',
    username: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆定时发送到发送到发送地方',
    content: '详细内容阿水淀粉速度史蒂夫'
  }]
export default {
  name: "OperationLog",
  data() {
    return {
      columns,
      tableData,
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

      user: {username: '', id: undefined},
      userList: [],

      terminal: {},
      terminalList: [],

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
  computed: {},
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
      const params = {};
      params.page = this.pagination.current;
      params.count = this.count;
      params.startTime = this.startDateString + ' ' + this.startTimeString;
      params.endTime = this.endDateString + ' ' + this.endTimeString;
      params.type = 1;//0系统日志  1操作日志
      if (isNotEmpty(this.user.id)) {
        params.userId = this.user.id
      }
      if (isNotEmpty(this.terminal.username)) {
        params.terminal = this.terminal.username
      }
      request({
        url: '/api/log/list',
        params,
      }).then(res => {
        if (res.code == 0) {

          const resData = res.data;
          const resTableData = resData.list;
          const len = resTableData.length;
          if(res.data.isFirstPage)this.tableData=[]

          // let userMap = new Map();//user select数据源去重
          // let terminalMap = new Map();//terminal数据源去重
          for (let i = 1; i <= len; i++) {
            //列表设计数据结构
            // key: 1,
            // number: 1,
            // createTime: '2022-01-01 01:01:01',
            // username: 'admin',
            // terminal: 'sdfadsffgdfgsdfg',
            // operation: '登陆',
            // content:'详细内容阿水淀粉速度史蒂夫'

            //接口文档数据结构
            // id
            // type
            // title
            // content
            // userId
            // username
            // terminal
            // createTime

            //接口返回数据结构
            // "content": "登录系统成功: 120.245.20.65",
            //     "createTime": 1677568911000,
            //     "id": 8,
            //     "terminal": "WEB",
            //     "title": "用户登录",
            //     "type": 1,
            //     "userId": 1
            const info = resTableData[i - 1];
            info.key = info.number = i;
            info.createTime=moment(new Date(info.createTime)).format('YYYY-MM-DD HH:mm:ss')
            info.operation=info.title;
            this.tableData.push(info);

          }
        }else{
          this.$message.error(res.message)
        }

      }).catch(err => {
        this.$message.error(err.code + '!  ' + err.message)
      })
    },
    getAllUser() {
      request({
        url: '/api/user/all'
      }).then(res => {
        if (res.code == 0) {
          this.userList = [];
          this.userList = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.code + '!  ' + err.message)
      })
    },
    getTerminalList() {
      request({
        url: '/api/log/terminal/list',
      }).then(res => {
        if (res.code == 0) {
          this.terminalList = [];
          this.terminalList = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.code + '!  ' + err.message)
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
      //置空两个select
      this.user = {username: '', id: undefined};
      this.terminal = {username:''};

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
      const s = this.startDateString + ' ' + this.startTimeString;
      const e = this.endDateString + ' ' + this.endTimeString;
      if (s > e) {
        this.cleanPicker();
        this.$message.warn("开始时间不能大于结束时间");
        return;
      }
      this.getTableData();
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
    onUserSelectChange(index, option) {
      this.user = this.userList[index];
    },
    onTerminalSelectChange(index, option) {
      this.terminal = this.terminalList[index]
    },
  },
  created() {
    this.endDateString = moment(new Date()).format(this.dateFormat);
    this.startTimeString = this.endTimeString = moment(new Date()).format(this.timeFormat);
    this.startDateString = moment().subtract(23, 'hours').format(this.dateFormat);
    this.getTableData();
    //获取"用户"、"授权终端"两个select的数据
    this.getAllUser();
    this.getTerminalList();
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

</style>