<template>
	<div class="myMain">
		<el-carousel :interval="5000" height="600px">
		    <el-carousel-item v-for="(item,index) in img" :key="index">
		      	<img :src="item.url" alt="" width="100%" height="100%">
		    </el-carousel-item>
		</el-carousel>
		<hot @toBuyPage="toBuyPage"></hot>
		<huawei></huawei>
		<!-- 品牌精选 -->
		<handpick @toBuyPage="toBuyPage"></handpick>
	</div>
</template>

<script>
	import hot from '@/components/user/hot'
	import huawei from '@/components/user/huawei'
	import handpick from '@/components/user/handpick'
	import goodDetails from '@/components/user/goodDetails'
	import order from '@/components/user/order'
	export default {
		name: 'show',
		data(){
			return {
				img:[{
		        	url:'@/../static/images/head/054142e3-076f-4ce8-95e2-5d6559582176.jpg'
		        },{
		        	url:'@/../static/images/head/19441725-bfe9-4624-ab84-5a72a4ab8bfb.jpg'
		        },{
		        	url:'@/../static/images/head/3831480a-b1a7-4ca3-a8e0-9d5656d86217.jpg'
		        },{
		        	url:'@/../static/images/head/5c4b2a4e-441b-417d-8eb8-45757a048bcd.jpg'
		        },{
		        	url:'@/../static/images/head/5d8e9d35-6ff4-4918-904e-8b57c96c20c9.jpg'
		        },{
		        	url:'@/../static/images/head/d7350a20-cd03-4305-909f-55ceef2b4de7.jpg'
		        },{
		        	url:'@/../static/images/head/f92f925a-f434-4b83-95f6-06c50a96c259.jpg'
		        }],

			}
		},
		components:{
			hot,huawei,handpick,goodDetails,order
		},
		methods:{
			toBuyPage(data){
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
		    	// this.$emit('toBuyPage',data);
		    	sessionStorage.setItem('goodDetails', JSON.stringify(data));
		    	window.open(window.location.origin + '/#/goodDetails')
				this.$router.push('/')
		    	// this.$router.push('/goodDetails')
			}
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