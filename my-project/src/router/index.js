import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '*',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/MachineList',
    name: 'machinelist',
    component: () => import('../views/MachineList')
  },
  {
    path: '/AddMachine',
    name: 'addmachine',   
    component: () => import('../views/MachineList/AddMachine.vue')
  },
  {
    path: '/UserCenter',
    name: 'usercenter',   
    component: () => import('../views/UserCenter')
  },
  {
    path: '/DetailList',
    name: 'detaillist', 
    redirect() {
      return '/DetailList/LateData/:num_m'
    },  
    component: () => import('../views/DetailList'),
    children:[
      {
        path: '/DetailList/LateData/:num_m',
        name:"latedata",
        component: () => import('../component/LatestData'),
      },
      {
        path: '/DetailList/HistroyData/:num_m',
        name:"histroydata",
        component: () => import('../component/HistroyData'),       

      },
      {
        path: '/DetailList/ParameterSet/:num_m',
        name:"parameterset",
        component: () => import('../component/ParameterSet'),
      },
      {
        path: '/DetailList/WarningList/:num_m',
        name:"warninglist",
        component: () => import('../component/WarningList'),
      }

    ]

  },
  {
    path: '/CommonProblem',
    name: 'commonproblem',   
    component: () => import('../views/UserCenter/CommonProblem')
  },
  {
    path: '/BasicSet',
    name: 'basicset',   
    component: () => import('../views/MachineSet/BasicSet')
  },
  {
    path: '/ParaminfoSet',
    name: 'paraminfoset',   
    component: () => import('../views/MachineSet/ParaminfoSet')
  },
  {
    path: '/WarningSet',
    name: 'warningSet',   
    component: () => import('../views/MachineSet/WarningSet')
  },
  {
    path: '/AdditionalSet',
    name: 'additionalSet',   
    component: () => import('../views/MachineSet/AdditionalSet')
  },
  {
    path: '/MyInfo',
    name: 'myindo',   
    component: () => import('../views/UserCenter/MyInfo')
  },
  {
    path: '/InviteFamily',
    name: 'invitefamily',   
    component: () => import('../views/UserCenter/InviteFamily')
  },
  {
    path: '/InviteAddFamily',
    name: 'inviteaddfamily',   
    component: () => import('../views/UserCenter/InviteFamily/add.vue')
  },
  {
    path: '/InviteEditFamily',
    name: 'inviteeditfamily',   
    component: () => import('../views/UserCenter/InviteFamily/edit.vue')
  },
  {
    path: '/AcountSet',
    name: 'acountset',   
    component: () => import('../views/UserCenter/AcountSet')
  },
  {
    path: '/ResetPsd',
    name: 'ressetpsd',   
    component: () => import('../views/UserCenter/ResetPsd')
  },
  {
    path: '/ChangeVerifyTel',
    name: 'changeverifytel',   
    component: () => import('../views/UserCenter/ChangeVerifyTel')
  },
  {
    path: '/ChangeTel',
    name: 'changetel',   
    component: () => import('../views/UserCenter/ChangeTel')
  },
  {
    path: '/ChangeTel',
    name: 'changetel',   
    component: () => import('../views/UserCenter/ChangeTel')
  },
  {
    path: '/Test',
    name: 'test',   
    component: () => import('../views/Test')
  },
  {
    path: '/ServePay',
    name: 'servepay',   
    component: () => import('../views/UserCenter/ServePay')
  },
  {
    path: '/Paylist',
    name: 'paylist',   
    component: () => import('../views/UserCenter/ServePay/Paylist')
  },
  {
    path: '/UpbillList',
    name: 'upbilllist',   
    component: () => import('../views/UserCenter/ServePay/UpbillList')
  },
  {
    path: '/Bill',
    name: 'bill',   
    component: () => import('../views/UserCenter/ServePay/Bill')
  },
  {
    path: '/OneUpbill',
    name: 'oneupbill',   
    component: () => import('../views/UserCenter/ServePay/UpbillList/OneUpbill')
  },
  {
    path: '/ForgetPsd',
    name: 'forgetpsd',   
    component: () => import('../views/UserCenter/ForgetPsd')
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass:'router-link-active',
  routes
})

export default router
