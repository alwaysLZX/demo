/* global Vue */
import Router from 'vue-router'
import Home from '@/views/home/home'
import UserCenter from '@/views/user-center/user-center'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      redirect:'/uc'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/uc',
      name: 'UserCenter',
      component: UserCenter
    }
  ]
})
