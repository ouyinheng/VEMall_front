<template>
	<div class="order">
		<section class="orderGoodsList">
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
		</section>
		
		<section class="orderGoodsList">
			<header class="title">购物清单</header>
			<el-table
			    ref="multipleTable"
			    :data="goodsList"
			    tooltip-effect="dark"
			    style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="图片"
			      width="110">
			      <template slot-scope="scope">
				      	<img v-lazy="base+'/queryImages?img=goods/allGoods/'+scope.row.displayImg" alt="" width="78px">
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="longname"
			      label="商品"
			      width="550"
			      show-overflow-tooltip>
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="价格">
			      <template slot-scope="scope">
			      	¥{{scope.row.price}}
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="goodsNum"
			      label="数量"
			      width="150">
			      <template slot-scope="scope">
			      	<el-input-number size="mini" v-model="scope.row.goodsNum" :min="1"></el-input-number>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="小计"
			      width="120">
			      <template slot-scope="scope">
				      ¥{{scope.row.goodsNum*scope.row.price}}
				  </template>
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="120">
			      <template slot-scope="scope">
				      <el-button type="danger" icon="el-icon-delete" circle @click="delGoods(scope.row.id)"></el-button>
				  </template>
			    </el-table-column>
			</el-table>
			<div class="operate">
			  	<div class="del">
			  		
			  	</div>
			  	<div class="buy">
			  		<div class="goods">
			  			<span>已选择<b style="color:red;padding: 0 10px;">{{multipleSelection.length}}</b>件商品</span>
			  			<span style="font-size:14px;color:gray;">共{{goodsList.length}}件商品</span>
			  		</div>
			  		<div class="price">
			  			<span>应付总额: <b style="color:red;padding: 0 10px;">¥{{nowMon}}</b></span></br>
			  			<span style="font-size:14px;color:gray;">应付总额不含运费</span>
			  		</div>
			  		<div class="button">
			  			<el-button type="primary" style="margin-top:10px;background-image:linear-gradient(180deg,#678ee7,#5078df)" @click='addOrder'>现在结算</el-button>
			  		</div>
			  	</div>
			</div>
		</section>
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
	import $ from 'jquery'
	import { Loading } from 'element-ui'
	import { base,addUserInfo,getUserInfo,editUserSite,addUserOrder } from '@/api/api'
	export default {
		name: 'order',
		data(){
			return {
				base:base,
				goodsList:[],
			 	multipleSelection: [],
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
		computed:{
			nowMon(){
				let price = 0;
				for(let i=0;i<this.multipleSelection.length;i++){
					price += this.multipleSelection[i].price*this.multipleSelection[i].goodsNum;
				}
				return price;
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
		    delGoods(id){
		    	console.log(id);
		    	console.log(this.goodsList);
		    	const _this = this;
		    	this.goodsList.forEach(function(item,index){
		    		if(item.id == id){
		    			_this.goodsList.splice(index,1);
		    		}
		    	})
		    	sessionStorage.setItem('goodsList',JSON.stringify(this.goodsList));
		    	localStorage.setItem('goodsList',JSON.stringify(this.goodsList));
		    },
		    editSite(index){
		    	const _this = this;
		    	if(this.userInfo[index].status != 1){
		    		for(let i=0;i<this.userInfo.length;i++){
		    			if(this.userInfo[i].status == 1){
		    				editUserSite({id:_this.userInfo[i].id,status:0}).then().catch()
		    			}
		    		}
		    		editUserSite({id:_this.userInfo[index].id,status:1}).then(()=>{
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

<style lang='scss' scoped>
.order {
	.orderGoodsList {
		width: 70%;
		min-width: 1200px;
		margin: 30px auto;
		height: 100%;
		text-align: left;
		background: #fff;
		border: 1px solid #dcdcdc;
		border-radius: 8px;
		box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
		border-color: rgba(0,0,0,.14);
		/*overflow-y: auto;*/
		overflow-x: hidden;
		>span {
			display: block;
			margin: 10px;
			cursor: pointer;
		}
		.site {
			width: 100%;
			text-align: left;
			box-sizing: border-box;
			padding: 20px 20px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.twoSite {
				border: 1px solid skyblue;
			}
			.status {
				position: relative;
				top: -120px;
				right: -240px;
				color: lightgreen;
				font-size: 30px;
			}
			>div{
				width: 300px;
				height: 150px;
				border: 1px solid #e5e5e5;
				border-radius: 4px;
			}
			>span {
				font-size: 26px;
			}
		}
		.title {
			width: 100%;
			height: 60px;
			line-height: 60px;
			font-size: 20px;
			border-bottom: 1px solid #d4d4d4;
			border-radius: 8px 8px 0 0;
			box-shadow: 0 1px 7px rgba(0,0,0,.06);
			background: linear-gradient(#fbfbfb,#ececec);
			text-align: left;
			padding-left: 20px;
		}
	}
	.operate {
		width: 100%;
		height: 80px;
		background: linear-gradient(#fdfdfd,#f9f9f9);
		border-top: 1px solid #e9e9e9;
		box-shadow: 0 -3px 8px rgba(0,0,0,.04);
		z-index: 1;
		>.del {
			text-align: left;
		}
		>.buy {
			width: 40%;
			height: 60px;
			padding: 10px 20px;
			text-align: left;
			float: right;
			display: flex;;
			flex-direction: row;
			justify-content: space-around;
			.goods {
				box-sizing: border-box;
				height: 60px;
				display: flex;
				flex-direction: column;
				padding: 10px 20px;
			}
			.price {
				box-sizing: border-box;
				height: 60px;
				padding: 10px 20px;
				border-left: 1px solid #e1e1e1;
			}
		}
	}
}
</style>