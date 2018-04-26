<template>
	<div class="behindBuy">
		<header class="title">售后服务</header>
		<div class="content">
			
		</div>
	</div>
</template>

<script>
	import { base } from '@/api/api'
	export default {
		name: 'behindBuy',
		data(){
			return {
				base:base,
			}
		}
	}
</script>

<style>
.behindBuy {
	width: 1000px;
	margin: 0px 0 0 20px;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.behindBuy .title {
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
.behindBuy .content {
	width: 100%;
	min-height: 350px;
}
</style>