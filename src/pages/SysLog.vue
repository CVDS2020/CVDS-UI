<template>
  <div>

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
        <a-col :span="19"></a-col>
        <a-col :span="2"></a-col>
        <a-button>查询</a-button>
        <a-col :span="2"></a-col>
      </a-row>
    </div>
    <div style="margin: 20px 0 10px 0"><span>信息列表[共</span><span>18</span><span>条[</span></div>
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
    type: '',
    title: 'dfasdsdf',
    content: '耐烧豆腐哈水淀粉史蒂夫阿水淀粉阿水',
  },
  {
    key: '2',
    number: '2',
    time: '2022-01-02 01:01:01',
    type: '',
    title: 'dfasdsdf',
    content: '耐烧豆腐哈水淀粉史蒂夫阿水淀粉阿水',
  },
  {
    key: '3',
    number: '3',
    time: '2022-01-03 01:01:03',
    type: '',
    title: 'dfasdsdf',
    content: '耐烧豆腐哈水淀粉史蒂夫阿水淀粉阿水',
  }]
export default {
  name: "SysLog",
  data() {
    return {
      tableData,
      filteredInfo: null,
      sortedInfo: null,
    };
  },
  computed: {
    columns() {
      let {sortedInfo, filteredInfo} = this;
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: '编号',
          dataIndex: 'number',
          key: 'number',
          width: '70px'
        },
        {
          title: '时间',
          dataIndex: 'time',
          key: 'time',
          width: '200px',
          sorter: (a, b) => a.time > b.time,
          sortOrder: sortedInfo.columnKey === 'time' && sortedInfo.order,
        },
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '事件',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '详细内容',
          dataIndex: 'content',
          key: 'content'
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
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
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

</style>