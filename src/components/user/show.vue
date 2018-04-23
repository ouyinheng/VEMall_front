<template>
	<div class="show">
		<el-container>
		  	<el-header>
		  		<headTop @toPopup="dialogVisible = true" @logout="logout" :user="sendUser" :bool="sendBool" :treasure="treasure" @toPayment="toPayment"></headTop>
		  	</el-header>
		  	<el-main class="contain" v-if="mainShow">
		  		<router-view @addCart="addCart" @toPayment="toPayment"/>
		  	</el-main>
		  	<el-footer>Footer</el-footer>
		</el-container>
		<el-dialog
		  title="系统登录"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  	<el-form :model="user" :rules="rules2" ref="user" label-position="left" label-width="0px" class="demo-ruleForm login-container">
		      <el-form-item prop="username">
		        <el-input type="text" v-model="user.username" auto-complete="off" placeholder="账号"></el-input>
		      </el-form-item>
		      <el-form-item prop="password">
		        <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
		      </el-form-item>
		      <el-checkbox id="checkbox" v-model="checked" checked class="remember">记住密码</el-checkbox>
		      <el-button id="btn1" type="text" @click="toReg">注册MALL账号</el-button>
		      <el-button type="text" @click='toForget'>忘记密码?</el-button>
		    </el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary"  @click="onSubmit">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import gt from '@/assets/js/gt.js'
	import { requestLogin } from '@/api/api'
	import headTop from '@/components/user/headTop'
	export default {
		name: 'show',
		data(){
			return {
				mainShow:true,
				detailShow:false,
				orderShow:false,
				dialogVisible: false,
				user: {
		          username: '',
		          password: '',
		        },
		        sendUser:{},
		        sendBool:'',
		        treasure:[],//商品
		        goodDetails:{},//当前页商品
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
		        checked: true,
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
		    	console.log(data);
		    },
			onSubmit() {
				const _this = this;
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
		    		sessionStorage.removeItem('user');
		            this.sendBool = false;
		    		this.sendUser = {};
		    		this.mainShow = true;
			    	this.detailShow = false;
			    	this.orderShow = false;
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

<style scoped>
.el-header,.el-footer {
	width: 100%;
	height: 80px!important;
    background-color: #B3C0D1;
    color: #333;
    line-height: 80px;
}
.el-header {
	position: fixed;
	top: 0;
	left: 0;
	background-color: RGB(3,3,3);
	box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
	z-index: 100;
} 
.el-main {
	margin-top: 80px;

    background-color: #E9EEF3;
    text-align: center;
    /*color: #333;
    line-height: 500px;*/
}
.el-footer {
}
/* .contain {
	width: 100%;
	position: absolute;
	top: 60px;
	left: 0;
	bottom: 160px;
} */
/* .show_head {
	width: 85%;
	height: 60px;
	margin: 0 auto;
	line-height: 60px;
	color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.show_head ul {
	width: 100%;
	height: 60px;
	line-height: 60px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.show_head ul:nth-of-type(1) {
	width: 60%;
	margin-right: 40px;
}
.show_head ul:nth-of-type(2) {
	width: 40%;
	margin-left: 10px;
} */
</style>