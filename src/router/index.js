import Vue from 'vue'
import Router from 'vue-router'
/*共有*/
import Login from '@/components/Login'
/*管理员*/
import Admin from '@/components/admin/admin'
import home from '@/components/admin/home'
import userList from '@/components/admin/userList'
import massList from '@/components/admin/massList'

/*社团管理员*/
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
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children:[
        {
          path: '/',
          name: 'home',
          component: home
        },{
          path: '/userList',
          name: 'userList',
          component: userList
        },{
          path: '/massList',
          name: 'massList',
          component: massList
        }
      ]
    },{
      path: '/home',
      name: 'Home',
      component: Home,
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
