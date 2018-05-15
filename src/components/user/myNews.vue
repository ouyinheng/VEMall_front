<template>
	<div class="myNews">
		<header class="title">我的优惠</header>
		<div class="content">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'myNews',
		data(){
			return {

			}
		}
	}
</script>

<style lang='scss' scoped >
.myNews {
	width: 1000px;
	margin: 0px 0 0 20px;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
	.title {
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
	.content {
		width: 100%;
		min-height: 350px;
	}
}
</style>