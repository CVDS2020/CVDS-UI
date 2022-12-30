<template>
  <div>
    <page-title title="存储信息"></page-title>
    <a-button style="margin-bottom: 20px;background-color: orange;color: white" @click="onStorConfBtnClicked">存储配置
    </a-button>
    <a-card>
      <a-row>
        <a-col :span="2" class="left-txt">磁盘号：</a-col>
        <a-col :span="3">
          <a-select
              :value="diskNo"
              class="select"
              @change="onDiskNoSelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of diskNoList"
                :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2" class="left-txt">状态：</a-col>
        <a-col :span="6">
          <a-button :class="{btn:true,btn1:statusAll}" @click="changeBtnAcive(0,undefined)">全部</a-button>
          <a-button :class="{btn:true,btn1:statusNormal}" @click="changeBtnAcive(0,0)">正常</a-button>
          <a-button :class="{btn:true,btn1:statusTrouble}" @click="changeBtnAcive(0,1)">故障</a-button>
        </a-col>
        <a-col :span="2" class="left-txt">类型：</a-col>
        <a-col :span="6">
          <a-button :class="{btn:true,btn1:typeAll}" @click="changeBtnAcive(1,undefined)">全部</a-button>
          <a-button :class="{btn:true,btn1:typeLocal}" @click="changeBtnAcive(1,0)">本地</a-button>
          <a-button :class="{btn:true,btn1:typeExternal}" @click="changeBtnAcive(1,1)">外接USB</a-button>
        </a-col>
        <a-col :span="3">
          <a-button @click="resetBtnClicked">重置</a-button>
        </a-col>
      </a-row>
      <a-row class="card-item">
        <a-col :span="21"></a-col>
        <a-col :span="3">
          <a-button @click="getTableData">查询</a-button>
        </a-col>
      </a-row>
    </a-card>
    <a-row class="table-title">
      <a-col :span="4"><span>磁盘空间列表[共{{ tableData.length }}条]</span></a-col>
    </a-row>
    <a-table
        :columns="columns"
        :data-source="tableData"
        bordered
        @change="onPaginationClicked"
        :pagination="pagination">
      <template #operation="value,record,index">
        <div>
          <a-row>
            <a-col :span="3"></a-col>
            <a-col :span="6">
              <img class="img" src="../assets/img/icon-view-cam-info.png" alt="" @click="showMessage('内容未确定')">
            </a-col>
            <a-col :span="6">
              <img style="width: 25px;height: 25px" src="../assets/img/icon-export.png" alt=""
                   @click="onDownloadRecordImgClicked">
            </a-col>
            <a-col :span="6">
              <a-popconfirm
                  placement="bottomRight"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="initDisk(value,record,index)">
                <template #title>
                  <p>是否格式化当前USB磁盘</p>
                </template>
                <img v-show="record.type==1" class="img" src="../assets/img/icon-external.png" alt="" @click="">
              </a-popconfirm>
            </a-col>
            <a-col :span="3"></a-col>
          </a-row>
        </div>
      </template>
    </a-table>
    <!--存储配置modal-->
    <a-modal
        title="存储配置"
        centered
        :width="800"
        :visible="storageConfigModalVisible"
        :closable="false"
    >
      <a-row>
        <a-col :span="1"></a-col>
        <a-col :span="4" class="left-txt">文件保存间隔：</a-col>
        <a-col :span="4">
          <a-select
              :value="saveInterval+'分钟'"
              class="select"
              @change="onSaveIntervalSelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of saveIntervalList"
                :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row style="margin-top: 20px">
        <a-col :span="1"></a-col>
        <a-col :span="4" class="left-txt">文件保存位置：</a-col>
        <a-col :span="4">
          <a-select
              :value="saveDirectory"
              class="select"
              @change="onSaveDirectorySelectChange">
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of saveDirectoryList"
                :key="index"
            >
              {{ item }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row>

      <div style="margin-top: 30px">
        <div
            style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 12px;left: 50px;width: 80px;height: 30px;padding-top:5px">
          保存天数：
        </div>
        <div class="box">
          <a-row type="flex" justify="center">
            <a-col :span="7"></a-col>
            <a-col :span="3" class="left-txt">受电弓：</a-col>
            <a-col :span="2">
              <div class="border">{{ saveDurationPantograph }}</div>
            </a-col>
            <a-col :span="3" class="right-txt">天</a-col>
            <a-col :span="9"></a-col>
          </a-row>
          <a-row type="flex" justify="center" style="margin-top: 10px">
            <a-col :span="7"></a-col>
            <a-col :span="3" class="left-txt">车厢：</a-col>
            <a-col :span="2">
              <div class="border">{{ saveDurationCarriage }}</div>
            </a-col>
            <a-col :span="3" class="right-txt">天</a-col>
            <a-col :span="9"></a-col>
          </a-row>
          <a-row type="flex" justify="center" style="margin-top: 10px">
            <a-col :span="7"></a-col>
            <a-col :span="3" class="left-txt">板卡：</a-col>
            <a-col :span="2">
              <div class="border">{{ saveDurationCard }}</div>
            </a-col>
            <a-col :span="3" class="right-txt">天</a-col>
            <a-col :span="9"></a-col>
          </a-row>
        </div>
      </div>
      <template #footer>
        <a-button @click="onStorageConfigResetBtnClicked('未找到相关update接口')">重置</a-button>
        <a-button @click="storageConfigModalVisible=false">取消</a-button>
        <a-button @click="onStorageConfigConfirmBtnClicked">确定</a-button>
      </template>
    </a-modal>
    <!--内容未确定-->
    <a-modal
        title="摄像头信息"
        centered
        :width="800"
        :visible="false"
        :closable="false"
    >
      <template #footer>
        <a-button @click="modal1Visible=false">确定</a-button>
      </template>
    </a-modal>
    <!--文件导出modal-->
    <a-modal
        title="文件导出"
        centered
        :width="800"
        :visible="downloadRecordModalVisible"
        :closable="false"
    >
      <div style="margin-top: 30px">
        <div
            style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
          时间范围：
        </div>
        <div class="box">
          <a-row>
            <a-col :span="4" class="center-txt" style="text-align: right">开始时间：</a-col>
            <a-col :span="20">
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
          </a-row>
          <a-row style="margin-top: 10px">
            <a-col :span="4" class="center-txt" style="text-align: right">结束时间：</a-col>
            <a-col :span="20">
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
          </a-row>
        </div>
      </div>

      <div style="margin-top: 30px">
        <div
            style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
          导出类型：
        </div>
        <div class="box">
          <a-radio-group :value="deviceType" @change="onRadioSelected">
            <a-row>
              <a-col>
                <a-radio :value="0">全部</a-radio>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-radio :value="1">摄像头</a-radio>
                <a-select
                    :value="supervise.name"
                    class="select"
                    @change="onSuperviseSelectChange">
                  <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
                  <a-select-option
                      v-for="(item,index) of superviseList"
                      :key="index"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                <a-radio :value="2" style="margin-left: 10px">监视物</a-radio>
                <a-select
                    :value="device.name"
                    class="select"
                    @change="onDeviceSelectChange">
                  <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
                  <a-select-option
                      v-for="(item,index) of deviceList"
                      :key="index"
                  >
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-radio-group>
        </div>
      </div>
      <div style="flex-direction: row; justify-content: center;margin-top: 20px">
        <span>导出路径：</span>
        <a-input style="width: 250px;margin-right: 10px" :value="inputPath"></a-input>
        <a-button @click="test">浏览</a-button>
      </div>

      <template #footer>
        <a-button @click="onDownloadRecordResetBtnClicked">重置</a-button>
        <a-button @click="onDownloadRecordCancelBtnClicked">取消</a-button>
        <a-button @click="onDownloadRecordBtnClicked">导出</a-button>
      </template>
    </a-modal>
  </div>

</template>

<script>
import {request} from "@/network/request";
import moment from 'moment'
import PageTitle from "@/components/PageTitle";

function isNotEmpty(param) {
  return param && param != ''
}

const columns = [
  {
    title: '编号',
    dataIndex: 'number',
    width: '70px',
    key: 'number',
    align: 'center'
    // scopedSlots: {customRender: 'name'},
  },
  {
    title: '磁盘号',
    // className: 'alarmTime',
    dataIndex: 'diskNo',
    key: 'diskNo',
    align: 'center'
  },
  {
    title: '类型',
    dataIndex: 'typeName',
    key: 'typeName',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    align: 'center'
  },
  {
    title: '总容量（GB）',
    dataIndex: 'capacity',
    key: 'capacity',
    align: 'center'
  },
  {
    title: '已用空间（GB）',
    dataIndex: 'usedCapacity',
    key: 'usedCapacity',
    align: 'center'
  },
  {
    title: '剩余空间',
    dataIndex: 'freeCapacity',
    key: 'freeCapacity',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '200px',
    key: 'operation',
    align: 'center',
    scopedSlots: {customRender: 'operation'}
  }
];
const tableData = [
  {
    key: '1',
    number: '1',
    diskNo: '01',
    type: 1,
    typeName: '外挂',
    status: '正常',
    capacity: '2048',
    usedCapacity: '512',
    freeCapacity: '1536',
    operation: ''
  },
  {
    key: '2',
    number: '2',
    diskNo: '01',
    type: 0,
    typeName: '本地',
    status: '正常',
    capacity: '2048',
    usedCapacity: '512',
    freeCapacity: '1536',
    operation: ''
  },

];
export default {
  name: "StorInfo",
  components: {
    PageTitle,
  },
  data() {
    return {
      columns,
      tableData,
      storageConfigModalVisible: false,
      downloadRecordModalVisible: false,

      inputPath:'c:\\users\\exportfile',

      diskNoList: ['0',],
      diskNo: '0',

      saveInterval: 10,//文件保持间隔，单位：分钟
      saveDirectory: '本地',//	保存位置
      saveDurationPantograph: 7,//受电弓视频存储时长，单位: 天
      saveDurationCarriage: 30,//车厢视频存储时长，单位: 天
      saveDurationCard: 15,//车厢视频存储时长，单位: 天

      saveIntervalList: [10,],//文件保持间隔，单位：分钟
      saveDirectoryList: ['本地',],//	保存位置

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

      deviceType: 0,
      deviceId: undefined,

      superviseList: [],
      supervise: {name: '', id: undefined},

      deviceList: [],
      device: {name: '', deviceId: undefined},

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

      statusAll: true,
      statusNormal: false,
      statusTrouble: false,
      status: undefined,

      typeAll: true,
      typeLocal: false,
      typeExternal: false,
      type: undefined,
    }
  },
  methods: {
    onDownloadRecordImgClicked() {
      this.downloadRecordModalVisible = true;

      this.getSuperviseList();
      this.getDeviceList();
    },
    getStorageConfigInfo() {
      request({
        url: '/api/storage/config',
        method: 'get',
      }).then(res => {
        if (res.code == 0) {
          if (res.data.saveInterval) this.saveInterval = res.data.saveInterval;
          if (res.data.saveDirectory) this.saveDirectory = res.data.saveDirectory;
          if (res.data.saveDurationPantograph) this.saveDurationPantograph = res.data.saveDurationPantograph;
          if (res.data.saveDurationCarriage) this.saveDurationCarriage = res.data.saveDurationCarriage;
          if (res.data.saveDurationCard) this.saveDurationCard = res.data.saveDurationCard;
        }
      }).catch(err => {
      })
    },
    onStorageConfigResetBtnClicked(msg) {
      //todo 接口未找到
      this.showMessage(msg)
    },
    onStorageConfigConfirmBtnClicked() {
      const params = {
        storageConfig: {
          saveInterval: this.saveInterval,
          saveDirectory: this.saveDirectory,
          saveDurationPantograph: this.saveDurationPantograph,
          saveDurationCarriage: this.saveDurationCarriage,
          saveDurationCard: this.saveDurationCard
        }
      };
      reques({
        url: '/api/storage/config',
        method: 'put',
        data: JSON.parse(JSON.stringify(params)),//todo storageConfig
      }).then(res => {
        if (res.code == 0) {
          this.storageConfigModalVisible = false;
        }
      }).catch(err => {
        this.$message.warn('网络请求错误')
      })
    },
    /**
     *
     * @param st status or type
     * @param code
     */
    changeBtnAcive(st, code) {
      if (st == 0) {//status   空 全部，0 正常，1 故障
        this.status = code;
        if (code == undefined) {
          this.statusAll = true;
          this.statusNormal = this.statusTrouble = false;
        } else if (code === 0) {
          this.statusNormal = true;
          this.statusAll = this.statusTrouble = false;
        } else if (code === 1) {
          this.statusTrouble = true;
          this.statusAll = this.statusNormal = false;
        }
      } else if (st == 1) {//type  空 全部，0 本地，1 外挂
        this.type = code;
        if (code == undefined) {
          this.typeAll = true;
          this.typeLocal = this.typeExternal = false;
        } else if (code === 0) {
          this.typeLocal = true;
          this.typeAll = this.typeExternal = false;
        } else if (code === 1) {
          this.typeExternal = true;
          this.typeAll = this.typeLocal = false;
        }
      }
    },
    onPaginationClicked(e) {
      // console.log(e)
      this.pagination = e
    },
    onRadioChange(e) {
      console.log('radio checked', e.target.value);
    },
    onStorConfBtnClicked() {
      this.getStorageConfigInfo()
      this.storageConfigModalVisible = true;
    },
    showMessage(msg) {
      this.$message.info(msg)
    },
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
    onRadioSelected(e) {
      this.deviceType = e.target.value;
      if (e.target.value == 0) {//全部
        // todo
      } else if (e.target.value == 1) {//摄像头
        this.deviceId = this.device.deviceId;
      } else if (e.target.value == 2) {//监视物
        this.deviceId = this.supervise.type;
      }
    },
    onDownloadRecordResetBtnClicked() {
      //todo
      this.reset();
    },
    onDownloadRecordCancelBtnClicked() {
      this.downloadRecordModalVisible = false;

      this.reset();
    },
    reset(){
      this.startDateString = '';
      this.startDate = null;
      this.startTimeString = '';
      this.startTime = null;
      this.endDateString = '';
      this.endDate = null;
      this.endTimeString = '';
      this.endTime = null;

      this.deviceType = 0;
      this.deviceId = undefined;

      this.superviseList = [];
      this.supervise = {name: '', id: undefined};

      this.deviceList = [];
      this.device = {name: '', deviceId: undefined};
    },
    onDownloadRecordBtnClicked() {
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
        this.downloadRecord();
      }
    },
    downloadRecord() {
      const params = {};
      params.startTime = this.startDateString + ' ' + this.startTimeString;
      params.endTime = this.endTimeString + ' ' + this.endTimeString;
      params.deviceType = this.deviceType;
      params.deviceId = this.deviceId;
      request({
        url: '/api/record/download',
        method: 'get',
        params,
      }).then(res => {
        if (res.code == 0) {
          const downloadUrl=res.data;
          request({
            url:downloadUrl
          }).then(res=>{
            if(res.code==0){
              this.$message.info('下载成功')
            }
          }).catch(err=>{})
        }
      }).catch(err => {
        this.$message.warn('网络请求失败')
      })

    },
    getTableData() {
      request({
        url: '/api/storage/disk/list',
        params: {
          page: this.pagination.current,
          count: this.count,
          diskNo: this.diskNo,
          status: this.status,
          type: this.type,
        }
      }).then(res => {
        if (res.code == 0) {
          this.diskNoList = [];
          this.diskNoList[0] = res.data.diskNo;
          // "diskNo": "",
          // "type": 0,
          // "status": 0,
          // "capacity": 0,
          // "usedCapacity": 0

          // key: '1',
          // number: '1',
          // diskNo: '01',
          // type: 0,
          // typeName: '磁盘',
          // status: '正常',
          // capacity: '2048',
          // usedCapacity: '512',
          // freeCapacity: '1536',
          // operation: ''

          const info = res.data;
          info.key = info.number = 1;
          if (info.type && info.type == 0) {
            info.typeName = '本地';
          } else if (info.type && info.type == 1) {
            info.typeName = '外挂';
          }
          this.tableData.push(info)
        }
      }).catch(err => {
      })
    },
    onDiskNoSelectChange(index, option) {
      this.diskNo = this.diskNoList[index];
    },
    onSuperviseSelectChange(index, option) {
      this.supervise = this.superviseList[index];
    },
    onDeviceSelectChange(index, option) {
      this.device = this.deviceList[index];
    },
    onSaveIntervalSelectChange(index, option) {
      this.saveInterval = this.saveIntervalList[index];
    },
    onSaveDirectorySelectChange(index, option) {
      this.saveDirectory = this.saveDirectoryList[index];
    },
    initDisk(value, record, index) {
      const params = {};
      params.diskNo = record.diskNo;
      request({
        url: '/api/storage/disk/initialize',
        method: 'put',
        data: JSON.parse(JSON.stringify(params)),
      }).then(res => {
        if (res.code == 0) {
          this.$message.info('初始化成功')
        }
      }).catch(err => {
        this.$message.info('初始化失败')
      })
    },
    resetBtnClicked() {
      this.changeBtnAcive(0, undefined);
      this.changeBtnAcive(1, undefined);

      this.statusAll = true;
      this.statusNormal = false;
      this.statusTrouble = false;
      this.status = undefined;

      this.typeAll = true;
      this.typeLocal = false;
      this.typeExternal = false;
      this.type = undefined;
    },
    //  /api/supervise/list
    getSuperviseList() {
      request({
        url: '/api/supervise/list',
        method: 'get',
      }).then(res => {
        if (res.code == 0) {
          this.superviseList = [];
          this.superviseList.push(res.data);
        }
      }).catch(err => {
        this.$message.warn('网络请求失败！')
      })
    },
    // /api/device/query/devices
    getDeviceList() {
      request({
        url: '/api/device/query/devices',
        method: 'get',
        params: {
          page: 1,
          count: 200,
        }
      }).then(res => {
        if (res.code == 0) {
          this.deviceList = [];
          this.deviceList = res.data.list;
        }
      }).catch(err => {
        this.$message.warn('网络请求失败！')
      })
    },
    test(){
      this.$message.info('更改下载路径需在浏览器设置')
    },
  },
  created() {

  },
}
</script>

<style scoped>
.img {
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
}

.select {
  width: 200px;
}

.left-txt {
  margin: 5px 0 0 0;
  text-align: right;
}

.right-txt {
  margin: 5px 0 0 0;
  text-align: left;
}

.border {
  border: 2px solid darkgray;
  height: 30px;
  margin-right: 3px;
  text-align: center;
  padding-top: 3px;
}

.card-item {
  margin: 15px 0 3px 0;
}

.btn {
  width: 85px;
  margin: 0 3px;
}

.btn1 {
  background-color: #3E64AD;
  color: white;
}

.btn2 {
  background-color: orange;
  color: white;
}

.table-title {
  margin: 10px 0 10px 0;
}

.box {
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 35px 0 30px 55px;
}

.center-txt {
  margin-top: 6px;
}

.picker {
  width: 180px;
}

.select {
  width: 200px;
}
</style>