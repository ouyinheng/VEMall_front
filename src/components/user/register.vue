<template>
	<div class="register">
		<div class="regCard">
	      	<el-form :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		      <h3 class="title">注册mall会员</h3>
		      <el-form-item prop="username">
		        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
		      </el-form-item>
		      <el-form-item prop="password">
		        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
		      </el-form-item>
		      <el-form-item prop="email">
		        <el-input type="text" :disabled="emailDis" v-model="user.email" auto-complete="off" placeholder="邮箱账号"></el-input>
		      </el-form-item>
		      <el-form-item c
		      <el-form-item class="userMail">
		      	<el-input type="text" v-model="user.emailAuth" auto-complete="off" placeholder="邮箱验证码" @blur="regMail"></el-input>
				<o_countDown class="userCountDown" @getAuthCode="getAuthCode"></o_countDown>
		      </el-form-item>
		      <el-form-item>
		        <div>
		            <div id="captcha">
		              <el-button :loading="true" id="wait" class="show" v-show="isShow">正在加载验证码......</el-button>
		            </div>
		        </div>
		      </el-form-item>
		      <el-form-item style="width:100%;">
		        <el-button :disabled="disabled" type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">注册</el-button>
		      </el-form-item>
		    </el-form>
		</div>
	</div>
</template>

<script>
	import gt from '@/assets/js/gt.js'
	import { toVerify,toVerifyMailNum ,toReg} from '@/api/api'
	import o_countDown from '@/components/user/countDown'
	import { toFindPwd } from '@/api/api'
	export default {
		name: 'register',
		data(){
			return {
				disabled:true,
				logining:false,
				isShow:true,
				emailDis:false,
				ver:false,
				regm:false,
				user:{
					username:'',
					password:'',
					email:'ouyinheng@163.com',
					emailAuth:''
				},
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
			}
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
	    },
	    components:{
	    	o_countDown
	    },
		methods:{
			//验证码
	      verify(captchaObj) {
	          var _this = this;
	          captchaObj.appendTo('#captcha');
	          captchaObj.onReady(function () {
	              _this.isShow = false;
	          });
	          captchaObj.onSuccess(function () {
	              // _this.isLogin();
	              	_this.ver = true;
	              	if(_this.regm&&_this.ver){
	      				_this.disabled = false;
	      		 	}
	          })
	      },
	      getAuthCode(){
	      		this.emailDis = true;
	      		const _this = this;
	      		let param = _this.user.email+''
				toFindPwd({param:param}).then(data=>{
					console.log(data);
				}).catch(error=>{
					
				});
	      },
	      regMail(){
	      	const _this = this;
	      	let param = {
	      		email:_this.user.email,
	      		emailAuth:_this.user.emailAuth
	      	}
	      	//输入框失去焦点后，得到邮箱的值
	      	toVerifyMailNum(param).then(data=>{
	      		if(data){
	      			_this.regm = true;
	      			if(_this.regm&&_this.ver){
	      				_this.disabled = false;
	      			}
	      		}
	      	}).catch()
	      },
	      handleSubmit(){
	      	//	注册
	      	const _this = this;
	      	toReg(_this.user).then(data=>{
	      		if(data){
	      			this.$message({
			          showClose: true,
			          message: '恭喜你，注册成功!',
			          type: 'success'
			        });
			        this.$router.push('/login');
	      		}
	      	}).catch();
	      }
		}	
	}
</script>

<style>
	.register {
		width: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}
	.register .regCard {
		box-shadow: 0 0px 8px 0 rgba(255, 255, 255, 0.06), 0 1px 0px 0 rgba(255, 255, 255, 0.02);
	    -webkit-border-radius: 5px;
	    border-radius: 5px;
	    -moz-border-radius: 5px;
	    background-clip: padding-box;
	    margin: 5% auto;
	    width: 400px;
	    padding: 35px 35px 15px 35px;
	    background: #fff;
	    border: 1px solid #eaeaea;
	    box-shadow: 0 0 25px #cac6c6;
	}
	.register .regCard .title {
		margin: 10px 0 20px;
		text-align: center;
	}
	.userMail .el-input{
		width: 70%;
		float: left;
	}
	.userMail .userCountDown {
		float: right;
	}
</style>