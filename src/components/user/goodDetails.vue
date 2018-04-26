<template>
	<div>
		<div class="goodDetails">
			<div class="left">
				<img :src="base+'/queryImages?img=goods/'+goodDetails.property+'/'+mid+maxImg" alt=""  class="midImg">
				<div class="minImg">
					<img v-for="(item,index) in goodDetails.picture" :key="item" :src="base+'/queryImages?img=goods/'+goodDetails.property+'/'+min+item" alt="" @mousemove="toChange($event,item)">
				</div>
			</div>
			<div class="right">
				<header class="title">
					<span style="font-size: 24px;display:block;margin-top: 10px;">{{goodDetails.longname}}</span></br>
					<span style="color: gray;font-size: 16px;display:block;margin-top: 40px;">{{goodDetails.details}}</span></br>
					价格&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: red;font-size: 18px;">¥{{goodDetails.price}}</span></br>
					<el-input-number size="mini" v-model="num" :min="1" style="margin: 50px 0 30px;"></el-input-number></br>
					<el-button type="warning" @click="addCart">加入购物车</el-button>
					<el-button type="danger" @click="toPayment">立即下单</el-button>
				</header>
			</div>
		</div>
		<!-- <img :src="base+'/queryImages?img=goods/'+goodDetails.property+'/'+max+maxImg" alt="" id="maxImg"> -->

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
				maxImg:'',
				goodDetails:'',
				bool:true
			}
		},
		methods:{
			toChange(event,item){
				this.maxImg = item;
				$(event.target).addClass('imgBorder').siblings().removeClass('imgBorder');
			},
			addCart(){
				this.goodDetails.goodsNum = this.num;
				var goodsArr = JSON.parse(localStorage.getItem('treasure'));
				if(goodsArr == null){
					goodsArr = [];
					goodsArr.push(this.goodDetails);
				} else {
					for(let i=0;i<goodsArr.length;i++){
						if(goodsArr[i].id == this.goodDetails.id){
							goodsArr[i].goodsNum += this.num;
							this.bool = false;
						}
					}
					if( this.bool ){
						goodsArr.push(this.goodDetails)
					}
				}
				localStorage.setItem('treasure', JSON.stringify(goodsArr));
				this.$emit('addCart',goodsArr)
			},
			toPayment(){
				if(sessionStorage.getItem('user') == null){
					alert("请登录");
				} else {
					this.goodDetails.goodsNum = this.num;
					let arr = [];
					arr.push(this.goodDetails);
					this.$emit('toPayment',arr)
				}
			}
		},
		created(){
			this.goodDetails = JSON.parse(sessionStorage.getItem('goodDetails'));
			this.maxImg=this.goodDetails.picture[0]
		}
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
	padding: 10px 0 100px;
	border-radius: 10px;
}
.goodDetails .back:hover {
	color: lightblue;
	cursor: pointer;
}
.goodDetails .left {
	width: 45%;
}
#maxImg {
	display: block;
	position: relative;
	/*float: left;*/
	top: -700px;
	left: 600px;
}
.goodDetails .left .midImg {
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
	border-radius: 5px;
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