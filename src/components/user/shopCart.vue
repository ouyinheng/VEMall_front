<template>
	<div class="order">
		<section class="orderGoodsList">
			<header class="title">收货地址</header>
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
				      	  <!-- <img v-lazy="img.src" > -->
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
				      <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
			  			<el-button type="primary" style="margin-top:10px;background-image:linear-gradient(180deg,#678ee7,#5078df)">现在结算</el-button>
			  		</div>
			  	</div>
			</div>
		</section>
		
	</div>
</template>

<script>
	import { base } from '@/api/api'
	export default {
		name: 'order',
		data(){
			return {
				base:base,
				goodsList:[],
			 	multipleSelection: []
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
		    }
		},
		created(){
			this.goodsList = JSON.parse(localStorage.getItem('goodsList'));
		}
	}
</script>

<style>
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
}
.orderGoodsList>span {
	display: block;
	margin: 10px;
	cursor: pointer;
}
.orderGoodsList .site {
	width: 100%;
	text-align: left;
	box-sizing: border-box;
	padding: 20px 50px;
}
.orderGoodsList .site>span {
	font-size: 26px;
}
.orderGoodsList .title {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 20px;
	border-bottom: 1px solid #d4d4d4;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 1px 7px rgba(0,0,0,.06);
	background: linear-gradient(#fbfbfb,#ececec);
	/*border-color: rgba(0,0,0,.14);*/
	text-align: left;
	padding-left: 20px;
}
.order .operate {
	width: 100%;
	height: 80px;
	background: linear-gradient(#fdfdfd,#f9f9f9);
	border-top: 1px solid #e9e9e9;
	box-shadow: 0 -3px 8px rgba(0,0,0,.04);
	z-index: 1;
}
.order .operate>.del {
	text-align: left;
}
.order .operate>.buy {
	width: 40%;
	height: 60px;
	/*line-height: 60px;*/
	padding: 10px 20px;
	text-align: left;
	float: right;
	display: flex;;
	flex-direction: row;
	justify-content: space-around;
}
.order .operate>.buy .goods {
	box-sizing: border-box;
	height: 60px;
	/*line-height: 60px;*/
	display: flex;
	flex-direction: column;
	padding: 10px 20px;
}
.order .operate>.buy .price {
	box-sizing: border-box;
	height: 60px;
	/*line-height: 60px;*/
	padding: 10px 20px;
	border-left: 1px solid #e1e1e1;
}
</style>