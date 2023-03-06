import Vue from 'vue'
import VueRouter from 'vue-router'

const Dashboard = () => import('@/pages/Dashboard')
const TrainInfo = () => import('@/pages/TrainInfo')
const CamInfo = () => import('@/pages/CamInfo')
const StorInfo = () => import('@/pages/StorInfo')
const BoardManage = () => import('@/pages/BoardManage')
const CamManage = () => import('@/pages/CamManage')
const LogInfo = () => import('@/pages/log/LogInfo')
const AlarmInfo = () => import('@/pages/AlarmInfo')
const UserManage = () => import('@/pages/UserManage')
const SysInfo = () => import('@/pages/SysInfo')
// 1.通过Vue.use(插件), 安装插件
Vue.use(VueRouter)
// 2.创建VueRouter对象
const routes = [
    // {
        // path: '',
        // redirect: 'dashboard',//不默认加载页面，登录成功后再代码跳转至dashboard页面
        // redirect: 'trainInfo'
        // redirect: 'camInfo'
        // redirect: 'storInfo'
        // redirect: 'boardManage'
        // redirect: 'logInfo'
        // redirect: 'alarmInfo'
        // redirect: 'sysInfo'
    // },
    {
        path: '/dashboard',
        component: Dashboard
    },
    {
        path: '/trainInfo',
        component: TrainInfo
    },
    {
        path: '/camInfo',
        component: CamInfo
    },
    {
        path: '/storInfo',
        component: StorInfo
    },
    {
        path: '/boardManage',
        component: BoardManage
    },
    {
        path: '/camManage',
        component: CamManage
    },
    {
        path: '/logInfo',
        component: LogInfo,
    },
    {
        path: '/alarmInfo',
        component: AlarmInfo
    },
    {
        path: '/userManage',
        component: UserManage
    },
    {
        path: '/sysInfo',
        component: SysInfo
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes,
});

// 3.将router对象传入到Vue实例
export default router