<!-- 热门 -->
<template>
	<div class="hot">
		<header class="title">热门商品</header>
		<div class="hotCard" v-for="(item,index) in data" :key="index" @click="toBuyPage(index)">
			<div style="height:420px;">
				<img :src="base+'/queryImages?img=goods/allGoods/'+item.displayImg" width="400px">
			</div>
			<div>
				<span>{{item.shortname}}</span></br>
				<span style="font-size:14px;color:gray;">{{item.intro}}</span>
			</div>
			<span style="color:red;">￥{{item.price}}</span>
		</div>
	</div>
</template>

<script>
	import { queryCommodity,base } from '@/api/api'
	export default {
		name: 'hot',
		data(){
			return {
				data:[],
				base:base
			}
		},
		methods:{
			getHotGoods(){
				const _this = this;
				queryCommodity({property:'hotGoods'}).then(data=>{
					_this.data = data;
				}).catch()
			},
			toBuyPage(index){
				this.$emit("toBuyPage",this.data[index]);
			}
		},
		created(){
			this.getHotGoods();
		}
	}
</script>

<style>
.hot {
	width: 1200px;
	margin: 12px auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.hot .title {
	display: block;
	box-sizing: border-box;
	width: 100%;
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #dcdcdc;
	border-color: rgba(0,0,0,.14);
	font-size: 20px;
	text-align: left;
	padding-left: 20px;
}
.hot .hotCard {
	display: inline-block;
	width: 50%;
	box-sizing: border-box;
	padding: 40px;
	background: #fff;
	transition: all .2s linear 0s;
}
.hot .hotCard:hover {
	cursor: pointer;
	box-shadow: 0 10px 15px rgba(0,0,0,0.07);
	transform: translate3d(0px,-2px,0px);
	z-index: 2;
}
</style>