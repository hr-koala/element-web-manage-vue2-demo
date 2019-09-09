import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Manage from '@/views/Manage'

import Home from '@/views/Home'
import AddShop from '@/views/AddShop'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/manage',
  },
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/register',
    name: Register,
    component: Register
  },
  {
    path: '/manage',
    name: Manage,
    component: Manage,
    children:[
      {
        path:'/home',
        // path:'',
        name: Home,
        component:Home,
        meta: [],
      },
      {
        path:'',
        // path:'/addShop',
        name: AddShop,
        component:AddShop,
        meta: ['添加数据', '添加商铺'],
      }
    ]

  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld
  }
]

export default new Router({
  routes,
  // strict: process.env.NODE_ENV !== 'production',
  strict: process.env.NODE_ENV !== 'production',
})
