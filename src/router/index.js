import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Menu from '@/views/Menu'
import App from '@/App'

import Home from '@/components/Home'
import ToRemember from '@/components/ToRemember'
import MyList from '@/components/MyList'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/',
          component: Login
        },
        {
          // 登陆页面
          path: '/login',
          component: Menu,
          children: [
            {
              path: '/mycard',
              component: MyList
            },
            {
              path: '/myoutline',
              component: MyList
            },
            {
              path: '/addoutline',
              component: MyList
            },
            {
              path: '/profile',
              component: Profile
            },
            {
              path: '/login',
              component: Login
            }
          ]
        }
      ]
    }
  ]
})
