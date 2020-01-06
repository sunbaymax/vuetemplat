import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login')
  },
  // {
  //   path: '*',
  //   name: 'login',
  //   component: () => import('../views/Login')
  // },
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
    path: '/DetailList/:id',
    name: 'detaillist',   
    component: () => import('../views/DetailList')
  },
  {
    path: '/CommonProblem',
    name: 'commonproblem',   
    component: () => import('../views/UserCenter/CommonProblem')
  },
  {
    path: '/Test',
    name: 'test',   
    component: () => import('../views/Test')
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
