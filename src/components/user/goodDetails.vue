<template>
	<div class="goodDetails">
		<span @click="back" type="text" class="back">返回</span>
		<div class="left">
			<img :src="base+'/queryImages?img=goods/'+goodDetails.property+'/'+mid+maxImg" alt="">
			<div class="minImg">
				<img v-for="(item,index) in goodDetails.picture" :key="item" :src="base+'/queryImages?img=goods/'+goodDetails.property+'/'+min+item" alt="" @mousemove="toChange($event,item)">
			</div>
		</div>
		<div class="right">
			<header class="title">
				<span style="font-size: 24px;display:block;margin-top: 10px;">{{goodDetails.name}}</span></br>
				<span style="color: gray;font-size: 16px;display:block;margin-top: 40px;">{{goodDetails.details}}</span></br>
				价格&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;font-size: 18px;">¥{{goodDetails.price}}</span></br>
				<el-input-number size="mini" v-model="num" style="margin: 50px 0 30px;"></el-input-number></br>
				<el-button type="warning" @click="addCart">加入购物车</el-button>
				<el-button type="danger" @click="toPayment">立即下单</el-button>
			</header>
		</div>
	</div>
</template>

<script>
	import { base } from '@/api/api'
	import $ from 'jquery'
	export default {
		name: 'goodDetails',
		data(){
			return {
				base:base,
				num:1,
				min:'78_78',
				mid:'428_428',
				max:'800_800',
				maxImg:''
			}
		},
		methods:{
			toChange(event,item){
				this.maxImg = item;
				$(event.target).addClass('imgBorder').siblings().removeClass('imgBorder');
			},
			back(){
				this.$emit('back')
			},
			addCart(){
				this.goodDetails.goodsNum = this.num;
				this.$emit('addCart',this.goodDetails)
			},
			toPayment(){
				if(sessionStorage.getItem('user') == null){
					alert("请登录");
				} else {
					this.$emit('toPayment')
				}
			}
		},
		created(){
			this.maxImg=this.goodDetails.picture[0]
		},
		props:['goodDetails']
	}
</script>

<style>
.goodDetails {
	width: 90%;
	min-width: 1200px;
	max-width: 1300px;
	margin: 10px auto;
	background: #fff;
	display: flex;
	flex-direction: row;
	padding: 10px 0;
}
.goodDetails .back {
	width: 50px;
	position: relative;
	top: 0px;
	left: 10px;
	color: skyblue;
}
.goodDetails .back:hover {
	color: lightblue;
	cursor: pointer;
}
.goodDetails .left {
	width: 45%;
}
.goodDetails .left>img {
	display: block;
	width: 428px;
	margin: 0 auto;
	padding: 2px;
}
.goodDetails .left .minImg {
	width: 428px;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.imgBorder {
	border: 1px solid red;
}
.goodDetails .right {
	width: 55%;
}	
.goodDetails .right .title {
	margin-top: 50px;
	text-align: left;
}
.goodDetails .right .title .el-button {
	margin-top: 120px;
}
</style>