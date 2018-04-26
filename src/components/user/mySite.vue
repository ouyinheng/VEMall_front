<template>
	<div class="mySite">
		<header class="title">收货地址</header>
		<div class="site">
			<div v-for="(item,index) in userInfo" :key="index" style="cursor:pointer;margin:0 14px 10px 0;" @click="editSite(index)" :class="{twoSite:item.status==1}">
				<div style="width:290px;height:100px;margin: 30px auto 0;font-size:14px;color: gray;">
					<span>收货人:&nbsp;&nbsp;&nbsp;{{item.name}}</span></br>
					<span>收货地址:&nbsp;&nbsp;&nbsp;{{item.site}}</span></br>
					<span>手机号码:&nbsp;&nbsp;&nbsp;{{item.tel}}</span></br>
				</div>
				<span class="el-icon-check status" v-if="item.status == 1"></span>
			</div>
			<div style="cursor:pointer;"  @click="dialogFormVisible = true">
				<div style="width:70px;height:100px;margin: 50px auto 0;font-size:14px;color: gray;text-align:center;">
					<span class="el-icon-circle-plus" style="font-size:24px;"></span></br>
					<span style="font-size:14px;">使用新地址</span>
				</div>
			</div>
		</div>
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible" style="width: 1200px;margin: 0 auto;">
		  <el-form :model="form">
		    <el-form-item label="收货人" :label-width="formLabelWidth">
		      <el-input v-model="form.name" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="收货地址" :label-width="formLabelWidth">
		      <el-input v-model="form.site" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="手机号码" :label-width="formLabelWidth">
		      <el-input v-model="form.tel" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submit">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>

<script>
	import { base,addUserInfo,getUserInfo,editUserInfo,addUserOrder } from '@/api/api'
	export default {
		name: 'mySite',
		data(){
			return {
				base:base,
				goodsList:[],
				userInfo:[],
				dialogFormVisible: false,
				form: {
		        	id:'',
			        name: '',
			        site:'',
			        tel:'',
			        status:0
		        },
		        formLabelWidth: '120px'
			}
		},
		methods:{
			back(){
				this.$emit('back')
			},
			handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    getUserInfo(){
		    	const _this = this;
				const data={id:JSON.parse(sessionStorage.getItem('user')).id}
				getUserInfo(data).then(data=>{
					_this.userInfo = data;
				}).catch()
		    },
		    editSite(index){
		    	const _this = this;
		    	if(this.userInfo[index].status != 1){
		    		for(let i=0;i<this.userInfo.length;i++){
		    			if(this.userInfo[i].status == 1){
		    				editUserInfo({id:_this.userInfo[i].id,status:0}).then().catch()
		    			}
		    		}
		    		editUserInfo({id:_this.userInfo[index].id,status:1}).then(()=>{
		    			_this.getUserInfo();
		    		}).catch();
				}
		    },
			addOrder(){
				if(this.multipleSelection.length == 0){
					this.$message.error('请选择要购买的商品');
				} else {
					let loadingInstance = Loading.service('正在提交订单');
					let commInfo = {};
					commInfo.commodityInfo = [];
					for(let i=0;i<this.userInfo.length;i++){
						if(this.userInfo[i].status == 1){
							commInfo.user_id = this.userInfo[i].personnel_id;
							commInfo.site_id = this.userInfo[i].id;
						}
					}
					for(let i=0;i<this.multipleSelection.length;i++){
						commInfo.commodityInfo.push({id:this.multipleSelection[i].id,num:this.multipleSelection[i].goodsNum})
					}
					var date = new Date();
					var time = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
					commInfo.order_time = time;
					console.log(commInfo);
					addUserOrder(commInfo).then(data=>{
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
						  	loadingInstance.close();
						  	localStorage.removeItem('goodsList');
							this.$router.push('/success');
						});
					}).catch(error=>{
						this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
						  	loadingInstance.close();
						  	this.$message.error('订单提交失败!');
						});
					})
					// console.log(this.multipleSelection);
				}
			},
		    submit(){
		    	this.dialogFormVisible = false;
		    	const _this = this;
		    	this.form.id = JSON.parse(sessionStorage.getItem('user')).id
		    	addUserInfo(_this.form).then(data=>{
		    		_this.form = {
				        	id:'',
					        name: '',
					        site:'',
					        tel:'',
					        status:0
				        }
			        _this.getUserInfo();
		    	}).catch(error=>{
		    		console.log(error);
		    	})
		    }
		},
		created(){
			this.goodsList = JSON.parse(localStorage.getItem('goodsList'));
		    this.getUserInfo();
		}
	}
</script>

<style>
.mySite {
	width: 1000px;
	margin: 0px 0 0 20px;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.mySite>span {
	display: block;
	margin: 10px;
	cursor: pointer;
}
.mySite .site {
	width: 100%;
	text-align: left;
	box-sizing: border-box;
	padding: 20px 20px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.mySite .site .twoSite {
	border: 1px solid skyblue;
}
.mySite .site .status {
	position: relative;
	top: -120px;
	right: -240px;
	color: lightgreen;
	font-size: 30px;
}
.mySite .site>div{
	width: 300px;
	height: 150px;
	/*border: 1px solid lightgreen;*/
	border: 1px solid #e5e5e5;
	border-radius: 4px;
}
.mySite .site>span {
	font-size: 26px;
}
.mySite .title {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 20px;
	border-bottom: 1px solid #dcdcdc;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	text-align: left;
	padding-left: 20px;
}	
</style>