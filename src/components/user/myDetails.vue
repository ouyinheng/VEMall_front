<template>
	<div class="myDetails">
		<div class="main">
			<div class="left">
				<span class="title">我的商城</span>
				<el-menu
			      :default-active="defaultActive" 
			      class="el-menu-vertical-demo"
			      @open="handleOpen"
			      @close="handleClose"
			      background-color="#fff"
			      text-color="#000"
			      style="padding: 10px 0 140px;"
			      router
			      active-text-color="RGB(202,20,29)">
			      	<el-menu-item index="myDetails">我的订单</el-menu-item>
			      	<el-menu-item index="UserDetails">账户资料</el-menu-item>
			      	<el-menu-item index="mySite">收货地址</el-menu-item>
			      	<el-menu-item index="behindBuy">售后服务</el-menu-item>
			      	<el-menu-item index="oldTonew">以旧换新</el-menu-item>
			      	<el-menu-item index="myNews">我的优惠</el-menu-item>
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
		computed: {
            defaultActive: function(){
                return this.$route.path.replace('/', '');
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

<style lang='scss' scoped>
.myDetails {
	width: 100%;
	margin: 50px 0;
	background: #ededed;
	.main {
		width: 70%;
		min-width: 1200px;
		margin: 0 auto;
		.left {
			width: 20%;
			background: pink;
			float: left;
			.title {
				display: block;
				width: 100%;
				height: 60px;
				line-height: 60px;
				text-align: center;
				background: RGB(202,20,29);
				font-size: 20px;
				color: #fff;
			}
		}
		.right {
			width: 80%;
			float: right;
		}
	}
}
</style>