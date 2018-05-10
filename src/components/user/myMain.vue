<template>
	<div class="myMain">
		<el-carousel :interval="5000" height="600px">
		    <el-carousel-item v-for="(item,index) in data" :key="index">
		      	<img v-lazy="base+'/queryImages?img=slideshow/'+item.url" alt="" width="100%" height="100%" @click="toDetails(index)">
		    </el-carousel-item>
		</el-carousel>
		<hot @toBuyPage="toBuyPage"></hot>
		<huawei></huawei>
		<!-- 品牌精选 -->
		<handpick @toBuyPage="toBuyPage"></handpick>
	</div>
</template>

<script>
	import { base,queryAllSlideShow,getCom } from '@/api/api'
	import hot from '@/components/user/hot'
	import huawei from '@/components/user/huawei'
	import handpick from '@/components/user/handpick'
	import goodDetails from '@/components/user/goodDetails'
	import order from '@/components/user/order'
	export default {
		name: 'show',
		data(){
			return {
				base:base,
				data:[],

			}
		},
		components:{
			hot,huawei,handpick,goodDetails,order
		},
		methods:{
			toBuyPage(data){
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
		    	// this.$emit('toBuyPage',data);
		    	sessionStorage.setItem('goodDetails', JSON.stringify(data));
		    	window.open(window.location.origin + '/#/goodDetails')
				// this.$router.push('/')
		    	// this.$router.push('/goodDetails')
			},
			getSlideShow(){
				const _this = this;
				queryAllSlideShow().then(data=>{
					_this.data = data;
				}).catch()
			},
			toDetails(index){
				let id = this.data[index].commodity_id;
				getCom({id:id}).then(da=>{
					console.log(data);
					let data = da[0]
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
				}).catch()
				
			}
		},
		created(){
			this.getSlideShow();
		}
	}
</script>

<style>
.contain {
	padding: 0;

}

/*轮播图*/
.el-carousel {
	
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
#checkbox {
  margin: 0 90px 0 0;
}
</style>