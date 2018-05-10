<template>
	<div class="slideshow">
		<span class="title">轮播图</span>
		<mytable :list="data" :property="'goods/slideshow/'" @updateList="updateList"></mytable>
	</div>
</template>

<script>
	import { queryCommodity,addSlideShow,querySlideShow,editCommodity } from "@/api/api"
	import mytable from '@/components/admin/table'
	export default {
		name: 'slideshow',
		data(){
			return {
				data:[]
			}
		},
		components:{
			mytable
		},
		methods:{
			toBuyPage(index){
				console.log(index)
			},
			getData(){
				const _this = this;
				queryCommodity({property:'slideshow'}).then(data=>{
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
				}).then(()=>{
					_this.getSlideShow();
				}).catch()
			},
			getSlideShow(){
				const _this = this;
				for(let i=0;i<_this.data.length;i++){
					querySlideShow({id:_this.data[i].id}).then(data=>{
						_this.data[i].slideshow = data;
					}).catch(error=>{
						console.log(error);
					})
				}
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
.slideshow {
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
.slideshow .title {
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