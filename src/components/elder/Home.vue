<template>
  <div class="home">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed' : headerFixed }">
    <el-row>
        <el-col :span="20">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="">
            <el-menu-item index="1">高级插件</el-menu-item>
            <el-menu-item index="2">在线商城</el-menu-item>
            <el-menu-item index="3">客户管理</el-menu-item>
            <el-menu-item index="4">系统设置</el-menu-item>
            <el-menu-item index="5">活动发布</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner"><img :src="base+'/queryImages?img='+this.sysUserAvatar" /> {{sysUserName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
    </el-row>
    </header>
    <div v-show="headerFixed" style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/Public" :class="{'isActive': active.step1}">商品发布</el-menu-item>
            <el-menu-item index="/management" :class="{'isActive': active.step2}">商品管理</el-menu-item>
            <el-menu-item index="/echarts" :class="{'isActive': active.step3}">echarts</el-menu-item>
          </el-menu>
        </div>

          <!-- 右侧主内容区 -->
          <div  class="main-right" >
            <transition name="fade">
              <router-view class="view"></router-view>
            </transition>
          </div>
    </main>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import { base } from '@/api/api'
export default {
  name: 'Home',
  data: function (){
    return {
      base:base,
      active:{
        step1:'',
        step2:'',
        step3:''
      },
      headerFixed : true,
      sysUserAvatar:'./static/images/taylor.jpg',
      sysUserName:'123'
    }
  },
  beforeCreate(){
      var user = sessionStorage.getItem('user');
      if(user == null){
          this.$router.push('/404');
      }
  },
  created: function(){
    this.$router.push('/Public');
  },
  methods: {
    logout(){
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        _this.toLogout();
        // _this.bool = false;
        sessionStorage.removeItem('user');
        _this.$router.push('/');
        _this.$notify({
          title: '成功',
          message: '退出成功！',
          type: 'success'
        });
      }).catch((error) => {
        _this.$notify({
          title: '失败',
          message: '退出失败！',
          type: 'error'
        });
      });
    },
    ...mapActions([
        'toLogout'
    ])
  },
  mounted() {
    var user = sessionStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.username || '';
      this.sysUserAvatar = user.icon_url || '';
    }
  },
  watch: {
     '$route': function (to,from) {
         if(to.path == '/index'){
             this.active.step1 = true ;
             this.active.step2 = false ;
             this.active.step3 = false ;
             this.active.step4 = false ;
         }else if(to.path == '/step2'){
             this.active.step1 = false ;
             this.active.step2 = true ;
             this.active.step3 = false ;
             this.active.step4 = false ;
         }else if(to.path == '/step3'){
             this.active.step1 = false ;
             this.active.step2 = false ;
             this.active.step3 = true ;
             this.active.step4 = false ;
         }else if(to.path == '/step4'){
             this.active.step1 = false ;
             this.active.step2 = false ;
             this.active.step3 = false ;
             this.active.step4 = true ;
         }
     }
  }
}
</script>

<style>

body{margin: 0;}
/* 头部导航 */
header{z-index: 1000;min-width: 1200px;transition: all 0.5s ease;  border-top: solid 4px #3091F2;  background-color: #fff;  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);  }
header.header-fixed{position: fixed;top: 0;left: 0;right: 0;}
header .el-menu-demo{padding-left: 300px!important;}

/* 主内容区 */
main{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;  
  min-height: 800px;  
  border: solid 40px #E9ECF1;  
  background-color: #FCFCFC;
}
main .main-left{
  text-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;
}
main .main-right{
  -webkit-box-flex:1;
  -ms-flex:1;flex:1; 
  background-color: #fff; 
  padding: 50px 70px; 
}
main .el-menu{
  background-color: transparent!important;
}
/*  */
.router-link{
  display:inline-block;
  width:100%;
  height:100%;
  text-align:center;
  color:#475669;
  text-decoration: none; 
}
.is-active .router-link{
  color:#20a0ff; 
}

/* 单选框 */
.el-form-item .el-radio+.el-radio {
  margin-left: 30px!important;
}
/* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

/* 导航栏菜单选中效果 */
.isActive{color: #20a0ff!important;}
 #app main .aside .is-active{color: #475669;}

/* 卡片 */
.el-card{overflow: visible!important;}

/*头像*/
.userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.userinfo .userinfo-inner {
  cursor: pointer;
  color: #000;
  text-align: center;
  line-height: 60px;
}
.userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}
</style>
