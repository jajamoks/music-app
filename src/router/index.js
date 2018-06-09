import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/views/recommend'
import Singer from '@/views/singer'
import singerDetail from '@/views/singer-detail'
import Disk from '@/views/disc'
import Rank from '@/views/rank'
import Toplist from '@/views/top-list'
import Search from '@/views/search'
import UserCenter from '@/views/user-center'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  	{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: Disk
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    },
    {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: Toplist
      }]
    },
    {
      path: '/search',
      component: Search,
      children: [{
        path: ':id',
        component: singerDetail
      }]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
