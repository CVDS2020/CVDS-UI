<template>
  <div>
    <div>日志信息</div>
    <a-tabs type="card" @change="callback">
      <a-tab-pane key="1" tab="系统日志">
        <sys-log/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="操作日志">
        <operation-log/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import SysLog from "@/pages/SysLog"
import OperationLog from "@/pages/OperationLog";

export default {
  name: "LogInfo",
  data() {
    return {};
  },
  components: {
    SysLog,
    OperationLog
  },
  methods: {
    callback(key) {
      // if(key=='1'){
      //   this.$router.replace('/logInfo/sysLog')
      // }else if(key=='2'){
      //   this.$router.replace('/logInfo/operationLog')
      // }
    },
  },
}
</script>

<style scoped>

</style>