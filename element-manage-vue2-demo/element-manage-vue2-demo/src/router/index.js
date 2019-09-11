import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Manage from '@/views/Manage'

import Home from '@/views/Home'
import AddShop from '@/views/AddShop'
import AddGoods from '@/views/AddGoods'

import ShopList from '@/views/ShopList'
import UserList from '@/views/UserList'
import FoodList from '@/views/FoodList'
import OrderList from '@/views/OrderList'
import AdminList from '@/views/AdminList'

import Visitor from '@/views/Visitor'
import NewMember from '@/views/NewMember'

import UploadImg from '@/views/UploadImg'
import VueEdit from '@/views/VueEdit'


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
        path:'/addShop',
        name: AddShop,
        component:AddShop,
        meta: ['添加数据', '添加商铺'],
      },
      {
        path:'/addGoods',
        name: AddGoods,
        component:AddGoods,
        meta: ['添加数据', '添加商品'],
      },
      {
        path:'/shopList',
        name: ShopList,
        component:ShopList,
        meta: ['数据管理', '商家列表'],
      },
      {
        path: '/userList',
        name: UserList,
        component: UserList,
        meta: ['数据管理', '用户列表'],
      },
      {
        path: '/foodList',
        name: FoodList,
        component: FoodList,
        meta: ['数据管理', '食品列表'],
      },
      {
        path: '/orderList',
        name: OrderList,
        component: OrderList,
        meta: ['数据管理', '订单列表'],
      },
      {
        path: '/adminList',
          name:AdminList,
        component: AdminList,
        meta: ['数据管理', '管理员列表'],
      },
      {
        path: '/visitor',
        component: Visitor,
        name:Visitor,
        meta: ['图表', '用户分布'],
      },
      {
        path: '/newMember',
        name:NewMember,
        component: NewMember,
        meta: ['图表', '用户数据'],
      },
      {
        path: '/uploadImg',
        name: UploadImg,
        component: UploadImg,
        meta: ['文本编辑', 'MarkDown'],
      },
      {path:'',
        // path: '/vueEdit',
        name: VueEdit,
        component: VueEdit,
        meta: ['编辑', '文本编辑'],
      },
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
