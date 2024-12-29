import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '../views/LayOut.vue'
import TestCase from '../views/TestCase.vue'
import TestReport from '../views/TestReport.vue'
import TestTask from '../views/TestTask.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/layout/testcase'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/layout',
    name: 'layout',
    component: LayOut,
    children:[
      {
        path:'testcase',
        name: 'testcase',
        component: TestCase
      },
      {
        path:'task',
        name: 'task',
        component: TestTask
      },
      {
        path:'report',
        name: 'report',
        component: TestReport
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
