import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index/index-list'
import Login from '@/components/Login/login-list'
import Users from '@/components/Users/user-list'
import Rights from '@/components/Rights/rights-list'
import top from '@/components/top'
import Shop from '@/components/Shop'
import Add from '@/components/Add'
import Adds from '@/components/Adds'
import Orders from '@/components/Orders'
import Params from '@/components/Params'
import reports from '@/components/reports'
import Shopclassify from '@/components/Shopclassify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: Index,children: [
        { path: '/Users', component: Users},
        { path: '/roles', component: Rights},
        { path: '/rights', component: top},
        { path: '/goods', component: Shop},
        { path: '/Add', component: Add},
        { path: '/Orders', component: Orders},
        { path: '/categories', component: Params},
        { path: '/params', component: Shopclassify},
        { path: '/reports', component: reports}
      ]
    },
    {
      path: '/Login',
      // name: 'HelloWorld',
      component: Login
    },
    {
      path: '/Adds',
      // name: 'HelloWorld',
      component: Adds
    },

  ]
})
