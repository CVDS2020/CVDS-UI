<template>
  <div>
    <div>存储信息</div>
    <a-button>存储配置</a-button>
    <a-card>
      <a-row>
        <a-col :span="2"><span>磁盘号：</span></a-col>
        <a-col :span="3">
          <a-select class="select" default-value="disk1">
            <a-select-option value="disk1">
              disk1
            </a-select-option>
            <a-select-option value="disk2">
              disk2
            </a-select-option>
          </a-select>
        </a-col>
        <a-col :span="2"><span>状态：</span></a-col>
        <a-col :span="6">
          <a-button type="primary">全部</a-button>
          <a-button>正常</a-button>
          <a-button>故障</a-button>
        </a-col>
        <a-col :span="2">类型：</a-col>
        <a-col :span="6">
          <a-button type="primary">全部</a-button>
          <a-button>本地</a-button>
          <a-button>外接USB</a-button>
        </a-col>
        <a-col :span="3">
          <a-button>重置</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="21"></a-col>
        <a-col :span="3">
          <a-button>查询</a-button>
        </a-col>
      </a-row>
    </a-card>
    <div><span>磁盘空间列表[共</span><span>3</span><span>条]</span></div>
    <a-table :columns="columns" :data-source="tableData" bordered>

      <template #operation="{record}">
        <div>
          <img class="img" src="../assets/img/icon-view-cam-info.png" alt="" @click="setModal1Visible">
          <img class="img" src="../assets/img/icon-export.png" alt="" @click="setModal2Visible">
          <a-popconfirm
              placement="bottomRight"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirm">
            <template #title>
              <p>是否格式化当前USB磁盘</p>
            </template>
            <img class="img" src="../assets/img/icon-external.png" alt="" @click="showConfirm">
<!--            <button class="btn" style="background-color: gray "><img class="btn-icon" src="../assets/img/icon-btn-delete.png" alt="">删除</button>-->

          </a-popconfirm>

        </div>
      </template>
    </a-table>

    <a-modal
        title="摄像头信息"
        centered
        :width="800"
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
          <div
              style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
            画面设置：
          </div>
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
        <a-button @click="modal1Visible=false">确定</a-button>
      </template>
    </a-modal>
    <a-modal
        title="文件导出"
        centered
        :width="800"
        :visible="modal2Visible"
        :closable="false"
    >
      <div style="margin-top: 30px">
        <div
            style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
          时间范围：
        </div>
        <div style="border: 1px solid #e6e6e6;border-radius: 3px">
          <a-row>
            <a-col :span="5"></a-col>
            <a-col :span="5">开始时间：</a-col>
            <a-col :span="5">
              <a-date-picker @change="onStartDateChange"/>
            </a-col>
            <a-col :span="5">
              <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" @change="onStartTimeChange"/>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
          <a-row>
            <a-col :span="5"></a-col>
            <a-col :span="5">结束时间：</a-col>
            <a-col :span="5">
              <a-date-picker @change="onStartDateChange"/>
            </a-col>
            <a-col :span="5">
              <a-time-picker :default-open-value="moment('00:00:00', 'HH:mm:ss')" @change="onStartTimeChange"/>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </div>
      </div>

      <div style="margin-top: 30px">
        <div
            style="border: 1px solid #e6e6e6;border-radius: 3px;text-align:center;background: #e6e6e6;position: relative;top: 15px;left: 50px;width: 80px;height: 30px;padding-top:5px">
          导出类型：
        </div>
        <div style="border: 1px solid #e6e6e6;border-radius: 3px">
          <a-radio-group>
            <a-row>
              <a-col>
                <a-radio :value="1">全部</a-radio>
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-radio :value="2">摄像头</a-radio>
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
                <a-radio :value="3">监视物</a-radio>
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
          </a-radio-group>
        </div>
      </div>
      <div style="flex-direction: row; justify-content: center">
        <span>导出路径：</span>
        <a-input style="width: 200px" value="c:\\users\exportfile"></a-input>
        <a-button>浏览</a-button>
      </div>

      <template #footer>
        <a-button @click="modal2Visible=false">重置</a-button>
        <a-button @click="modal2Visible=false">取消</a-button>
        <a-button @click="modal2Visible=false">导出</a-button>
      </template>
    </a-modal>
  </div>

</template>

<script>
import moment from 'moment'

const columns = [
  {
    title: '编号',
    dataIndex: 'number',
    // scopedSlots: {customRender: 'name'},
  },
  {
    title: '磁盘号',
    // className: 'alarmTime',
    dataIndex: 'diskNo',
  },
  {
    title: '类型',
    dataIndex: 'type',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '总容量（GB）',
    dataIndex: 'capacity',
  },
  {
    title: '已用空间（GB）',
    dataIndex: 'usedCapacity',
  },
  {
    title: '剩余空间',
    dataIndex: 'freeCapacity',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '170px',
    scopedSlots: {customRender: 'operation'}
  }
];
const tableData = [
  {
    key: '1',
    number: '1',
    diskNo: '01',
    type: '本地',
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
    type: '本地',
    status: '正常',
    capacity: '2048',
    usedCapacity: '512',
    freeCapacity: '1536',
    operation: ''
  },

];
export default {
  name: "StorInfo",
  data() {
    return {
      columns,
      tableData,
      modal1Visible: false,
      modal2Visible: false,

    }
  },
  methods: {
    setModal1Visible() {
      this.modal1Visible = true;
    },
    setModal2Visible() {
      this.modal2Visible = true;
    },
    moment,
    onStartTimeChange(time, timeString) {
      console.log(time, timeString);
    },
    onStartDateChange(date, dateString) {
      console.log(date, dateString);
    },
    onRadioChange(e) {
      console.log('radio checked', e.target.value);
    },
    /*showConfirm() {*/
    //   this.$confirm({
    //     title: '是否格式化当前USB磁盘',
    //     content: '',
    //     onOk() {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    //       }).catch(() => console.log('Oops errors!'));
    //     },
    //     onCancel() {
    //     },
    //   });
    // },
  },
}
</script>

<style scoped>
.img {
  width: 20px;
  height: 20px;
  margin: 0 10px 0 10px;
}

</style>