<!-- 品牌精选 -->
<template>
	<div class="handpick">
		<header class="title">品牌精选</header>
		<div class="flexT">
			<div class="handpickCard" v-for="(item,index) in comm" :key="index" @click="toBuyPage(index)">
				<div style="margin-top: 30px;">
					<img :src="base+'/queryImages?img=goods/allGoods/'+item.displayImg" width="150px">
				</div>
				<div style="margin-top: 20px;a">
					<span>{{item.name}}</span></br>
					<span style="font-size:12px;color:gray;display:block;margin-top:10px;">{{item.intro}}</span>
				</div>
				<span style="display:block;color:red;margin-top: 30px;">￥{{item.price}}</span>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { queryCommodity,base} from "@/api/api"
	export default {
		name: 'handpick',
		data(){
			return {
				comm:[],
				base:base
			}
		},
		methods:{
			toBuyPage(data){
				this.$emit('toBuyPage',this.comm[data]);
			}
		},
		created(){
			const _this = this;
			queryCommodity({property:'handpick'}).then(data=>{
				_this.comm = data
			}).catch()
		}
	}
</script>

<style>
.handpick {
	width: 1200px;
	margin: 150px auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.handpick .title {
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
.handpick .flexT {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.handpick .flexT .handpickCard {
	width: 280px;
	height: 340px;
	background: #fff;
	margin: 10px;
	transition: all .2s linear 0s;
}
.handpick .handpickCard:hover {
	cursor: pointer;
	box-shadow: 0 10px 15px rgba(0,0,0,0.07);
	transform: translate3d(0px,-2px,0px);
	z-index: 2;
}
</style>