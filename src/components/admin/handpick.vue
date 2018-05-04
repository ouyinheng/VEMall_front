<template>
	<div class="handpick">
		<span class="title">热门商品</span>
		<mytable :list="data" :property="'goods/handpick/'"></mytable>
	</div>
</template>

<script>
	import { requestFileName,queryCommodity } from "@/api/api"
	import mytable from '@/components/admin/table'
	export default {
		name: 'handpick',
		data(){
			return {
				data:[]
			}
		},
		components:{
			mytable
		},
		methods:{
			getData(){
				const _this = this;
				queryCommodity({property:'handpick'}).then(data=>{
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
				    	_this.data[i].picture = picture;
					}
				}).catch()
			},
			tableRowClassName({row, rowIndex}) {
		        if (rowIndex === 1) {
		          return 'warning-row';
		        } else if (rowIndex === 3) {
		          return 'success-row';
		        }
		        return '';
		    }
		},
		created(){
			this.getData();
			const _this = this;
			requestFileName({param:'handpick'}).then(data=>{
				_this.fileArr = data;
			}).catch();
		}
	}
</script>

<style>
.handpick {
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
.handpick .title {
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