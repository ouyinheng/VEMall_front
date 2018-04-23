<template>
	<div class="allGoods">
		<div class="sort">
			<el-button @click="toHigh">价格从低到高</el-button>
			<el-button @click="toLow">价格从高到低</el-button>
		</div>
		<div class="flexT">
			<div class="gooodsCard" v-for="(item,index) in showData" :key="index" @click="toBuyPage(index)">
				<div style="margin-top: 30px;">
					<img :src="base+'/queryImages?img=goods/allGoods/'+item.displayImg" width="150px">
				</div>
				<div style="margin-top: 20px;a">
					<span>{{item.shortname}}</span></br>
					<span style="font-size:12px;color:gray;display:block;margin-top:10px;">{{item.intro}}</span>
				</div>
				<span style="display:block;color:red;margin-top: 30px;">￥{{item.price}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { base,queryCommodity } from '@/api/api'
	export default {
		name: 'allGoods',
		data(){
			return {
				base:base,
				data:[],
				showData:[]
			}
		},
		methods:{
			toBuyPage(index){
				var data = this.data[index];
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
				sessionStorage.setItem('goodDetails', JSON.stringify(data));
				window.open(window.location.origin + '/#/goodDetails')
				this.$router.push('/allGoods')
		    	// this.$router.push('/goodDetails')
			},
			toHigh(){
				const _this = this;
				let data = this.data.concat();
				let a = '';
				for(let i=0;i<data.length;i++){
					for(let j=i+1;j<data.length;j++){
						if(data[i].price > data[j].price){
							a = JSON.stringify(data[i]);
							data[i] = JSON.parse(JSON.stringify(data[j]));
							data[j] = JSON.parse(a);
						}
					}
				}
				this.showData = data;
			},
			toLow(){
				const _this = this;
				let data = this.data.concat();
				let a = '';
				for(let i=0;i<data.length;i++){
					for(let j=i+1;j<data.length;j++){
						if(data[i].price < data[j].price){
							a = JSON.stringify(data[i]);
							data[i] = JSON.parse(JSON.stringify(data[j]));
							data[j] = JSON.parse(a);
						}
					}
				}
				this.showData = data;
			}
		},
		created(){
			const _this = this;
			queryCommodity({property:null}).then(data=>{
				_this.data = data;
				_this.showData = data;
			}).catch()
		}
	}
</script>

<style>
.allGoods {
	width: 1200px;
	margin: 10px auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.allGoods .sort {
	width: 100%;
	height: 60px;
	line-height: 60px;
	text-align: left;
	padding-left: 40px;
}
.allGoods .title {
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
.allGoods .flexT {
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.allGoods .flexT .gooodsCard {
	width: 295px;
	height: 350px;
	background: #fff;
	margin: 2px;
	transition: all .2s linear 0s;
}
.allGoods .gooodsCard:hover {
	cursor: pointer;
	box-shadow: 0 10px 15px rgba(0,0,0,0.07);
	transform: translate3d(0px,-2px,0px);
	z-index: 2;
}	
</style>