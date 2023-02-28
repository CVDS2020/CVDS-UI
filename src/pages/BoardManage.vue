<template>
  <div>
    <page-title title="板卡控制"></page-title>
    <a-row style="margin-top: 150px">
      <a-col :span="2"></a-col>
      <a-col :span="5">
        <a-card class="card" :style="getCardBgStyles(this.power.status)">
          <h2 class="p">{{ this.power.name }}</h2>
          <div class="btn-container">
            <a-button class="btn" :disabled="Boolean(this.power.status)" :style="getOnBtnStyle(this.power.status)"
                      @click="onCtrlBtnClicked(power.type,1)">开机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.power.status)" :style="getOffBtnStyle(this.power.status)"
                      @click="onCtrlBtnClicked(power.type,0)">关机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.power.status)" :style="getRestartBtnStyle(this.power.status)"
                      @click="onCtrlBtnClicked(power.type,2)">重启
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card" :style="getCardBgStyles(this.switchBoard.status)">
          <h2 class="p">{{ this.switchBoard.name }}</h2>
          <div class="btn-container">
            <a-button class="btn" :disabled="Boolean(this.switchBoard.status)"
                      :style="getOnBtnStyle(this.switchBoard.status)" @click="onCtrlBtnClicked(switchBoard.type,1)">开机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.switchBoard.status)"
                      :style="getOffBtnStyle(this.switchBoard.status)" @click="onCtrlBtnClicked(switchBoard.type,0)">关机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.switchBoard.status)"
                      :style="getRestartBtnStyle(this.switchBoard.status)" @click="onCtrlBtnClicked(switchBoard.type,2)">重启
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card" :style="getCardBgStyles(this.videoCore.status)">
          <h2 class="p">{{ this.videoCore.name }}</h2>
          <div class="btn-container">
            <a-button class="btn" :disabled="Boolean(this.videoCore.status)"
                      :style="getOnBtnStyle(this.videoCore.status)" @click="onCtrlBtnClicked(videoCore.type,1)">开机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.videoCore.status)"
                      :style="getOffBtnStyle(this.videoCore.status)" @click="onCtrlBtnClicked(videoCore.type,0)">关机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(this.videoCore.status)"
                      :style="getRestartBtnStyle(this.videoCore.status)" @click="onCtrlBtnClicked(videoCore.type,2)">重启
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="5">
        <a-card class="card" :style="getCardBgStyles(this.AIAnlyze.status)">
          <h2 class="p">{{ this.AIAnlyze.name }}</h2>
          <div class="btn-container">
            <a-button class="btn" :disabled="Boolean(AIAnlyze.status)" :style="getOnBtnStyle(this.AIAnlyze.status)"
                      @click="onCtrlBtnClicked(AIAnlyze.type,1)">开机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(AIAnlyze.status)" :style="getOffBtnStyle(this.AIAnlyze.status)"
                      @click="onCtrlBtnClicked(AIAnlyze.type,0)">关机
            </a-button>
            <a-button class="btn" :disabled="!Boolean(AIAnlyze.status)"
                      :style="getRestartBtnStyle(this.AIAnlyze.status)" @click="onCtrlBtnClicked(AIAnlyze.type,2)">重启
            </a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="2"></a-col>
    </a-row>
    <div>


    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
import {request} from '@/network/request'

function getName(type) {
  if (type == 1) {
    return '电源板';
  } else if (type == 2) {
    return '交换板';
  } else if (type == 3) {
    return '视频核心板';
  } else if (type == 4) {
    return 'AI分析板';
  } else {
    return '';
  }
}

export default {
  name: "BoardInfo",
  components: {PageTitle},
  data() {
    return {
      cardBlue: '#158BCD',
      cardGray: 'darkgray',
      btnYellow: 'coral',
      btnGreen: 'forestgreen',
      btnGray: 'darkgray',
      power: {
        type: 1,
        name: '电源板',
        status: 0,
      },
      switchBoard: {
        type: 2,
        name: '交换板',
        status: 1,
      },
      videoCore: {
        type: 3,
        name: '视频核心板',
        status: 1,
      },
      AIAnlyze: {
        type: 4,
        name: 'AI分析板',
        status: 1,
      },
    }
  },
  methods: {
    getBoardList() {
      request({
        url: '/api/system/board/list',
      }).then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length == 0) return;
          if(res.data.length>=1){
            this.power.type = res.data[0].type;
            this.power.name = '电源板';
            this.power.status = res.data[0].status;
          }

          if (res.data.length >= 2) {
            this.switchBoard.type = res.data[1].type;
            this.switchBoard.name = res.data[1].name;
            this.switchBoard.status = res.data[1].status;
          }
          if (res.data.length >= 3) {
            this.videoCore.type = res.data[2].type;
            this.videoCore.name = res.data[2].name;
            this.videoCore.status = res.data[2].status;
          }
          if (res.data.length >= 4) {
            this.AIAnlyze.type = res.data[3].type;
            this.AIAnlyze.name = res.data[3].name;
            this.AIAnlyze.status = res.data[3].status;
          }
        }

      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },

    getCardBgStyles(status) {
      if (status == 0) {
        return {backgroundColor: this.cardGray}
      } else if (status == 1) {
        return {backgroundColor: this.cardBlue}
        // return {backgroundColor: 'cornflowerblue'}
      }
    },
    getOnBtnStyle(status) {
      if (status == 0) {
        return {backgroundColor: this.btnGreen}
      } else if (status == 1) {
        return {backgroundColor: this.btnGray}
      }
    },
    getOffBtnStyle(status) {
      if (status == 0) {
        return {backgroundColor: this.btnGray}
      } else if (status == 1) {
        return {backgroundColor: this.btnYellow}
      }
    },
    getRestartBtnStyle(status) {
      if (status == 0) {
        return {backgroundColor: this.btnGray}
      } else if (status == 1) {
        return {backgroundColor: this.btnGreen}
      }
    },
    onCtrlBtnClicked(type, action) {
      let params={};
      params.type=type;
      params.action=action;
      request({
        url: '/api/system/board/ctrl',
        method: 'put',
        data:JSON.parse(JSON.stringify(params)),
      }).then(res => {
        if (res.code == 0) {
          this.getBoardList();
        }
      }).catch(err => {
        this.$message.error(err.code+'!  '+err.message)
      })
    },
  },
  created() {
    this.getBoardList();
  }
}
</script>


<style scoped>
.card {
  width: 250px;
  height: 350px;
  background-color: #158BCD;
  text-align: center;
  box-shadow: 3px 3px 10px gray;
  /*line-height: 400px;*/
}

.p {
  /*background-color: yellow;*/
  margin-top: 120px;
  color: white;
}

.btn-container {
  /*background-color: red;*/
  /*flex-grow: 1;*/
  position: relative;
  top: 100px;
}

.btn {
  padding: 0 3px;
  margin: 0 3px;
  width: 50px;
  height: 30px;
  color: white;
}

</style>