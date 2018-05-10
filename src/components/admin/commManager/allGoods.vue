<template>
	<div class="allGoods">
		<span class="title">所有商品</span>
		<mytable :list="data" :property="'goods/allGoods/'" @updateList="updateList"></mytable>
	</div>
</template>

<script>
	import { requestFileName,queryCommodity,editCommodity } from "@/api/api"
	import mytable from '@/components/admin/table'
	export default {
		nama: 'allGoods',
		data(){
			return {
				data:[],
			}
		},
		components:{
			mytable
		},
		methods:{
			getData(){
				const _this = this;
				queryCommodity({property:null}).then(data=>{
					_this.data = data;
					for(let i=0;i<data.length;i++){
						let picture = [];
						for(let j=0;j<data[i].picture.length;j++){
				    		let arr = data[i].picture[j].url.split('_');
				    		if(arr[0] == '78'){
				    			let url = '';
				    			for(let j=2;j<arr.length;j++){
				    				url += "_"+arr[j];
				    			}
								picture.push(url);
				    		}
				    	}
				    	_this.data[i].picture = JSON.parse(JSON.stringify(picture));
					}
				}).catch()
			},
			updateList(data){
				this.getData();
			}
		},
		created(){
			this.getData();
		}
	}
</script>

<style>
.allGoods {
	width: 90%;
	min-width: 1200px;
	/*padding: 10px;*/
	margin: 0 auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.allGoods .title {
	display: block;
	width: 100%;
	height: 60px;
	line-height: 60px;
	padding-left: 30px;
	font-size: 20px;
	text-align: left;
	border-bottom: 1px solid #dcdcdc;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
}
</style>