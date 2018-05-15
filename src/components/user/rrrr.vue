<template>
	<div class="userMain">
		<el-main class="contain" v-if="mainShow">
	  		<!-- 轮播图 -->
	  		<el-carousel :interval="5000" height="600px">
			    <el-carousel-item v-for="(item,index) in img" :key="index">
			      	<img v-lazy="item.url" alt="" width="100%" height="100%">
			    </el-carousel-item>
			</el-carousel>
			<hot @toBuyPage="toBuyPage"></hot>
			<huawei></huawei>
			<!-- 品牌精选 -->
			<handpick @toBuyPage="toBuyPage"></handpick>
			<!-- 特色 -->
			<feature></feature>
	  	</el-main>
	  	<el-main class="contain" v-if="detailShow">
	  		<!-- 商品详情 -->
	  		<goodDetails :goodDetails="goodDetails" @back="back" @addCart="addCart" @toPayment="toPayment"></goodDetails>
	  		
	  	</el-main>
	  	<el-main class="contain" v-if="orderShow">
	  		<!-- 订单页 -->
	  		<order :data="goodDetails" @back="back"></order>
	  		
	  	</el-main>
	</div>
</template>

<script>
	// import $ from 'jquery'
	// import gt from '@/assets/js/gt.js'
	// import { requestLogin } from '@/api/api'
	import feature from '@/components/user/feature'
	import hot from '@/components/user/hot'
	import huawei from '@/components/user/huawei'
	import handpick from '@/components/user/handpick'
	import goodDetails from '@/components/user/goodDetails'
	import order from '@/components/user/order'
	export default {
		name: 'userMain',
		data(){
			return {
				mainShow:true,
				detailShow:false,
				orderShow:false,
				dialogVisible: false,
		        sendUser:{},
		        sendBool:'',
		        treasure:[],//商品
		        goodDetails:{},//当前页商品
		        checked: true,
		        //模拟数据
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
		        }]
			}
		},
		components:{
			feature,hot,huawei,handpick,goodDetails,order
		},
		methods:{
		    toBuyPage(data){
		    	// this.mainShow = false;
		    	// this.detailShow = true;
		    	// this.orderShow = false;
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
		    	// this.goodDetails = data;
		    	this.$emit('toBuyPage',data);
		    	this.$router.push('/goodDetails')
		    },
		    back(){
		    	this.mainShow = true;
		    	this.detailShow = false;
		    	this.orderShow = false;
		    },
		    addCart(data){
		    	//添加商品到购物车,详情页
		    	if(this.treasure.length==0){
		    		var newArrCopy = JSON.parse(JSON.stringify(data))
		    		this.treasure.push(newArrCopy);
		    	} else {
		    		var bool = true
		    		for(let i=0;i<this.treasure.length;i++){
			    		if(data.id == this.treasure[i].id){
			    			const num = data.goodsNum + this.treasure[i].goodsNum;
			    			data.goodsNum += this.treasure[i].goodsNum ;
			    			this.treasure.splice(i,1);
			    			var newArrCopy = JSON.parse(JSON.stringify(data))
		    				this.treasure.push(newArrCopy);
			    			bool = false;
			    		}
			    	}
			    	if(bool){
				    	this.treasure.push(data);
			    	}
		    	}
		    	this.$emit('addCart',this.treasure)
		    	
		    },
		    toPayment(){
		    	this.$router.push('/order');
		    }
		},
		created(){
			
		}
	}
</script>

<style scoped>
.el-main {
	margin-top: 60px;

    background-color: #E9EEF3;
    text-align: center;
    /*color: #333;
    line-height: 500px;*/
}
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