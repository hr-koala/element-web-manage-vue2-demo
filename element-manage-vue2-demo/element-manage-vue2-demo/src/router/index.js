import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Login from '@/views/Login'
import Register from '@/views/Register'
import Manage from '@/views/Manage'
import AddShop from '@/views/AddShop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
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
          path:'addShop',
          name: AddShop,
          component:AddShop
        }
      ]

    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
