<template>
	<div class="order">
		<span @click="back" type="text" class="back">返回</span>
		<header class="site">
			<span>收货地址</span>
			<div>
				...
			</div>
		</header>
		<section class="goodsList">
			
		</section>
	</div>
</template>

<script>
	export default {
		name: 'order',
		data(){
			return {

			}
		},
		methods:{
			back(){
				this.$emit('back')
			}
		},
		props:['data']
	}
</script>

<style>
.order {
	width: 90%;
	margin: 30px auto;
	min-height: 400px;
	max-height: 600px;
	border: 1px solid red;
	text-align: left;
}
.order>span {
	display: block;
	margin: 10px;
	cursor: pointer;
}
.order .site {
	width: 100%;
	text-align: left;
	box-sizing: border-box;
	padding: 20px 50px;
}
.order .site>span {
	font-size: 26px;
}
</style>