<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header" style="">
      <div>HeaderHeaderHeader</div>

    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline">
          <a-menu-item class="menu" key="1"><router-link to="dashboard"><span class="menu-txt">仪表盘</span></router-link></a-menu-item>
          <a-sub-menu class="menu" key="sub1">
            <template #title>
              <span class="menu-txt">资源管理</span>
            </template>
            <a-menu-item class="item" key="2"><router-link to="trainInfo"><span>车辆信息</span></router-link></a-menu-item>
            <a-menu-item class="item" key="3"><router-link to="camInfo"><span>摄像头信息</span></router-link></a-menu-item>
            <a-menu-item class="item" key="4"><router-link to="storInfo"><span>存储信息</span></router-link></a-menu-item>
            <a-menu-item class="item" key="5"><router-link to="boardManage"><span>板卡控制</span></router-link></a-menu-item>
          </a-sub-menu>
          <a-sub-menu class="menu" key="sub3">
            <template #title>
              <span class="menu-txt">日志告警</span>
            </template>
            <a-menu-item class="item" key="7"><router-link to="logInfo">日志信息</router-link></a-menu-item>
            <a-menu-item class="item" key="8"><router-link to="alarmInfo">告警信息</router-link></a-menu-item>
          </a-sub-menu>
          <a-menu-item class="menu" key="10"><router-link to="sysInfo"><span class="menu-txt">系统信息</span></router-link></a-menu-item>

        </a-menu>


      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0}"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>


</template>
<script>
export default {
  name: 'HomePage'
};
</script>

<style>
#components-layout-demo-top-side-2 {
  height: 100vh;
}
.header{
  height:64px;
  background-image: linear-gradient(to right, #E6ECFB , #B3C9F5);
}
.menu{
  background-color: #8FAADC;
  padding: -5px 0 -5px 0;
}
.item{
  background-color: #C7D7F7;
  /*background-color: #E6F6FF;*/
  padding: -5px 0 -5px 0;
}
.menu-txt{
  /*color: white;/*/
  padding: -5px 0 -5px 0;
}
.menu-txt-black{
  color: black;
}
</style>


