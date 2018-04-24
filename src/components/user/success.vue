<template>
	<div class="success">
			<header class="title">支付订单</header>
			<div class="celebrate">
				<div class="content">
					<b class="el-icon-success" style="font-size:50px;color: lightgreen"></b> 
					<h1>订单提交成功</h1>
					<p>
						请在 24 小时内完成支付，超时订单将自动取消。
					</p>
					<p>
						我们不会在您完成支付后的 72 小时内发货，您的支付将用作捐赠
					</p>
				</div>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'success',
		data(){
			return {

			}
		}
	}
</script>

<style>
.success {
	width: 70%;
	min-width: 1200px;
	margin: 30px auto;
	height: 100%;
	text-align: left;
	background: #fff;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	/*overflow-y: auto;*/
	overflow-x: hidden;
}
.success>span {
	display: block;
	margin: 10px;
	cursor: pointer;
}
.success .title {
	width: 100%;
	height: 60px;
	line-height: 60px;
	font-size: 20px;
	border-bottom: 1px solid #d4d4d4;
	border-radius: 8px 8px 0 0;
	box-shadow: 0 1px 7px rgba(0,0,0,.06);
	background: linear-gradient(#fbfbfb,#ececec);
	/*border-color: rgba(0,0,0,.14);*/
	text-align: left;
	padding-left: 20px;
}
.success .celebrate {
	padding: 50px 10px;
}
.success .celebrate .content {
	width: 50%;
	margin: 0 auto;
	text-align: center;
}
</style>