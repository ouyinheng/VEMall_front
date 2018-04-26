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
      component: Show,
      children:[
        {
          path: '/',
          name: 'myMain',
          component: myMain,
        },{
          path: '/goodDetails',
          name: 'goodDetails',
          component: goodDetails,
        },{
          path: '/order',
          name: 'order',
          meta:{requireAuth:true},
          component: order
        },{
          path: '/allGoods',
          name: 'allGoods',
          component: allGoods,
        },{
          path: '/success',
          name: 'success',
          meta:{requireAuth:true},
          component: success
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
                component: myOrder,
              },{
                path: '/UserDetails',
                name: 'UserDetails',
                component: UserDetails,
              },{
                path: '/mySite',
                name: 'mySite',
                component: mySite,
              },{
                path: '/behindBuy',
                name: 'behindBuy',
                component: behindBuy,
              },{
                path: '/oldTonew',
                name: 'oldTonew',
                component: oldTonew,
              },{
                path: '/myNews',
                name: 'myNews',
                component: myNews,
              }
          ]
        }
      ]
    },{
      path: '/forget',
      name: 'forget',
      component: forget
    },{
      path: '/404',
      name: 'error',
      component: error
    },{//用户登录
      path: '/userLogin',
      name: 'userLogin',
      component: userLogin
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      //管理员登录
      path: '/Login',
      name: 'Login',
      component: Login
    },{//管理员界面
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta:{requireAuth:true},
      children:[
        {
          path: '/',
          name: 'home',
          component: home,
        },{
          path:'/hotGoods',
          name: 'hotGoods',
          component: hotGoods
        },{
          path:'/handpick',
          name: 'handpick',
          component: handpick
        },{
          path: '/userList',
          name: 'userList',
          component: userList
        },{
          path: '/massList',
          name: 'massList',
          component: massList
        },{
          path: '/pictureList',
          name: 'pictureList',
          component: pictureList
        },{
          path: '/orderList',
          name: 'orderList',
          component: orderList
        },{
          path: '/addGoods',
          name: 'addGoods',
          component: addGoods
        },{
          path: '/addshop',
          name: 'addshop',
          component: addshop
        },{
          path: '/visitor',
          name: 'visitor',
          component: visitor
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
