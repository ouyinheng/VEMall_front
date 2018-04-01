<template>
  <div class="hello">
    <el-form :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'Login',
  data() {
      return {
        logining: false,
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
    created:function(){
      history.pushState(null, null, location.href);
    },
    computed:{
      ...mapState(['bool','user'])
    },
    methods: {
      handleReset2() {
        
      },
      handleSubmit(ev) {
          var _this = this;
          this.$refs.user.validate((valid) => {
              if(valid){
                var loginParams = { username: _this.user.username, password: _this.user.password};
                _this.logining = true;
                _this.toLogin(loginParams).then(data=>{
                  if(_this.bool){
                      _this.$notify({
                          title: '成功',
                          message: '登录成功！',
                          type: 'success'
                      });
                      sessionStorage.setItem('user', JSON.stringify(_this.user));
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
                });
              } else {
                console.log('error submit!!');
                return false;
              }
          })
      },
      ...mapActions([
          'toLogin'
      ])
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
