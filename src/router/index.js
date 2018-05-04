import Vue from 'vue'
import Router from 'vue-router'
/*共有*/
import Login from '@/components/Login'
import error from '@/components/404'
import forget from '@/components/forget'
/*系统管理员*/
import Admin from '@/components/admin/admin'
//首页
import home from '@/components/admin/home'

//商城管理
import hotGoods from '@/components/admin/hotGoods'
import handpick from '@/components/admin/handpick'
//数据管理
import userList from '@/components/admin/userList'
import massList from '@/components/admin/massList'
import pictureList from '@/components/admin/pictureList'
import orderList from '@/components/admin/orderList'

//添加数据
import addGoods from '@/components/admin/addGoods'
import addshop from '@/components/admin/addshop'
import slideshow from '@/components/admin/addSlideShow'

//图表
import visitor from '@/components/admin/visitor'

//设置

//系统管理

/*用户*/
import userLogin from '@/components/user/login'
import register from '@/components/user/register'
import Show from '@/components/user/show'
import myMain from '@/components/user/myMain'
import goodDetails from '@/components/user/goodDetails'
import allGoods from '@/components/user/allGoods'
import order from '@/components/user/order'
import success from '@/components/user/success'//个人信息
import myDetails from '@/components/user/myDetails'//个人信息
import myOrder from '@/components/user/myOrder'//个人信息
import UserDetails from '@/components/user/UserDetails'//个人信息
import mySite from '@/components/user/mySite'//个人信息
import behindBuy from '@/components/user/behindBuy'//个人信息
import oldTonew from '@/components/user/oldTonew'//个人信息
import myNews from '@/components/user/myNews'//个人信息
/*普通用户*/
import Home from '@/components/elder/Home'
import Test from '@/components/elder/test'
import Public from '@/components/elder/active/public/index'
import step1 from '@/components/elder/active/public/step1'
import step2 from '@/components/elder/active/public/step2'
import step3 from '@/components/elder/active/public/step3'
import step4 from '@/components/elder/active/public/step4'
import management from '@/components/elder/active/management'
import echarts from '@/components/elder/active/echarts'
/*社员*/

Vue.use(Router)

export default new Router({
  routes: [
    {//此处为商品展示页面
      path: '/',
      name: 'Show',
      component: resolve=> require(['@/components/user/show'],resolve),
      children:[
        {
          path: '/',
          name: 'myMain',
          component: resolve=> require(['@/components/user/myMain'],resolve)
        },{
          path: '/goodDetails',
          name: 'goodDetails',
          component: resolve=> require(['@/components/user/goodDetails'],resolve)
        },{
          path: '/order',
          name: 'order',
          meta:{requireAuth:true},
          component: resolve=> require(['@/components/user/order'],resolve)
        },{
          path: '/allGoods',
          name: 'allGoods',
          component: resolve=> require(['@/components/user/allGoods'],resolve)
        },{
          path: '/success',
          name: 'success',
          meta:{requireAuth:true},
          component: resolve=> require(['@/components/user/success'],resolve)
        },{
          //用户信息界面
          path: '/myDetails',
          name: 'myDetails',
          component: myDetails,
          meta:{requireAuth:true},
          children:[
              {
                path: '/',
                name: 'myOrder',
                component: resolve=> require(['@/components/user/myOrder'],resolve)
              },{
                path: '/UserDetails',
                name: 'UserDetails',
                component: resolve=> require(['@/components/user/UserDetails'],resolve)
              },{
                path: '/mySite',
                name: 'mySite',
                component: resolve=> require(['@/components/user/mySite'],resolve)
              },{
                path: '/behindBuy',
                name: 'behindBuy',
                component: resolve=> require(['@/components/user/behindBuy'],resolve)
              },{
                path: '/oldTonew',
                name: 'oldTonew',
                component: resolve=> require(['@/components/user/oldTonew'],resolve)
              },{
                path: '/myNews',
                name: 'myNews',
                component: resolve=> require(['@/components/user/myNews'],resolve)
              }
          ]
        }
      ]
    },{
      path: '/forget',
      name: 'forget',
      component: resolve=> require(['@/components/forget'],resolve)
    },{
      path: '/404',
      name: 'error',
      component: resolve=> require(['@/components/404'],resolve)
    },{//用户登录
      path: '/userLogin',
      name: 'userLogin',
      component: resolve=> require(['@/components/user/login'],resolve)
    },{
      path: '/register',
      name: 'register',
      component: resolve=> require(['@/components/user/register'],resolve)
    },{
      //管理员登录
      path: '/Login',
      name: 'Login',
      component: resolve=> require(['@/components/Login'],resolve)
    },{//管理员界面
      path: '/admin',
      name: 'Admin',
      component: resolve=> require(['@/components/admin/admin'],resolve),
      meta:{requireAuth:true},
      children:[
        {
          path: '/',
          name: 'home',
          component: resolve=> require(['@/components/admin/home'],resolve)
        },{
          path:'/hotGoods',
          name: 'hotGoods',
          component: resolve=> require(['@/components/admin/hotGoods'],resolve)
        },{
          path:'/handpick',
          name: 'handpick',
          component: resolve=> require(['@/components/admin/handpick'],resolve)
        },{
          path: '/userList',
          name: 'userList',
          component: resolve=> require(['@/components/admin/userList'],resolve)
        },{
          path: '/massList',
          name: 'massList',
          component: resolve=> require(['@/components/admin/massList'],resolve)
        },{
          path: '/pictureList',
          name: 'pictureList',
          component: resolve=> require(['@/components/admin/pictureList'],resolve)
        },{
          path: '/orderList',
          name: 'orderList',
          component: resolve=> require(['@/components/admin/orderList'],resolve)
        },{
          path: '/addGoods',
          name: 'addGoods',
          component: resolve=> require(['@/components/admin/addGoods'],resolve)
        },{
          path: '/addshop',
          name: 'addshop',
          component: resolve=> require(['@/components/admin/addshop'],resolve)
        },{
          path: '/slideshow',
          name: 'slideshow',
          component: resolve=> require(['@/components/admin/addSlideShow'],resolve)
        },{
          path: '/visitor',
          name: 'visitor',
          component: resolve=> require(['@/components/admin/visitor'],resolve)
        }
      ]
    },{
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{requireAuth:true},
      children:[
        { 
          path: '/public', 
          component: Public,
          children:[
            { path: ''     , component: step1  },
            { path: 'step1', component: step1  },
            { path: 'step2', component: step2  },
            { path: 'step3', component: step3  },
            { path: 'step4', component: step4  }
          ]
        },{ 
          path: '/management', 
          component: management
        },{ 
          path: '/echarts', 
          component: echarts
        }
      ]
    },{
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
