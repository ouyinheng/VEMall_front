<template>
    <div class="income">
        <div id="income" :style="{width: '100%', height: '600px'}"></div>
    </div>
</template>

<script>
    import { base,requestAllUser,queryCommodity,queryUserOrder } from '@/api/api'
	// import $ from 'jquery'
    export default {
        name: 'home',
        data(){
        	return {
        		base:base
        	}
        },
        mounted(){
		    this.drawLine();
		},
        methods:{
        	getOrder(){
        		const _this = this;
        		queryUserOrder({id:null}).then(data=>{
        			_this.order = data;
        		}).catch()
        	},
        	drawLine(){
        		// 基于准备好的dom，初始化echarts实例
		        let income = this.$echarts.init(document.getElementById('income'))
		        // 绘制图表
		        income.setOption({
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
        	this.getOrder();
        }
    }
</script>

<style scoped>
    
</style>