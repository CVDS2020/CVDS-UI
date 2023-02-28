<template>
  <div>
    <page-title title="摄像头信息"></page-title>
    <a-card class="card">
      <a-row class="">
        <a-col :span="2" class="left-txt">车厢号：</a-col>
        <a-col :span="5">
          <a-input class="select" v-model="inputCarriageNo" placeholder="请输入车厢号"></a-input>
        </a-col>
        <a-col :span="2" class="left-txt">监视类型：</a-col>
        <a-col :span="7">
          <a-select
              :value="selectedSuperviseType.name"
              class="select"
              @change="onSelectChange"
          >
            <!--:key只能绑定string，number.不能绑定对象  :value可以绑定对象-->
            <a-select-option
                v-for="(item,index) of superviseTypeList"
                :key="index"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="6"></a-col>
        <a-col :span="2">
          <a-button @click="onResetClicked">重置</a-button>
        </a-col>
      </a-row>
      <a-row class="card-item">
        <a-col :span="2" class="left-txt">在线状态：</a-col>
        <a-col :span="5">
          <a-button :class="{active:isAllActive}" style="margin-right: 3px" @click="changeBtnAcive(-1)">全部</a-button>
          <a-button :class="{active:isOnlineActive}" style="margin-right: 3px" @click="changeBtnAcive(1)">在线</a-button>
          <a-button :class="{active:isOfflineActive}" @click="changeBtnAcive(0)">离线</a-button>
        </a-col>
        <a-col :span="2" class="left-txt">关键字：</a-col>
        <a-col :span="7">
          <a-input v-model="keyword" placeholder="请输入关键字"></a-input>
        </a-col>
        <a-col :span="6"></a-col>
        <a-col :span="2">
          <a-button @click="onQueryClicked">查询</a-button>
        </a-col>
      </a-row>
    </a-card>
    <!--暂时取消该功能-->
    <!--    <div style="display: flex; flex-direction: row-reverse;margin-top: 15px">-->
    <!--      <a-button style="background-color: #666666;color: white">批量导入</a-button>-->
    <!--    </div>-->
    <a-row class="table-title">
      <a-col :span="4"><span>摄像头列表[共{{ tableData.length }}条]</span></a-col>
      <a-col :span="14"></a-col>
      <a-col :span="6" style="display: flex; flex-direction: row-reverse">
        <button class="btn" style="background-color: gray" @click="onRefreshBtnClicked">
          <img class="btn-icon" src="../assets/img/icon-btn-refresh.png" alt="">刷新
        </button>
        <a-popconfirm
            placement="bottomRight"
            ok-text="确定"
            cancel-text="取消"
            :visible="popconfirmVisiable"
            @confirm="onDeleteComfirm"
            @cancel="onDeleteCancel">
          <template #title>
            <p>是否删除当前摄像头信息</p>
          </template>
          <button class="btn" style="background-color: gray " @click="onDeleteBtnClicked">
            <img class="btn-icon" src="../assets/img/icon-btn-delete.png" alt="">删除
          </button>
        </a-popconfirm>
        <button class="btn" style="background-color:#158BCD" @click="onAddBtnClicked('编辑摄像头')">
          <img class="btn-icon" src="../assets/img/icon-btn-edit.png" alt="">编辑
        </button>
        <button class="btn" style="background-color: green" @click="onAddBtnClicked('添加摄像头')">
          <img class="btn-icon" src="../assets/img/icon-btn-add.png" alt="">添加
        </button>
      </a-col>

    </a-row>
    <a-table :columns="columns"
             :data-source="tableData"
             bordered
             @change="onPaginationClicked"
             :pagination="pagination"
             :row-selection="{
                type:'radio',
                hideDefaultSelections:true,//去掉『全选』『反选』两个默认选项
                selectedRowKeys: selectedRowRadioKeys,
                onChange: onSelectRadioChange}">
      <template #onlineText="value,record,index">
        <div>
          <span v-if="value==='在线'" style="color: green">{{ value }}</span>
          <span v-else-if="value==='离线'" style="color: darkgray">{{ value }}</span>
        </div>
      </template>
      <template #superviseTargetStatusText="value,record,index">
        <div>
          <span v-if="value==='正常'" style="color: green">{{ value }}</span>
          <span v-else style="color: red">{{ value }}</span>
        </div>
      </template>
      <template #operation="value,record,index">
        <div>
          <img class="img" src="../assets/img/icon-view-cam-info.png" alt=""
               @click="onCamInfoImgClicked(value,record,index)">
          <img class="img" src="../assets/img/icon-conf-cam-info.png" alt=""
               @click="onVideoConfigImgClicked(value,record,index)">
          <a-popconfirm
              title="请选择重启或关闭"
              ok-text="关闭"
              cancel-text="重启"
              @confirm="onRemoteCtrlClicked(value,record,index,0)"
              @cancel="onRemoteCtrlClicked(value,record,index,1)"
              :disabled="record.onlineText==='离线'"
          >
            <img v-if="record.onlineText==='在线'" class="img" src="../assets/img/icon-power-on.png" alt="">
            <img v-else-if="record.onlineText==='离线'" class="img" src="../assets/img/icon-power-off.png" alt="">
          </a-popconfirm>
        </div>
      </template>
      <!--      <template #name="{ record }">              //:data数据-->
      <!--        <a-button type="primary" ghost @click="hide(record)">编辑</a-button>-->
      <!--      </template>-->
    </a-table>

    <!--所有modal独立显示-->
    <!--添加摄像头modal与编辑摄像头modal 共用-->
    <a-modal
        :title="modalTitle"
        centered
        :width="800"
        :visible="addModalVisible"
        :closable="false"
    >
      <div>
        <a-row>
          <a-col :span="5" class="left-txt">摄像头名称：</a-col>
          <a-col :span="7">
            <a-input class="select" v-model="add.addInputName"></a-input>
          </a-col>
          <a-col :span="5" class="left-txt">监视物类型：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="add.superviseTargetTypeName"
                @change="onAddSuperviseTypeSelectChange"
            >
              <a-select-option
                  v-for="(item,index) of superviseList"
                  :key="index">
                {{ item.typeName }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>

        <a-row class="card-item">
          <a-col :span="5" class="left-txt">所在车厢：</a-col>
          <a-col :span="7">
            <!--
            :value="add.carriageNo+''"      +''为了解决未知错误
            superviseList: [{name: '受电弓1', carriageNo: 1, id: 1}, {name: '受电弓2', carriageNo:2, id:2}, {name: '受电弓3', carriageNo:3, id:3}],//监视物、所在车厢下拉选择框数据源
            会发生显示错误，原因未知
            -->
            <a-select
                class="select"
                :value="add.carriageNo+''"
                @change="onAddCarriageNoSelectChange">
              <a-select-option
                  v-for="(item,index) of superviseList"
                  :key="index"
              >
                {{ item.carriageNo }}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5" class="left-txt">监视物：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="add.superviseTargetName"
                @change="onAddSuperviseNameSelectChange"
            >
              <a-select-option
                  v-for="(item,index) of superviseList"
                  :key="index"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>

        <a-row class="card-item">
          <a-col :span="5" class="left-txt">IP地址：</a-col>
          <a-col :span="7">
            <a-input class="select" v-model="add.addInputIp"></a-input>
          </a-col>
          <a-col :span="5" class="left-txt">摄像头位置：</a-col>
          <a-col :span="7">
            <a-input class="select" v-model="add.addInputPosition"></a-input>
          </a-col>
        </a-row>
      </div>
      <template #footer>
        <button class="modal-footer-btn" @click="onModalClean()">清空</button>
        <button class="modal-footer-btn" @click="onAddModalCancel">取消</button>
        <button class="modal-footer-btn" style="background-color:green" @click="onAddModalConfirm">确定</button>
      </template>
    </a-modal>
    <!--摄像头信息modal-->
    <a-modal
        title="摄像头信息"
        centered
        :width="800"
        :visible="camInfoModalVisible"
        :closable="false"
    >
      <div>
        <a-row>
          <a-col :span="5" class="left-txt">摄像头名称：</a-col>
          <a-col :span="7">
            <a-input disabled="true" class="select" v-model="add.addInputName"></a-input>
          </a-col>
          <a-col :span="5" class="left-txt">监视物类型：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="add.superviseTargetTypeName"
                disabled/>
          </a-col>
        </a-row>

        <a-row class="card-item">
          <a-col :span="5" class="left-txt">所在车厢：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="add.carriageNo+''"
                disabled/>
          </a-col>
          <a-col :span="5" class="left-txt">监视物：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="add.superviseTargetName"
                disabled/>
          </a-col>
        </a-row>

        <a-row class="card-item">
          <a-col :span="5" class="left-txt">IP地址：</a-col>
          <a-col :span="7">
            <a-input disabled="true" class="select" v-model="add.addInputIp"></a-input>
          </a-col>
          <a-col :span="5" class="left-txt">摄像头位置：</a-col>
          <a-col :span="7">
            <a-input disabled="true" class="select" v-model="add.addInputPosition"></a-input>
          </a-col>
        </a-row>

        <a-row class="card-item">
          <a-col :span="5" class="left-txt">视频编码：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="videoConfig.encoder"
                disabled
            />
          </a-col>
          <a-col :span="5" class="left-txt">分辨率：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="videoConfig.width+'*'+videoConfig.height"
                disabled
            />
          </a-col>
        </a-row>
        <div style="margin-top: 30px">
          <div
              style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
            画面设置：
          </div>
          <div style="border: 1px solid #e6e6e6;border-radius: 3px">
            <a-row class="card-item">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">亮度：</a-col>
              <a-col :span="13">
                <a-progress :percent="videoConfig.brightness" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.brightness" class="percent-text"></a-input>
              </a-col>
            </a-row>

            <a-row class="card-item">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">对比：</a-col>
              <a-col :span="13">
                <a-progress :percent="videoConfig.contrast" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.contrast" class="percent-text"></a-input>
              </a-col>
            </a-row>

            <a-row class="card-item">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">饱和度：</a-col>
              <a-col :span="13">
                <a-progress :percent="videoConfig.saturation" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.saturation" class="percent-text"></a-input>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <template #footer>
        <a-button @click="onCamInfoBtnClicked">确定</a-button>
      </template>
    </a-modal>
    <!--视频图像设置modal-->
    <a-modal
        title="视频图像设置"
        centered
        :width="800"
        :visible="videoConfigModalVisible"
        :closable="false"
    >
      <div>
        <a-row class="card-item">
          <a-col :span="5" class="left-txt">视频编码：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="videoConfig.encoder"
            />
          </a-col>
          <a-col :span="5" class="left-txt">分辨率：</a-col>
          <a-col :span="7">
            <a-select
                class="select"
                :value="videoConfig.width+'*'+videoConfig.height"
            />
          </a-col>
        </a-row>

        <div style="margin-top: 30px">
          <div
              style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
            画面设置：
          </div>
          <div style="border: 1px solid #e6e6e6;border-radius: 3px">
            <a-row class="card-item" style="margin-top: 30px">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">亮度：</a-col>
              <a-col :span="13">
                <progress-bar :percent="videoConfig.brightness" :show-slider="true" :show-per-text="false"
                              @percentChange="onBrightnessPercentChange"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.brightness" class="percent-text"></a-input>
              </a-col>
            </a-row>

            <a-row class="card-item">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">对比：</a-col>
              <a-col :span="13">
                <progress-bar :percent="videoConfig.contrast" :show-slider="true" :show-per-text="false"
                              @percentChange="onContrastPercentChange"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.contrast" class="percent-text"></a-input>
              </a-col>
            </a-row>

            <a-row class="card-item">
              <a-col :span="3"></a-col>
              <a-col :span="4" class="progress-left-txt">饱和度：</a-col>
              <a-col :span="13">
                <progress-bar :percent="videoConfig.saturation" :show-slider="true" :show-per-text="false"
                              @percentChange="onSaturationPercentChange"/>
              </a-col>
              <a-col :span="4">
                <a-input disabled="true" :value="videoConfig.saturation" class="percent-text"></a-input>
              </a-col>
            </a-row>
            <a-col :span="19"></a-col>
            <a-col :span="5">
              <button style="margin: 30px 0 20px 0;border:1px solid #e6e6e6;border-radius: 3px;width: 90px;height: 35px"
                      @click="onVideoConfigDefaultValueBtnClicked">恢复默认值
              </button>
            </a-col>

          </div>
        </div>

      </div>
      <template #footer>
        <a-button @click="onVideoConfigResetBtnClicked">重置</a-button>
        <a-button @click="onVideoConfigCancelBtnClicked">取消</a-button>
        <a-button @click="onVideoConfigConfirmBtnClicked">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import {request} from "@/network/request";
import ProgressBar from "@/components/ProgressBar";
import PageTitle from "@/components/PageTitle";

function isNotEmpty(param) {
  return param && param != ''
}

const columns = [
  {
    title: '编号',
    key: 'number',
    dataIndex: 'number',
    width: '70px',
    align: 'center'
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '100px',
    align: 'center'
  },
  {
    title: '型号',
    dataIndex: 'model',
    key: 'model',
    align: 'center'
  },
  {
    title: '监视类型',
    key: 'superviseTargetTypeName',
    dataIndex: 'superviseTargetTypeName',
    align: 'center'
  },
  {
    title: '车厢号',
    key: 'carriageNo',
    dataIndex: 'carriageNo',
    align: 'center',
    sorter: (a, b) => a.carriageNo - b.carriageNo,
  },
  {
    title: '摄像头位置',
    key: 'position',
    dataIndex: 'position',
    align: 'center'
  },
  {
    title: 'IP地址',
    key: 'ip',
    dataIndex: 'ip',
    align: 'center'
  },
  {
    title: '在线/离线',
    key: 'onlineText',
    dataIndex: 'onlineText',
    align: 'center',
    scopedSlots: {customRender: 'onlineText'},
    sorter: (a, b) => a.onlineText > b.onlineText,
  },
  {
    title: '监视物状态',
    key: 'superviseTargetStatusText',
    dataIndex: 'superviseTargetStatusText',
    align: 'center',
    scopedSlots: {customRender: 'superviseTargetStatusText'},
    sorter: (a, b) => a.superviseTargetStatus - b.superviseTargetStatus,
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '170px',
    scopedSlots: {customRender: 'operation'},
    align: 'center'
  }
];
const tableData = [
  // id	数据库自增ID	integer
  // deviceId	设备国标编号	string
  // name	设备名	string
  // superviseTargetType	监视物类型	integer
  // superviseTargetTypeName	监视物类型名称	string
  // superviseTargetId	监视物ID	integer
  // superviseTargetName	监视物名称	string
  // carriageNo	车厢号	integer
  // position	摄像机位置	string
  // ip	摄像机IP	string
  // online	摄像机在线状态, 0 离线, 1 在线	string
  // superviseTargetStatus	监视物状态, 0-正常，转向架异常（1-温度异常，2-检测到异物，3-部件缺失），受电弓姿态异常（100-降弓，101-升弓），受电弓实体异常（201-受电弓燃弧、202-受电弓异物、203-受电弓变形、204-右弓角缺失、205-左弓角缺失），受电弓温度异常（300-受电弓温度异常，statusText字段补充温度范围）	integer
  // superviseTargetStatusText 监视物状态描述
  {
    key: 1,
    number: 1,
    name: '摄像头01',
    model: '',
    superviseTargetType: 1,
    superviseTargetTypeName: '受电弓',
    superviseTargetId: 1,
    superviseTargetName: '受电弓1',
    carriageNo: 1,
    position: '受电弓位置01',
    ip: '192.168.1.1',
    onlineText: '在线',
    superviseTargetStatusText: '正常',
    operation: '',
  },
  {
    key: 2,
    number: 2,
    name: '摄像头02',
    model: '',
    superviseTargetType: 2,
    superviseTargetTypeName: '受电弓',
    superviseTargetId: 2,
    superviseTargetName: '受电弓2',
    carriageNo: 2,
    position: '受电弓位置01',
    ip: '192.168.1.2',
    onlineText: '在线',
    superviseTargetStatusText: '正常',
    operation: ''
  },
  {
    key: 3,
    number: 3,
    name: '摄像头03',
    model: '',
    superviseTargetType: 3,
    superviseTargetTypeName: '受电弓3',
    superviseTargetId: 3,
    superviseTargetName: '受电弓3',
    carriageNo: 3,
    position: '受电弓位置01',
    ip: '192.168.1.3',
    onlineText: '在线',
    superviseTargetStatusText: '正常',
    operation: ''
  },
  {
    key: 4,
    number: 4,
    name: '摄像头04',
    model: '',
    superviseTargetType: 4,
    superviseTargetTypeName: '受电弓4',
    superviseTargetId: 4,
    superviseTargetName: '受电弓4',
    carriageNo: 4,
    position: '受电弓位置01',
    ip: '192.168.1.4',
    onlineText: '在线',
    superviseTargetStatusText: '正常',
    operation: ''
  },
  {
    key: 5,
    number: 5,
    name: '摄像头05',
    model: '',
    superviseTargetType: 5,
    superviseTargetTypeName: '受电弓5',
    superviseTargetId: 5,
    superviseTargetName: '受电弓5',
    carriageNo: 5,
    position: '受电弓位置01',
    ip: '192.168.1.5',
    onlineText: '离线',
    superviseTargetStatusText: '异常',
    operation: ''
  },
  {
    key: 6,
    number: 6,
    name: '摄像头06',
    model: '',
    superviseTargetType: 6,
    superviseTargetTypeName: '受电弓6',
    superviseTargetId: 6,
    superviseTargetName: '受电弓6',
    carriageNo: 6,
    position: '受电弓位置01',
    ip: '192.168.1.6',
    onlineText: '在线',
    superviseTargetStatusText: '正常',
    operation: ''
  },

];
export default {
  name: "CamInfo",
  components: {
    ProgressBar,
    PageTitle
  },
  data() {
    return {
      columns,
      tableData,
      modalTitle: '',
      addModalVisible: false,
      popconfirmVisiable: false,
      camInfoModalVisible: false,
      videoConfigModalVisible: false,
      isAllActive: true,
      isOnlineActive: false,
      isOfflineActive: false,
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
      /*   /api/device/query/devices请求参数    start   */
      inputCarriageNo: undefined,//车厢号
      selectedSuperviseType: {name: '', type: undefined},//监视类型  name用于select中显示，此处默认值设设置为''，type用于网络请求时的参数
      online: true,//在线状态
      keyword: undefined,//关键字
      isOnlineHasNextPage: true,
      isOffLineHasNextPage: true,
      /*   /api/device/query/devices请求参数    end   */

      superviseTypeList: [{type: 4, name: '受电弓'}, {type: 5, name: '转向架'}, {type: 6, name: '车厢'}],
      selectedRowRadioKeys: [],//所选中checkbox或radio的key
      sortedInfo: undefined,
      //添加摄像头相关数据
      superviseList: [
        {typeName: '受电弓', name: '受电弓1', carriageNo: 1, id: 1},
        {typeName: '转向架', name: '转向架2', carriageNo: 2, id: 2},
        {typeName: '车厢', name: '车厢3', carriageNo: 3, id: 3}],//监视物类型、监视物、所在车厢下拉选择框数据源
      add: {
        addInputName: '',//input摄像头名称
        addInputIp: '',//inputIP
        addInputPosition: '',//input摄像头位置
        superviseTargetType: undefined,//监视物类型code
        superviseTargetTypeName: '',//监视物类型名称
        superviseTargetId: undefined,//监视物ID
        superviseTargetName: '',//监视物名称
        carriageNo: '',//所在车厢
        id: undefined,//该值对应值为数据库ID
        deviceId: undefined,//该值对应数值为设备国标ID
      },
      videoConfig: {
        encoder: 'H.264',
        width: 1920,
        height: 1080,
        brightness: 70,//亮度
        contrast: 50,//对比度
        saturation: 30//饱和度
      },
      tempVideoConfig: {},
    }
  },
  methods: {
    /**
     * 获取监视物类型列表
     * 数据作为页面中"监视类型"select数据源
     */
    getSuperviseTypeList() {
      request({
        url: '/api/supervise/type/list',
      }).then(res => {
        if (res.code == 0) {
          const resData = res.data;
          this.superviseTypeList = resData;
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    getDevicesTableData() {
      //判断后端是否有新数据，无新数据则不进行网络请求
      if (this.online && !this.isOnlineHasNextPage) {
        return;
      }
      if (!this.online && !this.isOfflineHasNextPage) {
        return;
      }

      const params = {};
      //必传参数
      params.page = this.pagination.current ;
      params.count = this.count;
      //非必传参数
      if (isNotEmpty(this.keyword)) {
        params.keyword = this.keyword;
      }
      if (isNotEmpty(this.online)) {
        params.online = this.online;
      }
      if (isNotEmpty(this.inputCarriageNo)) {
        params.carriageNO = this.inputCarriageNo;
      }
      if (isNotEmpty(this.selectedSuperviseType.type)) {
        params.superviseTargetType = this.selectedSuperviseType.type;
      }
      request({
        url: '/api/device/query/devices',
        params,
      }).then(res => {
            //假数据
            // res = {
            //   "code": 0,
            //   "data": {
            //     "endRow": 0,
            //     "hasNextPage": false,
            //     "hasPreviousPage": false,
            //     "isFirstPage": true,
            //     "isLastPage": true,
            //     "list": [{
            //       "id": 0,
            //       "deviceId": "",
            //       "name": "",
            //       "superviseTargetType": 0,
            //       "superviseTargetTypeName": "",
            //       "superviseTargetId": 0,
            //       "superviseTargetName": "",
            //       "carriageNo": 0,
            //       "position": "",
            //       "ip": "",
            //       "online": "",
            //       "superviseTargetStatus": 0,
            //       "superviseTargetStatusText": ""
            //     }],
            //     "navigateFirstPage": 0,
            //     "navigateLastPage": 0,
            //     "navigatePages": 8,
            //     "navigatepageNums": [],
            //     "nextPage": 0,
            //     "pageNum": 1,
            //     "pageSize": 0,
            //     "pages": 0,
            //     "prePage": 0,
            //     "size": 0,
            //     "startRow": 0,
            //     "total": 0
            //   },
            //   "message": "成功"
            // }
            try {
              if (res.code == 0) {
                const resData = res.data;
                const resTableData = resData.list;
                const len = resTableData.length;
                if (resData.isFirstPage) this.tableData = [];//第一次请求时清空
                //确定是否有下一页数据
                if (this.online) {
                  this.isOnlineHasNextPage = resData.hasNextPage;
                } else {
                  this.isOfflineHasNextPage = resData.hasNextPage;
                }
                //表格中要求必须字段
                // key: 6,
                // number: 6,
                // name: '摄像头06',
                // model: '',
                // superviseTargetType: 6,
                // superviseTargetTypeName: '受电弓6',
                // superviseTargetId: 6,
                // superviseTargetName: '受电弓6',
                // carriageNo: 6,
                // position: '受电弓位置01',
                // ip: '192.168.1.6',
                // onlineText: '在线',
                // superviseTargetStatusText: '正常',
                // operation: ''

                //接口返回数据结构
                // "id": 0,
                // "deviceId": "",
                // "name": "",
                // "superviseTargetType": 0,
                // "superviseTargetTypeName": "",
                // "superviseTargetId": 0,
                // "superviseTargetName": "",
                // "carriageNo": 0,
                // "position": "",
                // "ip": "",
                // "online": "",
                // "superviseTargetStatus": 0,
                // "superviseTargetStatusText": ""
                for (let i = 1; i <= len; i++) {
                  const info = resTableData[i - 1];
                  info.number = info.key = i;//计算key、number
                  info.model = '';//表格zhong需要显示该内容
                  info.operation = '';
                  if (info.online == 0) {
                    info.onlineText = '离线'
                  } else if (info.online == 1) {
                    info.onlineText = '在线'
                  }
                  this.tableData.push(info);
                }
                this.pagination.total = this.tableData.length;
              }
            } catch (e) {
              this.$message.error(e)
            }
          }
      ).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    getSuperviseList() {
      request({
        url: '/api/supervise/list',
      }).then(res => {
        if (res.code == 0) {
          const resData = res.data;
          this.superviseList = resData;
          //接口返回数据格式
          // "id": 0,//id
          // "name": "",//监视物名称
          // "type": 0,//监视物类型
          // "typeName": "",//监视物类型名称
          // "carriageNo": 0,//监视物所在车厢
          // "address": "",//安装位置
          // "status": 0,//状态，0-正常，转向架异常（1-温度异常，2-检测到异物，3-部件缺失），受电弓姿态异常（100-降弓，101-升弓），受电弓实体异常（201-受电弓燃弧、202-受电弓异物、203-受电弓变形、204-右弓角缺失、205-左弓角缺失），受电弓温度异常（300-受电弓温度异常，statusText字段补充温度范围）
          // "statusText": "",//安装位置
          // "description": ""//描述
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    onPaginationClicked(e) {
      this.pagination = e
    },
    refreshTable() {
      // this.isAllActive = true;
      // this.isOnlineActive = false;
      // this.isOfflineActive = false;
      // this.online = true;
      // this.keyword = null;
      // this.inputCarriageNo = null;
      // this.selectedSuperviseType = {name: ''};
      this.tableData = [];
      this.pagination = {
        current: 1,
        pageSize: 10,
        total: tableData.length,

        hideOnSinglePage: false, // 只有一页时是否隐藏分页器
        showQuickJumper: false, // 是否可以快速跳转至某页
        showSizeChanger: false // 是否可以改变pageSize
      };
      this.pagination = 1;
      this.isOnlineHasNextPage = true;
      this.isOffLineHasNextPage = true;
      this.getDevicesTableData();
    },
    onSelectRadioChange(selectedRowKeys) {
      this.selectedRowRadioKeys = selectedRowKeys;
    },
    /**
     * 根据用户选择selectedRowRadioKey设置this.add{}
     */
    setAdd() {
      const selectedRowRadioKey = this.selectedRowRadioKeys[0];
      this.add.addInputName = this.tableData[selectedRowRadioKey - 1].name;//input显示用 //网络请求参数
      this.add.addInputIp = this.tableData[selectedRowRadioKey - 1].ip;//input显示用 //网络请求参数
      this.add.addInputPosition = this.tableData[selectedRowRadioKey - 1].position;//input显示用 //网络请求参数
      this.add.superviseTargetType = this.tableData[selectedRowRadioKey - 1].superviseTargetType;//网络请求参数
      this.add.superviseTargetTypeName = this.tableData[selectedRowRadioKey - 1].superviseTargetTypeName;//select显示用
      this.add.superviseTargetId = this.tableData[selectedRowRadioKey - 1].superviseTargetId//网络请求参数
      this.add.superviseTargetName = this.tableData[selectedRowRadioKey - 1].superviseTargetName//select显示用
      this.add.carriageNo = this.tableData[selectedRowRadioKey - 1].carriageNo;//select显示用 //网络请求参数
      this.add.id = this.tableData[selectedRowRadioKey - 1].id;//select显示用 //网络请求路径
      this.add.deviceId=this.tableData[selectedRowRadioKey - 1].deviceId;
    },
    setAddVideoConfig(resData) {
      if (!resData) {
        return;
      }
      // /api/device/query/devices/{deviceId}
      if (isNotEmpty(resData.name)) this.add.addInputName = resData.name;//input显示用 //网络请求参数
      if (isNotEmpty(resData.ip)) this.add.addInputIp = resData.ip;//input显示用 //网络请求参数
      if (isNotEmpty(resData.position)) this.add.addInputPosition = resData.position;//input显示用 //网络请求参数
      if (isNotEmpty(resData.superviseTargetType)) this.add.superviseTargetType = resData.superviseTargetType;//网络请求参数
      if (isNotEmpty(resData.superviseTargetTypeName)) this.add.superviseTargetTypeName = resData.superviseTargetTypeName;//select显示用
      if (isNotEmpty(resData.superviseTargetId)) this.add.superviseTargetId = resData.superviseTargetId//网络请求参数
      if (isNotEmpty(resData.superviseTargetName)) this.add.superviseTargetName = resData.superviseTargetName//select显示用
      if (isNotEmpty(resData.carriageNo)) this.add.carriageNo = resData.carriageNo;//select显示用 //网络请求参数
      if (isNotEmpty(resData.deviceId)) this.add.id = resData.deviceId;//select显示用 //网络请求路径
      if (resData.videoConfig) {
        if (isNotEmpty(resData.videoConfig.encoder)) this.videoConfig.encoder = resData.videoConfig.encoder;
        if (isNotEmpty(resData.videoConfig.width)) this.videoConfig.width = resData.videoConfig.width;
        if (isNotEmpty(resData.videoConfig.height)) this.videoConfig.height = resData.videoConfig.height;
        if (isNotEmpty(resData.videoConfig.brightness)) this.videoConfig.brightness = resData.videoConfig.brightness;
        if (isNotEmpty(resData.videoConfig.contrast)) this.videoConfig.contrast = resData.videoConfig.contrast;
        if (isNotEmpty(resData.videoConfig.saturation)) this.videoConfig.saturation = resData.videoConfig.saturation;
      }

      // /api/device/query/videoConfig/{deviceId}
      if (isNotEmpty(resData.encoder)) this.videoConfig.encoder = resData.encoder;
      if (isNotEmpty(resData.width)) this.videoConfig.width = resData.width;
      if (isNotEmpty(resData.height)) this.videoConfig.height = resData.height;
      if (isNotEmpty(resData.brightness)) this.videoConfig.brightness = resData.brightness;
      if (isNotEmpty(resData.contrast)) this.videoConfig.contrast = resData.contrast;
      if (isNotEmpty(resData.saturation)) this.videoConfig.saturation = resData.saturation;
    },
    setViewVideoConfig(resData) {
      if (!resData) {
        return;
      }
      // /api/device/query/devices/{deviceId}
      if (isNotEmpty(resData.name)) this.add.addInputName = resData.name;//input显示用 //网络请求参数
      if (isNotEmpty(resData.ip)) this.add.addInputIp = resData.ip;//input显示用 //网络请求参数
      if (isNotEmpty(resData.position)) this.add.addInputPosition = resData.position;//input显示用 //网络请求参数
      if (isNotEmpty(resData.superviseTargetType)) this.add.superviseTargetType = resData.superviseTargetType;//网络请求参数
      if (isNotEmpty(resData.superviseTargetTypeName)) this.add.superviseTargetTypeName = resData.superviseTargetTypeName;//select显示用
      if (isNotEmpty(resData.superviseTargetId)) this.add.superviseTargetId = resData.superviseTargetId//网络请求参数
      if (isNotEmpty(resData.superviseTargetName)) this.add.superviseTargetName = resData.superviseTargetName//select显示用
      if (isNotEmpty(resData.carriageNo)) this.add.carriageNo = resData.carriageNo;//select显示用 //网络请求参数
      if (isNotEmpty(resData.id)) this.add.id = resData.id;
      if (isNotEmpty(resData.deviceId)) this.add.deviceId = resData.deviceId;
      if (resData.videoConfig) {
        if (isNotEmpty(resData.videoConfig.encoder)) this.videoConfig.encoder = resData.videoConfig.encoder;
        if (isNotEmpty(resData.videoConfig.width)) this.videoConfig.width = resData.videoConfig.width;
        if (isNotEmpty(resData.videoConfig.height)) this.videoConfig.height = resData.videoConfig.height;
        if (isNotEmpty(resData.videoConfig.brightness)) this.videoConfig.brightness = resData.videoConfig.brightness;
        if (isNotEmpty(resData.videoConfig.contrast)) this.videoConfig.contrast = resData.videoConfig.contrast;
        if (isNotEmpty(resData.videoConfig.saturation)) this.videoConfig.saturation = resData.videoConfig.saturation;
      }
    },
    setEditVideoConfig(resData) {
      if (!resData) {
        return;
      }
      // /api/device/query/videoConfig/{deviceId}
      if (isNotEmpty(resData.encoder)) this.videoConfig.encoder = resData.encoder;
      if (isNotEmpty(resData.width)) this.videoConfig.width = resData.width;
      if (isNotEmpty(resData.height)) this.videoConfig.height = resData.height;
      if (isNotEmpty(resData.brightness)) this.videoConfig.brightness = resData.brightness;
      if (isNotEmpty(resData.contrast)) this.videoConfig.contrast = resData.contrast;
      if (isNotEmpty(resData.saturation)) this.videoConfig.saturation = resData.saturation;
    },
    //主页面"监视物类型"select
    onSelectChange(index, option) {
      this.selectedSuperviseType = this.superviseTypeList[index];
    },
    onResetClicked() {
      this.inputCarriageNo = undefined;
      this.keyword = undefined;
      this.selectedSuperviseType = {name: ''};
      this.changeBtnAcive(-1);
    },
    //添加设备modal"监视物类型"select
    onAddSuperviseTypeSelectChange(index, option) {
      this.add.superviseTargetTypeName = this.superviseTypeList[index].name;
      this.add.superviseTargetType = this.superviseTypeList[index].type;
    },
    //添加设备modal"所在车厢"select
    onAddCarriageNoSelectChange(index, option) {
      this.add.carriageNo = this.superviseList[index].carriageNo;
    },
    //添加设备modal"监视物(名称)"select
    onAddSuperviseNameSelectChange(index, option) {
      this.add.superviseTargetName = this.superviseList[index].name;
      this.add.superviseTargetId = this.superviseList[index].id;
    },
    /**
     * 将add{}、videoConfig{}、modalTitle、selectedRowRadioKeys重置
     */
    onModalClean() {
      //编辑摄像头modal中，点击"取消"应恢复至用户所选择设备信息，不应做清空设置
      if(this.modalTitle==='编辑摄像头'){
        this.setAdd()
        return;
      }
      this.add.addInputName = '';
      this.add.addInputIp = '';
      this.add.addInputPosition = '';
      this.add.superviseTargetType = undefined;
      this.add.superviseTargetTypeName = '';
      this.add.superviseTargetId = undefined;
      this.add.superviseTargetName = '';
      this.add.carriageNo = '';
      this.add.id = undefined;
      this.add.deviceId = undefined;

      this.videoConfig.encoder = '';
      this.videoConfig.width = 0;
      this.videoConfig.height = 0;
      this.videoConfig.brightness = 0;
      this.videoConfig.contrast = 0;
      this.videoConfig.saturation = 0;

      this.selectedRowRadioKeys = [];//清空radio

      this.modalTitle='';
    },
    onAddModalCancel() {
      this.onModalClean();
      this.addModalVisible = false;
    },
    onAddModalConfirm() {
      if (this.add.addInputIp && this.add.addInputIp !== '') {
        let urlStr = '';
        if (this.modalTitle === '添加摄像头') {
          urlStr = '/api/device/query/devices/add';
        } else if (this.modalTitle === '编辑摄像头') {
          urlStr = '/api/device/query/devices/' + this.add.id + '/update';
        }
        const params = {
          ip: this.add.addInputIp,
        };
        if (isNotEmpty(this.add.deviceId)) params.deviceId = this.add.deviceId;
        if (isNotEmpty(this.add.addInputName)) params.name = this.add.addInputName;

        if (isNotEmpty(this.add.superviseTargetType)) params.superviseTargetType = this.add.superviseTargetType;
        if (isNotEmpty(this.add.superviseTargetId)) params.superviseTargetId = this.add.superviseTargetId;
        if (isNotEmpty(this.add.carriageNo)) params.carriageNo = this.add.carriageNo;
        if (isNotEmpty(this.add.addInputPosition)) params.position = this.add.addInputPosition;
        request({
          url: urlStr,
          method: 'post',
          data: JSON.parse(JSON.stringify(params)),
        }).then(res => {
          if (res.code == 0) {
            this.onAddModalCancel();
            this.refreshTable();
          }
        }).catch(err => {
          this.onAddModalCancel();
          this.$message.error(err.code+'!  '+err.message)
        })
      } else {
        this.$message.warn('IP不能为空！')
      }
    },
    onQueryClicked() {
      this.refreshTable();
    },
    changeBtnAcive(online) {
      if (online == -1) {
        this.isAllActive = true;
        this.isOnlineActive = this.isOfflineActive = false;
        this.online = undefined;
      } else if (online == 1) {
        this.isOnlineActive = true;
        this.isAllActive = this.isOfflineActive = false;
        this.online = true;
      } else if (online == 0) {
        this.isOfflineActive = true;
        this.isAllActive = this.isOnlineActive = false;
        this.online = false;
      }
    },
    onAddBtnClicked(title) {
      this.modalTitle = title;
      if (this.modalTitle === '编辑摄像头') {
        if (this.selectedRowRadioKeys.length == 1) {
          this.setAdd();
          this.addModalVisible = true;
        } else if (this.selectedRowRadioKeys.length == 0) {
          this.$message.warn('请选择一个设备')
        }
      } else if (this.modalTitle === '添加摄像头') {
        this.addModalVisible = true;
      }
    },
    onDeleteBtnClicked() {
      if (this.selectedRowRadioKeys.length == 0) {
        this.$message.warn('请选择一个设备!')
      } else {
        this.popconfirmVisiable = true;
      }
    },
    onDeleteComfirm() {
      if (this.selectedRowRadioKeys.length == 1) {
        this.setAdd();
        request({
          // url: '/api/device/query/devices/'+this.tableData[selectedRowRadioKey - 1].deviceId+'/delete',
          url: '/api/device/query/devices/' + this.add.id + '/delete',
          method: 'delete',
        }).then(res => {
          if (res.code == 200) {
            this.onModalClean();
            this.refreshTable();
          }
        }).catch(err => {
          this.onModalClean();
          this.$message.error(err.code+'!  '+err.message)
        })
      }
      this.popconfirmVisiable = false;
    },
    onDeleteCancel() {
      this.popconfirmVisiable = false;
      this.onModalClean();
    },
    onRefreshBtnClicked() {
      this.selectedRowRadioKeys = [];
      this.onAddModalCancel();
      this.refreshTable()
    },
    onCamInfoImgClicked(value, record, index) {
      //点击img的时候确定所选设备的id、deviceId
      this.add.id = record.id;
      this.add.deviceId = record.deviceId;
      this.camInfoModalVisible = true;
      request({
        url: '/api/device/query/devices/' + this.add.id,
        method:'get'
      }).then(res => {
        if (res.code == 0) {
          this.setViewVideoConfig(res.data)
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)

      })
    },
    /**
     * 查看摄像头信息modal中确定按钮
     */
    onCamInfoBtnClicked() {
      this.camInfoModalVisible = false;
      this.onModalClean()
    },
    onRemoteCtrlClicked(value, record, index, flag) {
      let url = '';
      if (flag == 0) {
        url = '/api/device/control/closeboot/' + record.deviceId;
      } else if (flag == 1) {
        url = '/api/device/control/teleboot/' + record.deviceId;
      }
      request({
        url,
      }).then(res => {
        if (res.code == 0) {
          this.onAddModalCancel();
          this.refreshTable();
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    onBrightnessPercentChange(per) {
      this.videoConfig.brightness = per;
    },
    onContrastPercentChange(per) {
      this.videoConfig.contrast = per;
    },
    onSaturationPercentChange(per) {
      this.videoConfig.saturation = per;
    },

    onVideoConfigImgClicked(value, record, index) {
      //点击img的时候确定所选设备的id、deviceId
      this.add.id = record.id;
      this.add.deviceId = record.deviceId;
      this.videoConfigModalVisible = true;
      request({
        url: '/api/device/query/videoConfig/' + this.add.deviceId,
        method: 'get',
      }).then(res => {
        if (res.code == 0) {
          this.setEditVideoConfig(res.data)
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    /**
     * 恢复默认值Btn
     */
    onVideoConfigDefaultValueBtnClicked() {
      this.resetVideoConfig()
    },
    onVideoConfigResetBtnClicked() {
      this.resetVideoConfig()
    },
    /**
     * 重置视频配置信息
     * 视频图像设置modal中"恢复默认值"、"重置"按钮都使用该方法
     */
    resetVideoConfig(){
      request({
        url: 'api/device/query/videoConfig/' + this.add.deviceId + '/reset',
        method: 'put',
      }).then(res => {
        if (res.code == 0) {
          this.$message.info(res.data);
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
    onVideoConfigCancelBtnClicked() {
      this.onModalClean();
      this.videoConfigModalVisible = false;
    },
    onVideoConfigConfirmBtnClicked() {
      const params = {};
      params.encoder = this.videoConfig.encoder;
      params.width = this.videoConfig.width;
      params.height = this.videoConfig.height;
      params.brightness = this.videoConfig.brightness;
      params.contrast = this.videoConfig.contrast;
      params.saturation = this.videoConfig.saturation;
      request({
        url: '/api/device/query/videoConfig/' + this.add.deviceId,//设备国际ID
        method: 'post',
        data: JSON.parse(JSON.stringify(params)),
      }).then(res => {
        if (res.code == 0) {
          this.videoConfigModalVisible = false;
          this.$message.info('更新视频配置信息成功');
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },

  },
  created() {
    //主页面初始化时，请求"监视类型"select中的数据源
    this.getSuperviseTypeList();
    //主页面初始化时，请求table中的数据源
    this.getDevicesTableData();
    //添加、编辑摄像头modal中"监视物"select中数据源
    this.getSuperviseList();
  }
}
</script>

<style scoped>
.card {
  margin-top: 10px;
}

.card-item {
  margin: 15px 0 3px 0;
}

.table-title {
  margin: 10px 0 10px 0;
}

.select {
  width: 200px;
}

.img {
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
}

.btn {
  border: 1px solid whitesmoke;
  border-radius: 3px;
  color: white;
  margin-left: 5px;
  padding-right: 10px;
}

.modal-footer-btn {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  width: 70px;
  height: 30px;
}

.btn-icon {
  width: 15px;
  height: 15px;
  margin-right: 10px;
}

.left-txt {
  margin: 8px 0 0 0;
  text-align: right;
}

.progress-left-txt {
  text-align: right;
}

.active {
  background-color: #158BCD;
  color: white;
}

.percent-text {
  width: 50px;
  /*height: 40px;*/
  margin-left: 20px;
}

</style>


