<template>
	<div class="show">
		<el-container>
		  	<el-header>
		  		<headTop @toPopup="dialogVisible = true" @logout="logout" :user="sendUser" :bool="sendBool" :treasure="treasure" @toPayment="toPayment"></headTop>
		  	</el-header>
		  	<el-main class="contain" v-if="mainShow">
		  		<!-- 轮播图 -->
		  		<el-carousel :interval="5000" height="600px">
				    <el-carousel-item v-for="(item,index) in img" :key="index">
				      	<img :src="item.url" alt="" width="100%" height="100%">
				    </el-carousel-item>
				</el-carousel>
				<hot @toBuyPage="toBuyPage"></hot>
				<huawei></huawei>
				<!-- 品牌精选 -->
				<handpick @toBuyPage="toBuyPage"></handpick>
				<!-- 特色 -->
				<feature></feature>
		  	</el-main>
		  	<el-main class="contain" v-if="detailShow">
		  		<!-- 商品详情 -->
		  		<goodDetails :goodDetails="goodDetails" @back="back" @addCart="addCart" @toPayment="toPayment"></goodDetails>
		  		
		  	</el-main>
		  	<el-main class="contain" v-if="orderShow">
		  		<!-- 订单页 -->
		  		<order :data="goodDetails" @back="back"></order>
		  		
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
	import feature from '@/components/user/feature'
	import hot from '@/components/user/hot'
	import huawei from '@/components/user/huawei'
	import handpick from '@/components/user/handpick'
	import goodDetails from '@/components/user/goodDetails'
	import order from '@/components/user/order'
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
		        //模拟数据
		        img:[{
		        	url:'@/../static/images/head/054142e3-076f-4ce8-95e2-5d6559582176.jpg'
		        },{
		        	url:'@/../static/images/head/19441725-bfe9-4624-ab84-5a72a4ab8bfb.jpg'
		        },{
		        	url:'@/../static/images/head/3831480a-b1a7-4ca3-a8e0-9d5656d86217.jpg'
		        },{
		        	url:'@/../static/images/head/5c4b2a4e-441b-417d-8eb8-45757a048bcd.jpg'
		        },{
		        	url:'@/../static/images/head/5d8e9d35-6ff4-4918-904e-8b57c96c20c9.jpg'
		        },{
		        	url:'@/../static/images/head/d7350a20-cd03-4305-909f-55ceef2b4de7.jpg'
		        },{
		        	url:'@/../static/images/head/f92f925a-f434-4b83-95f6-06c50a96c259.jpg'
		        }]
			}
		},
		components:{
			headTop,feature,hot,huawei,handpick,goodDetails,order
		},
		methods:{
			handleClose(done) {
		        this.$confirm('确认关闭？').then(_ => {
		            done();
		        }).catch(_ => {});
		    },
		    toBuyPage(data){
		    	this.mainShow = false;
		    	this.detailShow = true;
		    	this.orderShow = false;
		    	let picture = [];
		    	for(let i=0;i<data.picture.length;i++){
		    		let arr = data.picture[i].url.split('_');
		    		if(arr[0] == '78'){
		    			let url = '';
		    			for(let j=2;j<arr.length;j++){
		    				url += "_"+arr[j];
		    			}
						picture.push(url);
		    		}
		    	}
		    	data.picture = picture;
		    	this.goodDetails = data;
		    },
		    back(){
		    	this.mainShow = true;
		    	this.detailShow = false;
		    	this.orderShow = false;
		    },
		    addCart(data){
		    	//添加商品到购物车,详情页
		    	if(this.treasure.length==0){
		    		var newArrCopy = JSON.parse(JSON.stringify(data))
		    		this.treasure.push(newArrCopy);
		    	} else {
		    		var bool = true
		    		for(let i=0;i<this.treasure.length;i++){
			    		if(data.id == this.treasure[i].id){
			    			const num = data.goodsNum + this.treasure[i].goodsNum;
			    			data.goodsNum += this.treasure[i].goodsNum ;
			    			this.treasure.splice(i,1);
			    			var newArrCopy = JSON.parse(JSON.stringify(data))
		    				this.treasure.push(newArrCopy);
			    			bool = false;
			    		}
			    	}
			    	if(bool){
				    	this.treasure.push(data);
			    	}
		    	}
		    	
		    },
		    toPayment(){
		    	//去支付,订单页
		    	this.mainShow = false;
		    	this.detailShow = false;
		    	this.orderShow = true;
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
		}
	}
</script>

<style scoped>
.el-header,.el-footer {
	width: 100%;
	height: 80px;
    background-color: #B3C0D1;
    color: #333;
    line-height: 80px;
}
.el-header {
	position: fixed;
	top: 0;
	left: 0;
	background-color: RGB(68,68,68);
	box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
	z-index: 100;
} 
.el-main {
	margin-top: 60px;

    background-color: #E9EEF3;
    text-align: center;
    /*color: #333;
    line-height: 500px;*/
}
.contain {
	padding: 0;

}

/*轮播图*/
.el-carousel {
	
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
#checkbox {
  margin: 0 90px 0 0;
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