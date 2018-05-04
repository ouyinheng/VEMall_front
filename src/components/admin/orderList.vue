<template>
	<div class="orderList">
		<header class="title">订单列表</header>
		<div v-if="commList.length==0">
			<h3>没有订单</h3>
		</div>
		<div v-for="(item,index) in commList" :key="index">
			<el-table
		    :data="item"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <header id="title">订单号:{{props.row.orderid}}</header>
		        <el-steps :active="props.row.orderStatus+1" align-center>
				  <el-step title="下单" description="这是一段很长很长很长的描述性文字"></el-step>
				  <el-step title="付款" description="这是一段很长很长很长的描述性文字"></el-step>
				  <el-step title="支付审核" description="这是一段很长很长很长的描述性文字"></el-step>
				  <el-step title="交易成功" description="这是一段很长很长很长的描述性文字"></el-step>
				</el-steps>
				<div class="status">
					<h3>订单状态{{props.row.orderStatus}}</h3>
					<p>您的付款时间还有 22 小时 28 分 17 秒 ，超时后订单将自动取消。</p>
				</div>
				<div class="status">
					<h3>收货地址</h3>
					<span>姓名：{{props.row.site.name}}</span></br>
					<span>联系电话：{{props.row.site.tel}}</span></br>
					<span>详细地址：{{props.row.site.site}}</span></br>
				</div>
		      </template>
		    </el-table-column>
		    <el-table-column
		      :label="item[0].ordertime"
		      prop="displayImg"
		      
		      width="150">
		      <template slot-scope="scope">
		      	<img :src="base+'/queryImages?img=goods/allGoods/'+scope.row.displayImg" width="78px" alt="">
		      </template>
		    </el-table-column>
		    <el-table-column
		      :label="'订单号: '+item[0].orderid"
		      show-overflow-tooltip
		      
		      prop="longname">
		    </el-table-column>
		    <el-table-column
		      label="单价(元)"
		      
		      prop="price">
		      <template slot-scope="scope">
		      	<span>¥ {{scope.row.price}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="数量(个)"
		      
		      prop="orderNum">
		    </el-table-column>
		    <el-table-column
		      label="商品操作"
		      >
		      <template slot-scope="scope">
		      		<el-button type="danger" v-if="scope.row.orderStatus==1" @click="submitPay(scope.row.orderid)">确认支付成功</el-button>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="实付金额(元)"
		      
		      prop="price">
		      <template slot-scope="scope">
		      	<span>¥ {{scope.row.price*scope.row.orderNum}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="订单状态"
		      
		      @click="test"
		      prop="orderStatus">
		      <template slot-scope="scope">
		      	<span v-if="scope.row.orderStatus==0">等待付款</span>
		      	<span v-if="scope.row.orderStatus==1">支付审核中</span>
		      	<span v-if="scope.row.orderStatus==2">正在送货</span>
		      	<span v-if="scope.row.orderStatus==3">交易完成</span>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	</div>
</template>

<script>
	import { queryUserOrder,queryComm,base,getUserSite,editUserOrder } from '@/api/api'
	export default {
		name: 'orderList',
		data(){
			return {
				base:base,
				commList:[],
			}
		},
		methods:{
			tableRowClassName({row, rowIndex}) {
		        if (rowIndex === 1) {
		          return 'warning-row';
		        } else if (rowIndex === 3) {
		          return 'success-row';
		        }
		        return '';
		    },
		    test(){
		    	alert()
		    },
			getOrder(){
        		const _this = this;
        		queryUserOrder({id:null}).then(data=>{
        			_this.order = data;
        		}).catch()
        	},
        	queryComm(){
		    	this.commList = [];
		    	const _this = this;
				let id = JSON.parse(sessionStorage.getItem('user')).id;
				queryUserOrder({id:id}).then(data=>{
					for(let i=0;i<data.length;i++){
						let status = data[i].status;
						let time = data[i].order_time;
						let orderid = data[i].id;
						let siteid = data[i].site_id;
						let commInfo = JSON.parse(data[i].commodityInfo);
						getUserSite({id:siteid}).then(data=>{
							let site = data[0];
							for(let j=0;j<commInfo.length;j++){
								queryComm({id:commInfo[j].id}).then(data=>{
									data[0].orderNum = commInfo[j].num;
									data[0].orderStatus = status;
									data[0].ordertime = time;
									data[0].orderid = orderid;
									data[0].site = site;
									_this.commList.push(data);
								}).catch()
							}
						}).catch()
						
					}
				}).catch()
		    },
        	submitPay(id){
        		var tip = '确认用户已经支付成功?';
			    this.$confirm(tip, '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
                }).then(() => {
                	let obj = 'status';
                	let data = 2;
                	console.log(id,obj,data);
                    editUserOrder({id:id,obj:obj,data:data}).then(data=>{
                    	console.log(data,'---data')
						this.queryComm();
                    }).catch()
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });          
                });
        	}
		},
		created(){
			this.queryComm();
		}
	}
</script>

<style>
.orderList {
	width: 90%;
	margin: 0px 0 0 20px;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.orderList .title {
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
#title {
	display: block;
	box-sizing: border-box;
	width: 100%;
	height: 60px;
	line-height: 60px;
	margin-bottom: 20px;
	border-bottom: 1px solid #dcdcdc;
	border-color: rgba(0,0,0,.14);
	font-size: 20px;
	text-align: center;
	padding-left: 20px;
}
.orderList .status{
	background: #f6f6f6;
	border: 1px solid #dadada;
	border-radius: 5px;
	padding: 22px 30px 20px;
	margin: 20px 30px 30px;
	line-height: 38px;
	text-align:center;
}
.orderList .status>p {
	border-top: 1px solid #dcdcdc;
	margin-top: 20px;
	padding-top: 26px;
}
.hotCard {
	display: inline-block;
	width: 100%;
	box-sizing: border-box;
	padding: 40px;
	background: #fff;
	transition: all .2s linear 0s;
}
.hotCard:hover {
	cursor: pointer;
	box-shadow: 0 10px 15px rgba(0,0,0,0.07);
	transform: translate3d(0px,-2px,0px);
	z-index: 2;
}	
</style>