<template>
  <div class="hello">
    <!-- <img class="img" src="@/../static/images/post-bg-debug.png" alt=""> -->
    <!-- <video id="video" src="@/../static/images/back.mp4" autobuffer autoloop loop autoplay></video> -->
    <el-form :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div>
            <div id="captcha">
              <el-button :loading="true" id="wait" class="show" v-show="isShow">正在加载验证码......</el-button>
            </div>
        </div>
      </el-form-item>
      <el-checkbox id="checkbox" v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :disabled="disabled" type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
    <div id="allmap"></div>
  </div>
</template>

<script>
import $ from 'jquery'
import {mapState,mapActions} from 'vuex'
import gt from '../assets/js/gt.js'
import { toVerify } from '@/api/api'
import crypto from 'crypto'
export default {
  name: 'Login',
  data() {
      return {
        place:'null',
        logining: false,//登录加载
        isShow:true,//
        rules2: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    mounted(){
        var _this = this;
        toVerify().then(data=>{
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

                product: "popup", // 产品形式，包括：float，popup
                width: "300px"
            },_this.verify);
        }).catch();
        this.init();
    },
    created:function(){
      history.pushState(null, null, location.href);
    },
    computed:{
      ...mapState(['bool','user','disabled'])
    },
    methods: {
      init(){
        const _this = this;
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(116.331398,39.897445);
          map.centerAndZoom(point,12);
          function myFun(result){
              var cityName = result.name.replace('市', '');;
              map.setCenter(cityName);
              // alert("当前定位城市:"+cityName);
              _this.place = cityName;
          }
          var myCity = new BMap.LocalCity();
          myCity.get(myFun);
      },
      //验证码
      verify(captchaObj) {
          var _this = this;
          captchaObj.appendTo('#captcha');
          captchaObj.onReady(function () {
              _this.isShow = false;
          });
          captchaObj.onSuccess(function () {
              _this.isLogin();
          })
      },
      handleReset2() {
        
      },
      getmd5(data){
          var a;
          var md5 = crypto.createHash("md5");
          md5.update(data);
          var a = md5.digest('hex');
          return a;
      },
      handleSubmit(ev) {
          var _this = this;
          if(this.disabled){
              this.$message({
                  showClose: true,
                  message: '警告哦，请完成验证',
                  type: 'warning'
              });
              return;
          }
          this.$refs.user.validate((valid) => {
              if(valid){
                this.user.password = this.getmd5(this.user.password);
                var loginParams = { username: _this.user.username, password: _this.user.password,place:_this.place};
                _this.logining = true;
                _this.toAdminLogin(loginParams).then(data=>{
                  if(data){
                      _this.$notify({
                          title: '成功',
                          message: '登录成功！',
                          type: 'success'
                      });
                      sessionStorage.setItem('user', JSON.stringify(_this.user));
                      sessionStorage.setItem('place', _this.place);
                      setTimeout(function(){
                         _this.logining = false;
                      },2000);
                      switch(_this.user.limit){
                        case 1:
                            this.$router.push({ path: '/admin' });
                          break;
                        case 2:
                          this.$router.push({ path: '/home' });
                          break;
                        case 3:
                          break
                      }
                  } else {
                    _this.$notify({
                          title: '失败',
                          message: '登录失败，用户名或密码错误！',
                          type: 'error'
                      });
                    _this.logining = false;
                    sessionStorage.removeItem('user');
                  }
                }).catch((error)=>{
                     _this.logining = false;
                });
              } else {
                console.log('error submit!!');
                return false;
              }
          })
      },
      ...mapActions([
          'toAdminLogin','isLogin'
      ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("../../static/images/post-bg-debug.png");
    background-size: cover;
}
#video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
#checkbox {
  margin: 0 90px 0 0;
}
.login-container {
    box-shadow: 0 0px 8px 0 rgba(255, 255, 255, 0.06), 0 1px 0px 0 rgba(255, 255, 255, 0.02);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 5% auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.remember {
    margin: 0px 0px 35px 0px;
}
#captcha {
    width: 400px;
    display: inline-block;
}
#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
</style>
