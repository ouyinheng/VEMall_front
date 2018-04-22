<template>
    <div class="home">
    	<div class="homeChild">
    		<header class="statistics">
	       	<div class="content">
	       		<span class="iconfont icon-account icon"></span>
	       		<div class="comDa">
		       		<span class="num">{{user.length}}</span>
		       		<span class="title">用户总数</span>
	       		</div>
	       	</div>
	       	<div class="content">
	       		<span class="el-icon-goods icon" style="background:RGB(255,108,96)"></span>
	       		<div class="comDa">
	       			<span class="num">{{commodity.length}}</span>
	       			<span class="title">商品总数</span>
	       		</div>
	       	</div>
	       </header>
	       <section></section>
    	</div>
    </div>
</template>

<script>
	import { base,requestAllUser,queryCommodity } from '@/api/api'
	import $ from 'jquery'
    export default {
        name: 'home',
        data(){
        	return {
        		base:base,
        		user:[],
        		commodity:[]
        	}
        },
        methods:{
        	getUser(){
        		const _this = this;
        		requestAllUser().then(data=>{
        			_this.user = data;
        		}).catch()
        	},
        	getCoom(){
        		const _this = this;
        		queryCommodity({property:null}).then(data=>{
        			_this.commodity = data;
        		}).catch()
        	},
        	getW(){
	            $.ajax({
	                type:'get',
	                url:'http://api.map.baidu.com/telematics/v3/weather?output=json&ak=0A5bc3c4fb543c8f9bc54b77bc155724',
	                data:{location:'北京'},
	                dataType:'jsonp',
	                success:function(data){
	                	console.log(data,'天气');
	                    // var weather_data = data.results[0].weather_data;
	                    
	                    // var html = template('template',{model:weather_data});
	                    // $('tbody').html(html);
	                }
	            });
        	}
        },
        created(){
        	this.getUser();
        	this.getCoom();
        	this.getW();
        }
    }
</script>

<style scoped>
.home {
	width: 100%;
	background: RGB(241,242,247);
	padding: 0;
	margin: 0;
}
.homeChild {
	width: 95%;
	margin: 0 auto;
}
.home .statistics {
	width: 100%;
	border-radius: 5px;
	overflow: hidden;
	display: flex;
	flex-direction: row;
}
.home .statistics .content {
	border-radius: 5px;
	margin-right: 20px;
	display: flex;
	flex-direction: row;
}
.home .statistics .icon {
	width: 150px;
	height: 100px;
	line-height: 100px;
	color: #fff;
	font-size: 40px;
	font-weight: bold;
	text-align: center;
	background: RGB(108,202,201);
}
.home .statistics .content .comDa {
	width: 220px;
	height: 100px;
	line-height: 100%;
	text-align: center;
	vertical-align: middle;
	display: flex;
	flex-direction: column;
	background: #fff;
}
.home .statistics .num {
	/*line-height: 100%;*/
	width: 220px;
	height: 60px;
	line-height: 60px;
	background: #fff;
	color: #c6cad6;
	font-weight: 300;
	font-size: 40px;
	font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
}
.home .statistics .title {
	width: 220px;
	height: 40px;
	color: #c6cad6;
	text-align: center;
	font-size: 14px;
}
/*.home .statistics .content .comDa {
	width: 220px;

	height: 100px;
	line-height: 100px;
	display: flex;
	flex-direction: column;
	text-align: center;
}*/
/*

.home .statistics .title {
	color: #c6cad6;
	text-align: center;
	font-size: 14px;
}*/
</style>