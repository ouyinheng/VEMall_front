<template>
    <div class="manage_page fillcontain">
        <el-container>
          <el-aside width="200px" id="aside">
              <el-menu 
                  :default-active="defaultActive" 
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#324157"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                style="min-height: 100%;" router>                   
                <el-menu-item index="admin"><i class="el-icon-menu"></i>首页</el-menu-item>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-edit"></i>商城管理</template>
                    <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                    <el-menu-item index="allGoodsAdmin">所有商品</el-menu-item>
                    <el-menu-item index="hotGoods">热门商品</el-menu-item>
                    <el-menu-item index="handpick">品牌精选</el-menu-item>
                    <el-menu-item index="slideshow">添加轮播图</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                    <el-menu-item index="userList">用户列表</el-menu-item>
                    <el-menu-item index="orderList">订单列表</el-menu-item>
                    <!-- <el-menu-item index="pictureList">图片列表</el-menu-item> -->
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                    <!-- <el-menu-item index="addShop">添加商铺</el-menu-item> -->
                    <el-menu-item index="addGoods">添加商品</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                    <el-menu-item index="visitor">用户分布</el-menu-item>
                    <el-menu-item index="income">收入</el-menu-item>
                    <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                </el-submenu>
               
                <!-- <el-submenu index="6">
                    <template slot="title"><i class="el-icon-setting"></i>设置</template>
                    <el-menu-item index="adminSet">管理员设置</el-menu-item>
                </el-submenu> -->
                <el-submenu index="7">
                    <template slot="title"><i class="el-icon-warning"></i>系统管理</template>
                    <!-- <el-menu-item index="explain">权限配置</el-menu-item> -->
                    <!-- <el-menu-item index="place">基本设置</el-menu-item> -->
                    <el-menu-item index="syslog">系统日志</el-menu-item>
                </el-submenu>
            </el-menu>
          </el-aside>
          <el-container class="right">
            <el-header style="text-align: right;padding: 0 5px; font-size: 16px;color:#fff;background:RGB(31,45,61);">
                <div class="header-right">
                    <span class="span">{{sysUserName}}</span>
                    <el-dropdown>
                        <img v-lazy="base+'/queryImages?img='+sysUserAvatar" alt="lost" class="icon">
                        <el-dropdown-menu slot="dropdown">
                          <!-- <el-dropdown-item>个人信息</el-dropdown-item> -->
                          <!-- <el-dropdown-item>切换账户</el-dropdown-item> -->
                          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <el-badge :value="12" class="item">
                        <span class="el-icon-message" style="font-size:22px"></span>
                    </el-badge> -->
                    <!-- <span class="iconfont icon-password lock" title="锁屏"></span> -->
                </div>
                
            </el-header>
            <el-main style="margin-left: 200px;">
                <transition name="el-fade-in-linear">
                    <keep-alive>
                       <router-view v-if="$route.meta.keepAlive"></router-view>
                    </keep-alive>
                </transition>
                <transition name="el-fade-in-linear">
                    <router-view v-if="!$route.meta.keepAlive"></router-view>
                </transition>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import { base } from '@/api/api'
    export default {
        name: 'Admin',
        data(){
            return {
                base:base,
                sysUserAvatar:'',
                sysUserName:''
            }
        },
        computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
            }
        },
        beforeCreate:function(){
            //非法登录重定向
            /*var user = sessionStorage.getItem('user');
            if(user == null){
                this.$router.push('/404');
            }*/
        },
        mounted(){
            
        },
        methods:{
            logout(){
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    //type: 'warning'
                }).then(() => {
                    _this.toLogout();
                    // _this.bool = false;
                    sessionStorage.removeItem('user');
                    _this.$router.push('/login');
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
            ]),
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        created(){
            var user = sessionStorage.getItem('user');
            if (user) {
              user = JSON.parse(user);
              this.sysUserName = user.username || '';
              this.sysUserAvatar = user.icon_url || '';
            }
        }
    }
</script>

<style scoped>
    #aside {
        width: 200px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        background: rgb(50, 65, 87);
    }
    .right {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        /*overflow: hidden;*/
    }
    .el-menu {
        
    }
    .el-submenu .el-menu-item {
        background: RGB(31,45,61)!important;
    }
    .el-menu-item:hover{
         background: #48576a!important;
    }
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        margin-left: 200px;
    }
    .icon {
        width:40px;
        height:40px;
        border-radius:50%;
        vertical-align:middle;
        margin:0 5px;
    }
    .icon:hover {
        cursor: pointer;
    }
    .span,.lock {
        line-height: 60px;
    }
    .el-icon-message:hover {
        cursor: pointer;
    }
    /*锁屏*/
    .lock {
        margin-right: 30px;
    }
    .lock:hover {
        color: pink;
        cursor: pointer;
    }
    .item {
      margin: 0 15px 0 0;
    }
    .el-main {
        background: RGB(241,242,247);
    }
</style>