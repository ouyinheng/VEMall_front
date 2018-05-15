<template>
	<div>
		<div class="goodDetails">
			<div class="left">
				<img v-lazy="base+'/queryImages?img=goods/allGoods/'+mid+maxImg" alt=""  class="midImg">
				<div class="minImg">
					<img v-for="(item,index) in goodDetails.picture" :key="item" v-lazy="base+'/queryImages?img=goods/allGoods/'+min+item" alt="" @mousemove="toChange($event,item)">
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
		<div class="details">
			<p v-for="(item,index) in picture" :key="index">
				<img v-lazy="base+'/queryImages?img=goods/details/'+item.url" alt="" width="100%">
			</p>
		</div>

	</div>
</template>

<script>
	import { base,getCommDetails } from '@/api/api'
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
				bool:true,
				picture:[]
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
			this.maxImg=this.goodDetails.picture[0];
			this.$box1 = $("#box1");
			this.$box2 = $("#box2");
			this.$mark = $("#mark");
			this.$img = $("#box2").children('img');
			const _this = this;
			getCommDetails({id:this.goodDetails.id}).then(data=>{
				_this.picture = data;
			}).catch()
		}
	}
</script>

<style lang='scss' scoped>
.goodDetails {
	width: 90%;
	min-width: 1200px;
	margin: 10px auto;
	background: #fff;
	display: flex;
	flex-direction: row;
	padding: 10px 0 100px;
	border-radius: 10px;
	.back:hover {
		color: lightblue;
		cursor: pointer;
	}
	.left {
		width: 45%;
		.midImg {
			display: block;
			width: 428px;
			margin: 0 auto;
			padding: 2px;
		}
		.minImg {
			width: 428px;
			margin: 0 auto;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}
	.right {
		width: 55%;
		.title {
			margin-top: 50px;
			text-align: left;
			.el-button {
				margin-top: 120px;
			}
		}
	}
	.details {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
	}
}
#maxImg {
	display: block;
	position: relative;
	/*float: left;*/
	top: -700px;
	left: 600px;
}
.imgBorder {
	border: 1px solid red;
	border-radius: 5px;
}
.details p{
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	img {
		display: block;
		width: 100%;
		padding: 0;
		margin: 0;
	}
}
</style>