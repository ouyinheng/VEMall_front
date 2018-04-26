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
						<span>公司介绍</span>
						<span>华为商城简介</span>
						<span>华为线下门店</span>
						<span>荣耀线下门店</span>
						<span>诚征英才</span>
			  		</div>
			  		<div>
			  			<span>友情链接</span>
			  			<span>华为商城手机版</span>
						<span>华为官网</span>
						<span>荣耀官网</span>
						<span>花粉俱乐部</span>
						<span>网站地图</span>
			  		</div>
		  		</div>
		  	</footer>
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
.el-header{
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
	padding-bottom: 80px;
    background-color: #E9EEF3;
    text-align: center;
    /*color: #333;
    line-height: 500px;*/
}
.myfooter {
	width: 100%;
	background: RGB(245,245,245);
}
.myfooter .mycenter {
	width: 70%;
	margin: 0 auto;
    color: #333;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.myfooter .mycenter>div {
	width: 200px;
	height: 180px;
	padding: 10px 0;
	text-align: left;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.myfooter .mycenter>div>span:nth-of-type(1){
	display: block;
	margin: 10px 0;
	color: #000;
}
.myfooter .mycenter>div>span {
	font-size: 14px;
	color: gray;
}
</style>