<template>
	<div class="show">
		<el-container>
		  	<el-header>
		  		<headTop @toPopup="dialogVisible = true" @logout="logout" :user="sendUser" :bool="sendBool" :treasure="treasure" @toPayment="toPayment"></headTop>
		  	</el-header>
		  	<el-main class="contain" v-if="mainShow">
		  		<router-view @addCart="addCart" @toPayment="toPayment" />
		  	</el-main>
		  	<footer class="myfooter">
		  		<div class="mycenter">
		  			<div>
						<span>购物相关</span>
						<span>购物指南</span>
						<span>配送方式</span>
						<span>支付方式</span>
						<span>常见问题</span>
		  			</div>
			  		<div>
			  			<span>保修与退换货</span>
						<span>保修政策</span>
						<span>退换货政策</span>
						<span>退换货流程</span>
						<span>保修状态查询</span>
			  		</div>
			  		<div>
			  			<span>关于我们</span>
			  			<span><a href="https://ouyinheng.github.io/" target="_blank">个人博客</a></span>
			  			<span><a href="https://github.com/ouyinheng/VEMall_front" target="_blank">github</a></span>
			  			<span><a href="https://gitee.com/ouyinheng/VEMall" target="_blank">gitee</a></span>
			  		</div>
			  		<div>
			  			<span>友情链接</span>
			  			<span><a href="https://cn.vuejs.org/" target="_blank">vue</a></span>
			  			<span><a href="http://element-cn.eleme.io/#/zh-CN/" target="_blank">Element-UI</a></span>
			  		</div>
		  		</div>
		  	</footer>
		</el-container>
		<el-dialog
		  title="系统登录"
		  :visible.sync="dialogVisible"
		  width="500px"
		  :before-close="handleClose">
		  	<el-form :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		      <el-form-item prop="username">
		        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
		      </el-form-item>
		      <el-form-item prop="password">
		        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
		      </el-form-item>
		      <el-checkbox id="checkbox" v-model="checked" checked class="remember">记住密码</el-checkbox>
		      <el-button id="btn1" type="text" @click="toReg" style="margin-left: 100px;">注册MALL账号</el-button>
		      <el-button type="text" @click='toForget'>忘记密码?</el-button>
		    </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" :disabled="loginBool"  @click="onSubmit">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import gt from '@/assets/js/gt.js'
	import { requestLogin,requestLogout } from '@/api/api'
	import headTop from '@/components/user/headTop'
	import crypto from 'crypto'
	export default {
		name: 'show',
		data(){
			var validateUserName = (rule, value, callback) => {
				const _this = this;
		        if (!value) {
		        	_this.loginBool = true;
		          	return callback(new Error('账号不能为空'));
		        }
		        setTimeout(() => {
					var regex=/^[_A-Za-z]{5,10}[0-9A-Za-z]$/g
					var a=regex.test(value);
		          	if (!a) {
		          		_this.loginBool = true;
		            	callback(new Error('只能含有字母,下划线开头,可包含数字,最小6位数,最大11位数'));
		          	} else {
		          		_this.loginBool = false;
		            	callback();
		          	}
		        }, 1000);
		    };
			return {
				mainShow:true,
				detailShow:false,
				orderShow:false,
				dialogVisible: false,
				user: {
		          username: '',
		          password: '',
		        },
		        loginBool:true,
		        sendUser:{},
		        sendBool:'',
		        treasure:[],//商品
		        goodDetails:{},//当前页商品
		        rules2: {
		          username: [
		            { required: true, message: '请输入账号', trigger: 'blur' },
		            { validator: validateUserName, trigger: 'blur' }
		          ],
		          password: [
		            { required: true, message: '请输入密码', trigger: 'blur' }
		          ]
		        },
		        checked: true
			}
		},
		components:{
			headTop
		},
		methods:{
			handleClose(done) {
		        this.$confirm('确认关闭？').then(_ => {
		            done();
		        }).catch(_ => {});
		    },
		    addCart(data){
		    	this.treasure = data;
		    },
		    toPayment(data){
		    	//去支付,订单页
		    	// console.log(data);
		    	localStorage.setItem('goodsList',JSON.stringify(data));
		    	this.$router.push('/order');
		    },
		    getmd5(data){
	            var a;
	            var md5 = crypto.createHash("md5");
	            md5.update(data);
	            var a = md5.digest('hex');
	            return a;
	      	},
			onSubmit() {
				const _this = this;
				this.user.password = this.getmd5(this.user.password);
		        requestLogin(this.user).then(data=>{
		        	if(data){
		        		if(data.status == '0'){
			        		this.$message({
					          showClose: true,
					          message: '账户被封，请联系管理员!',
					          type: 'warning'
					        });
			        	} else {
							_this.dialogVisible = false;
							this.$message({
					          showClose: true,
					          message: '恭喜你，登录成功!',
					          type: 'success'
					        });
					        _this.sendUser = data;
					        _this.sendBool = true;
					        sessionStorage.setItem('user', JSON.stringify(data));
					        // console.log(data);
			        	}
		        	} else {
		        		this.$message({
				          showClose: true,
				          message: '登录失败!',
				          type: 'error'
				        });
		        	}
		        }).catch()
		    },
		     //找回密码
		    toForget(){
		        this.$router.push('forget');
		    },
		    //去注册
		    toReg(){
		      	this.$router.push('register');
		    },
		    logout(){
		    	this.$confirm('确认退出？').then(_ => {
		    		var user = sessionStorage.getItem('user');
		    		requestLogout({user:user}).then(data=>{
		    			sessionStorage.removeItem('user');
			            this.sendBool = false;
			    		this.sendUser = {};
			    		this.mainShow = true;
				    	this.detailShow = false;
				    	this.orderShow = false;
				    	this.$router.push('/');
		    		}).catch(error=>{

		    		})
		    		
		        }).catch(_ => {});
		    	
		    }
		},
		created(){
			this.sendUser = JSON.parse(sessionStorage.getItem('user'));
			if(this.sendUser != null){
				this.sendBool = true;
			}
			this.treasure = JSON.parse(localStorage.getItem('treasure'));
		}
	}
</script>

<style lang="scss" scoped>
.el-header{
	width: 100%;
	height: 80px!important;
    line-height: 80px;
    position: fixed;
	top: 0;
	left: 0;
    color: #333;
	background-color: RGB(3,3,3);
	box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
	z-index: 100;
}
.el-main {
	margin-top: 80px;
	padding-bottom: 80px;
    background-color: #E9EEF3;
    text-align: center;
    padding-left: 0;
    padding-right: 0;
}
.myfooter {
	width: 100%;
	background: RGB(245,245,245);
	.mycenter {
		width: 70%;
		margin: 0 auto;
	    color: #969696;
	    font-size: 14px;
	    font-style: normal;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		>div {
			width: 200px;
			height: 180px;
			padding: 10px 0;
			text-align: left;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			span {
				display: block;
				padding: 4px 0;
				a {
					text-decoration: none;
					color: #969696;
				 	font-style: normal;
				}
			}
			span:first-child {
				color: #333;
			}
			
		}
		>span:nth-of-type(1){
			display: block;
			margin: 10px 0;
			color: #000;
		}
		>span {
			font-size: 14px;
			color: gray;
		}
	}
}
</style>