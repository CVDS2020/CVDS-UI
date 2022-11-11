<template>
  <div>
    <div>告警信息：</div>
    <div style="border: 1px solid #e6e6e6;border-radius: 3px;padding: 15px">
      <a-row style="align-items: baseline;">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">起始时间：</a-col>
        <a-col :span="3">
          <a-date-picker class="picker" @change="onStartDateChange"/>
        </a-col>
        <a-col :span="3">
          <a-time-picker class="picker" :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                         @change="onStartTimeChange"/>
        </a-col>
        <a-col :span="1" class="center-txt" style="text-align: center">一</a-col>
        <a-col :span="3">
          <a-date-picker class="picker" @change="onStartDateChange"/>
        </a-col>
        <a-col :span="4">
          <a-time-picker class="picker" :default-open-value="moment('00:00:00', 'HH:mm:ss')"
                         @change="onStartTimeChange"/>
        </a-col>
        <a-col :span="3"></a-col>
        <a-col :span="1">
          <a-button>重置</a-button>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <a-row style="margin-top: 15px">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">用户：</a-col>
        <a-col :span="4">
          <a-select class="select" default-value="受电弓">
            <a-select-option value="受电弓">
              受电弓
            </a-select-option>
            <a-select-option value="转向架">
              转向架
            </a-select-option>
            <a-select-option value="车厢">
              车厢
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="3"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">授权终端：</a-col>
        <a-col :span="4">
          <a-select class="select" default-value="受电弓">
            <a-select-option value="受电弓">
              受电弓
            </a-select-option>
            <a-select-option value="转向架">
              转向架
            </a-select-option>
            <a-select-option value="车厢">
              车厢
            </a-select-option>
          </a-select>
        </a-col>

        <a-col :span="4"></a-col>
        <a-col :span="1">
          <a-button>查询</a-button>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>
      <a-row style="margin-top: 15px">
        <a-col :span="2"></a-col>
        <a-col :span="2" class="center-txt" style="text-align: right">处理状态：</a-col>
        <a-col :span="20">
          <a-button class="btn">全部</a-button>
          <a-button class="btn">未处理</a-button>
          <a-button class="btn">已处理</a-button>
        </a-col>
      </a-row>
    </div>
    <div style="margin: 20px 0 10px 0"><span>告警列表[共</span><span>18</span><span>条[</span></div>
    <a-table bordered :columns="columns" :data-source="tableData" @change="handleChange"/>
  </div>
</template>

<script>
import 'moment/locale/zh-cn';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import moment from 'moment';

const tableData = [
  {
    key: '1',
    number: '1',
    time: '2022-01-01 01:01:01',
    user: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆',
    content:'详细内容阿水淀粉速度史蒂夫'
  },
  {
    key: '2',
    number: '2',
    time: '2022-01-06 01:01:01',
    user: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆',
    content:'详细内容阿水淀粉速度史蒂夫'
  },
  {
    key: '3',
    number: '3',
    time: '2022-01-05 01:01:01',
    user: 'admin',
    terminal: 'sdfadsffgdfgsdfg',
    operation: '登陆',
    content:'详细内容阿水淀粉速度史蒂夫'
  }]
export default {
  name: "AlarmInfo",
  data() {
    return {
      tableData,
      // filteredInfo: null,
      sortedInfo: null,
    };
  },
  computed: {
    columns() {
      // let {sortedInfo, /*filteredInfo*/} = this;
      // sortedInfo = sortedInfo || {};
      // filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: '编号',
          dataIndex: 'number',
          key: 'number',
          width: '70px',
          align:'center',
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          width: '200px',
          align:'center',
          sorter: (a, b) => a.time > b.time,
          // sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
        },
        {
          title: '用户',
          dataIndex: 'user',
          key: 'user',
          align:'center',
        },
        {
          title: '授权终端',
          dataIndex: 'terminal',
          key: 'terminal',
          align:'center',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          align:'center',
        },
        {
          title: '详细内容',
          dataIndex: 'content',
          key: 'content',
          align:'center',
        },
      ]
      return columns;
    },
  },
  methods: {
    moment,
    onStartDateChange() {

    },
    onStartTimeChange() {

    },
    handleChange(pagination, filters, sorter) {
      console.log('Various parameters', pagination, filters, sorter);
      // this.filteredInfo = filters;
      this.sortedInfo = sorter;
      console.log("sortedInfo:",sorter)
    },
  }
}
</script>

<style scoped>

.picker {
  width: 150px;
}

.center-txt {
  margin-top: 6px;
}
.select{
  width: 200px;
}
.btn{
  margin-right: 15px;
  width: 70px;
}

</style>