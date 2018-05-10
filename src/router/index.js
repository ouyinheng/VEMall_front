import Vue from 'vue'
import Router from 'vue-router'
/*共有*/
import Login from '@/components/Login'
import forget from '@/components/forget'


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
          // component: myDetails,
          component: resolve=> require(['@/components/user/myDetails'],resolve),
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
      component: resolve=> require(['@/components/errorPage/404'],resolve)
    },{
      path: '/403',
      name: '403',
      component: resolve=> require(['@/components/errorPage/403'],resolve)
    },{
      path: '/500',
      name: '500',
      component: resolve=> require(['@/components/errorPage/500'],resolve)
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
          component: resolve=> require(['@/components/admin/home'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path:'/hotGoods',
          name: 'hotGoods',
          component: resolve=> require(['@/components/admin/commManager/hotGoods'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path:'/handpick',
          name: 'handpick',
          component: resolve=> require(['@/components/admin/commManager/handpick'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path:'/allGoodsAdmin',
          name: 'allGoodsAdmin',
          component: resolve=> require(['@/components/admin/commManager/allGoods'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/slideshow',
          name: 'slideshow',
          component: resolve=> require(['@/components/admin/commManager/addSlideShow'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/userList',
          name: 'userList',
          component: resolve=> require(['@/components/admin/userList'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/massList',
          name: 'massList',
          component: resolve=> require(['@/components/admin/massList'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/pictureList',
          name: 'pictureList',
          component: resolve=> require(['@/components/admin/pictureList'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/orderList',
          name: 'orderList',
          component: resolve=> require(['@/components/admin/orderList'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/addGoods',
          name: 'addGoods',
          component: resolve=> require(['@/components/admin/addGoods'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/addshop',
          name: 'addshop',
          component: resolve=> require(['@/components/admin/addshop'],resolve),
          meta:{
            keepAlive:false
          }
        },{
          path: '/visitor',
          name: 'visitor',
          component: resolve=> require(['@/components/admin/visitor'],resolve),
          meta:{
            keepAlive:true
          }
        },{
          path: '/income',
          name: 'income',
          component: resolve=> require(['@/components/admin/income'],resolve),
          meta:{
            keepAlive:true
          }
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
