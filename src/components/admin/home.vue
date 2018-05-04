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
		       	<div class="content">
		       		<span class="iconfont icon-cart icon" style="background:RGB(248,211,71)"></span>
		       		<div class="comDa">
		       			<span class="num">{{order.length}}</span>
		       			<span class="title">订单总数</span>
		       		</div>
		       	</div>
	       </header>
	       <section class="section">
	       		<div id="myChart" :style="{width: '800px', height: '600px'}"></div>
	       </section>
    	</div>
    </div>
</template>

<script>
	import { base,requestAllUser,queryCommodity,queryUserOrder } from '@/api/api'
	// import $ from 'jquery'
    export default {
        name: 'home',
        data(){
        	return {
        		base:base,
        		user:[],
        		commodity:[],
        		order:[],
        		msg: 'Welcome to Your Vue.js App'
        	}
        },
        mounted(){
		    this.drawLine();
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
        	getOrder(){
        		const _this = this;
        		queryUserOrder({id:null}).then(data=>{
        			_this.order = data;
        		}).catch()
        	},
        	drawLine(){
        		// 基于准备好的dom，初始化echarts实例
		        let myChart = this.$echarts.init(document.getElementById('myChart'))
		        // 绘制图表
		        myChart.setOption({
		            title: {
				        text: '折线图堆叠'
				    },
				    tooltip: {
				        trigger: 'axis'
				    },
				    legend: {
				        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    toolbox: {
				        feature: {
				            saveAsImage: {}
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: ['周一','周二','周三','周四','周五','周六','周日']
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [
				        {
				            name:'邮件营销',
				            type:'line',
				            stack: '总量',
				            data:[120, 132, 101, 134, 90, 230, 210]
				        },
				        {
				            name:'联盟广告',
				            type:'line',
				            stack: '总量',
				            data:[220, 182, 191, 234, 290, 330, 310]
				        },
				        {
				            name:'视频广告',
				            type:'line',
				            stack: '总量',
				            data:[150, 232, 201, 154, 190, 330, 410]
				        },
				        {
				            name:'直接访问',
				            type:'line',
				            stack: '总量',
				            data:[320, 332, 301, 334, 390, 330, 320]
				        },
				        {
				            name:'搜索引擎',
				            type:'line',
				            stack: '总量',
				            data:[820, 932, 901, 934, 1290, 1330, 1320]
				        }
				    ]
		        });
		    }
        },
        created(){
        	this.getUser();
        	this.getCoom();
        	this.getOrder();
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
	margin: 20px auto 0;
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
	border-radius: 5px;
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
.home .homeChild .section {
	margin-top: 20px;
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