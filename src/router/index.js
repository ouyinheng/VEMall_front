import Vue from 'vue'
import Router from 'vue-router'
/*共有*/
import Login from '@/components/Login'
import error from '@/components/404'
import forget from '@/components/forget'
/*体统管理员*/
import Admin from '@/components/admin/admin'
import home from '@/components/admin/home'
import userList from '@/components/admin/userList'
import massList from '@/components/admin/massList'
import addGoods from '@/components/admin/addGoods'
import addshop from '@/components/admin/addshop'
import visitor from '@/components/admin/visitor'
//用户
import userLogin from '@/components/user/login'
import register from '@/components/user/register'
import Show from '@/components/user/show'
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
      component: Show
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
          path: '/userList',
          name: 'userList',
          component: userList
        },{
          path: '/massList',
          name: 'massList',
          component: massList
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
