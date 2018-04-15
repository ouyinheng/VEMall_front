<template>
	<div class="show">
		<el-container>
		  	<el-header>
		  		<headTop @toPopup="toLogin"></headTop>
		  	</el-header>
		  	<el-main class="contain">
		  		<el-carousel :interval="5000" height="500px">
				    <el-carousel-item v-for="item in 4" :key="item">
				      	<h3>{{ item }}</h3>
				    </el-carousel-item>
				</el-carousel>
		  	</el-main>
		  	<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
	import $ from 'jquery'
	import gt from '@/assets/js/gt.js'
	import { toVerify } from '@/api/api'
	import headTop from '@/components/user/headTop'
	export default {
		name: 'show',
		data(){
			return {
				dialogVisible: false,
			}
		},
		components:{
			headTop
		},
		methods:{
			handleClose(done) {
		        this.$confirm('确认关闭？').then(_ => {
		            done();
		        }).catch(_ => {});
		    },
			toLogin(){
				this.$router.push('/userLogin');
			}
		}
	}
</script>

<style scoped>
.el-header,.el-footer {
	width: 100%;
	height: 80px;
    background-color: #B3C0D1;
    color: #333;
    line-height: 80px;
}
.el-header {
	position: fixed;
	top: 0;
	left: 0;
	background-color: transparent;
	z-index: 10;
} 
.el-main {
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
/* .contain {
	width: 100%;
	position: absolute;
	top: 60px;
	left: 0;
	bottom: 160px;
} */
/* .show_head {
	width: 85%;
	height: 60px;
	margin: 0 auto;
	line-height: 60px;
	color: #fff;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.show_head ul {
	width: 100%;
	height: 60px;
	line-height: 60px;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.show_head ul:nth-of-type(1) {
	width: 60%;
	margin-right: 40px;
}
.show_head ul:nth-of-type(2) {
	width: 40%;
	margin-left: 10px;
} */
</style>