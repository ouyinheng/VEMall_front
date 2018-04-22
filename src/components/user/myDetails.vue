<template>
	<div class="myDetails">
		<div class="main">
			<div class="left">
				<span class="title">我的商城</span>
				<el-menu
			      default-active="2"
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#fff"
			      text-color="#000"
			      style="padding: 10px;"
			      router
			      active-text-color="RGB(202,20,29)">
			      	<div>
				      	<span class="el-icon-tickets" style="color: RGB(202,20,29);"></span>
				      	<span><b>订单中心</b></span>
			      	</div>
			      	<el-menu-item index="myOrder">我的订单</el-menu-item>
			      	<el-menu-item index="1-2">选项1</el-menu-item>
			      	<el-menu-item index="1-3">选项1</el-menu-item>
			      	<el-menu-item index="1-4">选项1</el-menu-item>
			      	<div>
				      	<span class="el-icon-goods" style="color: RGB(202,20,29);"></span>
				      	<span><b>购买支持</b></span>
			      	</div>
			      	<el-menu-item index="2-1">选项1</el-menu-item>
			      	<el-menu-item index="2-2">选项1</el-menu-item>
			      	<el-menu-item index="2-3">选项1</el-menu-item>
			      	<el-menu-item index="2-4">选项1</el-menu-item>
			    </el-menu>
			</div>
			<div class="right">
				<transition name="fade" mode="out-in">
			        <router-view/>
			    </transition>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from '@/components/user/headTop'
	export default {
		name: 'myDetails',
		data(){
			return {

			}
		},
		methods:{
			handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		    },
		    handleClose(key, keyPath) {
		        console.log(key, keyPath);
		    }
		}
	}
</script>

<style>
.myDetails {
	width: 100%;

}
.myDetails .main {
	width: 70%;
	min-width: 1200px;
	margin: 0 auto;
	border: 1px solid red;
}
.myDetails .main .left {
	width: 20%;
	background: pink;
	float: left;
}
.myDetails .main .left .title {
	display: block;
	width: 100%;
	height: 60px;
	line-height: 60px;
	text-align: center;
	background: RGB(202,20,29);
	font-size: 20px;
	color: #fff;
}
.myDetails .main .right {
	width: 80%;
	float: right;
	background: lightblue;
}
</style>