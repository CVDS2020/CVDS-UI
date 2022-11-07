<template>
  <div>
    <div>摄像头信息</div>
    <a-card class="card">
      <a-row class="card-item">
        <a-col :span="2">车厢号</a-col>
        <a-col :span="5">
          <a-select class="select" default-value="1">
            <a-select-option value="1">
              1号车厢
            </a-select-option>
            <a-select-option value="2">
              2号车厢
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2">监视类型</a-col>
        <a-col :span="7">
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
        <a-col :span="6"></a-col>
        <a-col :span="2">
          <a-button>重置</a-button>
        </a-col>
      </a-row>
      <a-row class="card-item">
        <a-col :span="2">在线状态</a-col>
        <a-col :span="5">
          <a-button>全部</a-button>
          <a-button>在线</a-button>
          <a-button>离线</a-button>
        </a-col>
        <a-col :span="2">关键字</a-col>
        <a-col :span="7">
          <a-input></a-input>
        </a-col>
        <a-col :span="6"></a-col>
        <a-col :span="2">
          <a-button>查询</a-button>
        </a-col>
      </a-row>
    </a-card>
    <div style="display: flex; flex-direction: row-reverse"><a-button>批量导入</a-button></div>
    <a-row class="table-title">
      <a-col :span="4"><span>摄像头列表[共</span><span>12</span><span>条]</span></a-col>
      <a-col :span="14"></a-col>
      <a-col :span="6" style="display: flex; flex-direction: row-reverse">
        <button class="btn" style="background-color: gray" @click="() => (modal2Visible=true)"><img class="btn-icon" src="../assets/img/icon-btn-refresh.png" alt="">刷新</button>

        <a-popconfirm
            placement="bottomRight"
            ok-text="确定"
            cancel-text="取消"
            @confirm="confirm">
          <template #title>
            <p>是否删除当前摄像头信息</p>
          </template>
          <button class="btn" style="background-color: gray "><img class="btn-icon" src="../assets/img/icon-btn-delete.png" alt="">删除</button>
        </a-popconfirm>

        <button class="btn" style="background-color:#158BCD" @click="() => (modal2Visible=true)"><img class="btn-icon" src="../assets/img/icon-btn-edit.png" alt="">编辑</button>
        <a-modal
            title="编辑摄像头"
            centered
            :width="900"
            :visible="modal2Visible"
            :closable="false"
        >
          <div>
            <a-row>
              <a-col :span="5"><span>摄像头名称</span></a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
              <a-col :span="5">监视物类型</a-col>
              <a-col :span="7">
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
            </a-row>

            <a-row>
              <a-col :span="5"><span>所在车厢</span></a-col>
              <a-col :span="7">
                <a-select class="select" default-value="1">
                  <a-select-option value="1">
                    1号车厢
                  </a-select-option>
                  <a-select-option value="2">
                    2号车厢
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">监视物</a-col>
              <a-col :span="7">
                <a-select class="select" default-value="受电弓1">
                  <a-select-option value="受电弓1">
                    受电弓1
                  </a-select-option>
                  <a-select-option value="受电弓2">
                    受电弓2
                  </a-select-option>
                  <a-select-option value="转向架">
                    转向架
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"><span>IP地址</span></a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
              <a-col :span="5">摄像头位置</a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
            </a-row>
          </div>
          <template #footer>
            <a-button @click="setModal2Visible(false)">清空</a-button>
            <a-button @click="">取消</a-button>
            <a-button @click="">确定</a-button>
          </template>
        </a-modal>

        <button class="btn" style="background-color: green" @click="() => (modal1Visible=true)"><img class="btn-icon" src="../assets/img/icon-btn-add.png" alt="">添加</button>
        <a-modal
            title="添加摄像头"
            centered
            :width="900"
            :visible="modal1Visible"
            :closable="false"
        >
          <div>
            <a-row>
              <a-col :span="5"><span>摄像头名称</span></a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
              <a-col :span="5">监视物类型</a-col>
              <a-col :span="7">
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
            </a-row>

            <a-row>
              <a-col :span="5"><span>所在车厢</span></a-col>
              <a-col :span="7">
                <a-select class="select" default-value="1">
                  <a-select-option value="1">
                    1号车厢
                  </a-select-option>
                  <a-select-option value="2">
                    2号车厢
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">监视物</a-col>
              <a-col :span="7">
                <a-select class="select" default-value="受电弓1">
                  <a-select-option value="受电弓1">
                    受电弓1
                  </a-select-option>
                  <a-select-option value="受电弓2">
                    受电弓2
                  </a-select-option>
                  <a-select-option value="转向架">
                    转向架
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"><span>IP地址</span></a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
              <a-col :span="5">摄像头位置</a-col>
              <a-col :span="7">
                <a-input></a-input>
              </a-col>
            </a-row>
          </div>
          <template #footer>
            <a-button @click="setModal1Visible(false)">清空</a-button>
            <a-button @click="">取消</a-button>
            <a-button @click="">确定</a-button>
          </template>
        </a-modal>

      </a-col>

    </a-row>
    <a-table :columns="columns"
             :data-source="tableData"
             bordered
             :rowSelection="{
                type:'radio',
                hideDefaultSelections:true
                }"
    >
      <template #operation="{record}">
        <div>
          <img class="img" src="../assets/img/icon-view-cam-info.png" alt="" @click="showModal3">
          <img class="img" src="../assets/img/icon-conf-cam-info.png" alt="" @click="showModal4">
          <img class="img" src="../assets/img/icon-power-on.png" alt="" @click="alert('poweroff')">
        </div>
      </template>
      <!--      <template #name="{ record }">              //:data数据-->
      <!--        <a-button type="primary" ghost @click="hide(record)">编辑</a-button>-->
      <!--      </template>-->
    </a-table>

    <a-modal
        title="摄像头信息"
        centered
        :width="900"
        :visible="modal3Visible"
        :closable="false"
    >
      <div>
        <a-row>
          <a-col :span="5"><span>摄像头名称</span></a-col>
          <a-col :span="7">
            <a-input></a-input>
          </a-col>
          <a-col :span="5">监视物类型</a-col>
          <a-col :span="7">
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
        </a-row>

        <a-row>
          <a-col :span="5"><span>所在车厢</span></a-col>
          <a-col :span="7">
            <a-select class="select" default-value="1">
              <a-select-option value="1">
                1号车厢
              </a-select-option>
              <a-select-option value="2">
                2号车厢
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">监视物</a-col>
          <a-col :span="7">
            <a-select class="select" default-value="受电弓1">
              <a-select-option value="受电弓1">
                受电弓1
              </a-select-option>
              <a-select-option value="受电弓2">
                受电弓2
              </a-select-option>
              <a-select-option value="转向架">
                转向架
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="5"><span>IP地址</span></a-col>
          <a-col :span="7">
            <a-input></a-input>
          </a-col>
          <a-col :span="5">摄像头位置</a-col>
          <a-col :span="7">
            <a-input></a-input>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="5"><span>视频编码</span></a-col>
          <a-col :span="7">
            <a-select class="select" default-value="H.264">
              <a-select-option value="H.264">
                H.264
              </a-select-option>
              <a-select-option value="H.265">
                H.265
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">分辨率</a-col>
          <a-col :span="7">
            <a-select class="select" default-value="1920*1080(1080P)">
              <a-select-option value="1920*1080(1080P)">
                1920*1080(1080P)
              </a-select-option>
              <a-select-option value="390*844">
                390*844
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <div style="margin-top: 30px">
          <div style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">画面设置：</div>
          <div style="border: 1px solid #e6e6e6;border-radius: 3px">
            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>亮度</span></a-col>
              <a-col :span="11">
                <a-progress :percent="30" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input value="30"></a-input>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>对比</span></a-col>
              <a-col :span="11">
                <a-progress :percent="50" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input value="50"></a-input>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>饱和度</span></a-col>
              <a-col :span="11">
                <a-progress :percent="70" size="small" :showInfo="false"/>
              </a-col>
              <a-col :span="4">
                <a-input value="70"></a-input>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
      <template #footer>
        <a-button @click="modal3Visible=false">确定</a-button>
      </template>
    </a-modal>


    <a-modal
        title="视频图像设置"
        centered
        :width="900"
        :visible="modal4Visible"
        :closable="false"
    >
      <div>
        <a-row>
          <a-col :span="5"><span>视频编码</span></a-col>
          <a-col :span="7">
            <a-select class="select" default-value="H.264">
              <a-select-option value="H.264">
                H.264
              </a-select-option>
              <a-select-option value="H.265">
                H.265
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="5">分辨率</a-col>
          <a-col :span="7">
            <a-select class="select" default-value="1920*1080(1080P)">
              <a-select-option value="1920*1080(1080P)">
                1920*1080(1080P)
              </a-select-option>
              <a-select-option value="390*844">
                390*844
              </a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <div style="margin-top: 30px">
          <div style="">画面设置</div>
          <a-card>
            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>亮度</span></a-col>
              <a-col :span="11">
                <progress-bar :percent="70" :show-slider="true" :show-per-text="false"></progress-bar>
              </a-col>
              <a-col :span="4">
                <a-input value="30"></a-input>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>对比</span></a-col>
              <a-col :span="11">
                <progress-bar :percent="70" :show-slider="true" :show-per-text="false"></progress-bar>
              </a-col>
              <a-col :span="4">
                <a-input value="50"></a-input>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="5"></a-col>
              <a-col :span="4"><span>饱和度</span></a-col>
              <a-col :span="11">
                <progress-bar :percent="70" :show-slider="true" :show-per-text="false"></progress-bar>
              </a-col>
              <a-col :span="4">
                <a-input value="70"></a-input>
              </a-col>
            </a-row>

            <a-row>
              <a-col :span="19"></a-col>
              <a-col :span="3">
                <a-button>恢复默认值</a-button>
              </a-col>
              <a-col :span="2"></a-col>
            </a-row>

          </a-card>
        </div>
      </div>
      <template #footer>
        <a-button @click="modal4Visible=false">重置</a-button>
        <a-button @click="modal4Visible=false">取消</a-button>
        <a-button @click="modal4Visible=false">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar";
const columns = [
  // {
  //   title: '',
  //   dataIndex: 'checkBox',
  //   // scopedSlots: {customRender: 'name'},
  // },
  {
    title: '编号',
    // className: 'alarmTime',
    dataIndex: 'number',
    width: '70px',
    // height:'15px'
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: '100px'
  },
  {
    title: '型号',
    dataIndex: 'model',
  },
  {
    title: '监视类型',
    dataIndex: 'superviseTargetType',
  },
  {
    title: '车厢号',
    dataIndex: 'carriageNo',
  },
  {
    title: '摄像头位置',
    dataIndex: 'position',
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '在线/离线',
    dataIndex: 'online',
  },
  {
    title: '监视物状态',
    dataIndex: 'superviseTargetStatus',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '170px',
    scopedSlots: {customRender: 'operation'}
  }
];
const tableData = [
  {
    key: '1',
    number: '1',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },
  {
    key: '2',
    number: '2',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },
  {
    key: '3',
    number: '3',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },
  {
    key: '4',
    number: '4',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },
  {
    key: '5',
    number: '5',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },
  {
    key: '6',
    number: '6',
    name: '摄像头01',
    model: '',
    superviseTargetType: '受电弓',
    carriageNo: '01',
    position: '受电弓位置01',
    ip: '192.168.1.2',
    online: '在线',
    superviseTargetStatus: '正常',
    operation: ''
  },

];
export default {
  name: "CamInfo",
  components:{
    ProgressBar,
  },
  data() {
    return {
      columns,
      tableData,
      modal1Visible: false,
      modal2Visible: false,
      modal3Visible: false,
      modal4Visible: false
    }
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
    setModal2Visible(modal2Visible) {
      this.modal2Visible = modal2Visible;
    },
    showModal3() {
      this.modal3Visible = true
    },
    showModal4() {
      this.modal4Visible = true
    },
    test(msg) {
      alert(msg)
    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 10px;
}

.card-item {
  margin: 3px 0 3px 0;
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
.btn{
  border: 1px solid whitesmoke;
  border-radius: 3px;
  color:white;
  margin-left: 5px;
  padding-right: 10px;
}
.btn-icon{
  width: 15px;
  height: 15px;
  margin-right: 10px;
}
</style>