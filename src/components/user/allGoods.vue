<template>
	<div class="allGoods">
		<div class="sort">
			<span>分类:</span>
			<el-button @click="showData = data,showText1='所有商品'">所有商品</el-button>
			<el-button name='classify' v-for="(item,index) in classify" :key="index" @click='filltClas(item.classify)'>{{item.classify}}</el-button>
		</div>
		<div class="sort">
			<span>选项:</span>
			<el-button name="sort" @click="showData = data,showText2='不排序'">不排序</el-button>
			<el-button name="sort" @click="toHigh">价格从低到高</el-button>
			<el-button name='sort' @click="toLow">价格从高到低</el-button>
		</div>
		<div class="sort">
			已选择:<span style="color:red;font-size:14px;">{{showText1}} <b style="color:#000;"> >> </b> {{showText2}}</span>
		</div>
		<div class="flexT">
			<div class="gooodsCard" v-for="(item,index) in showData" :key="index" @click="toBuyPage(index)">
				<div style="margin-top: 30px;">
					<img v-lazy="base+'/queryImages?img=goods/displayImg/'+item.displayImg" width="150px">
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
	import { base,queryCommodity,queryCommProp } from '@/api/api'
	export default {
		name: 'allGoods',
		data(){
			return {
				base:base,
				data:[],
				showData:[],
				classify:[],
				showText1:'所有商品',
				showText2:'不排序'
			}
		},
		methods:{
			toBuyPage(index){
				var data = this.data[index];
				let picture = [];
		    	for(let i=0;i<data.picture.length;i++){
		    		if(data.picture[i].url){
		    			let arr = data.picture[i].url.split('_');
			    		if(arr[0] == '78'){
			    			let url = '';
			    			for(let j=2;j<arr.length;j++){
			    				url += "_"+arr[j];
			    			}
							picture.push(url);
			    		}
		    		} else {
		    			picture = data.picture
		    		}
		    	}
		    	data.picture = picture;
				sessionStorage.setItem('goodDetails', JSON.stringify(data));
				// this.$router.push('/allGoods')
				window.open(window.location.origin + '/#/goodDetails')
		    	// this.$router.push('/goodDetails')
			},
			toHigh(){
				this.showText2 = '价格从低到高';
				const _this = this;
				let data = this.showData.concat();
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
				this.showText2 = '价格从高到低';
				const _this = this;
				let data = this.showData.concat();
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
			},
			getCommProp(){
				const _this = this;
				queryCommProp().then(data=>{
					_this.classify = data;
				}).catch()
			},
			filltClas(data){
				this.showText1 = data;
				const _this = this;
				this.showData = [];
				this.data.forEach((item,index)=>{
					if(item.classify == data){
						_this.showData.push(item);
					}
				})
			}
		},
		created(){
			const _this = this;
			queryCommodity({property:null}).then(data=>{
				_this.data = data;
				_this.showData = data;
			}).catch()
			this.getCommProp();
		}
	}
</script>

<style lang='scss' scoped>
.allGoods {
	width: 1200px;
	margin: 10px auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
	.sort {
		width: 100%;
		height: 60px;
		line-height: 60px;
		text-align: left;
		padding-left: 40px;
	}
	.title {
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
	.flexT {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.gooodsCard {
		width: 295px;
		height: 350px;
		background: #fff;
		margin: 2px;
		transition: all .2s linear 0s;
	}
	.gooodsCard:hover {
		cursor: pointer;
		box-shadow: 0 10px 15px rgba(0,0,0,0.07);
		transform: translate3d(0px,-2px,0px);
		z-index: 2;
	}	
}
</style>