<template>
	<div class="outcolor">
		<div class="header">
			<div style='width:40%;margin: 0 auto;display:flex;flex-direction:row;'>
			 	<img :src="base+'/queryImages?img=icon/globalheader_logo.png'" alt="图片不见了">
			 	<span>VEMall商城</span>
			</div>
		</div>
		<div class="forget">
			 <!-- <el-button type="info" icon="el-icon-message" circle @click="findPwd">忘记密码</el-button> -->
			 
			<div class="h">
			 	<h3>
				 	<span>忘记密码</span>
				</h3>
			</div>
			<div class="content">
				<span>输入VEmall邮箱</span>
				<el-input v-model="input" placeholder="请输入邮件地址"></el-input>
				<div id="captcha">
	              <el-button :loading="true" id="wait" class="show" v-show="isShow">正在加载验证码......</el-button>
	            </div>
				<el-button type="primary" plain :disabled="input.length==0 || disabled" @click="forgetPwd">确定</el-button>
			</div>
		</div>
	</div>
	
</template>

<script>
	import { base,forgetPwd,toVerify } from '@/api/api'
	import gt from '../assets/js/gt.js'
	export default {
		name: 'forget',
		data(){
			return {
				base:base,
				mail: 'ouyinheng@163.com',
				input:'',
				isShow:true,//
				disabled:true
			}
		},
		mounted(){
	        var _this = this;
	        toVerify().then(data=>{
	            initGeetest({
	                gt: data.gt,
	                challenge: data.challenge,
	                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
	                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

	                product: "popup", // 产品形式，包括：float，popup
	                width: "300px"
	            },_this.verify);
	        }).catch();
	    },
		methods:{
			//验证码
		    verify(captchaObj) {
		        var _this = this;
		        captchaObj.appendTo('#captcha');
		        captchaObj.onReady(function () {
		              _this.isShow = false;
		        });
		        captchaObj.onSuccess(function () {
		              _this.disabled = false
		        })
		    },
			forgetPwd(){
				const _this = this;
				forgetPwd({param:_this.input}).then(data=>{
					console.log(data);
				}).catch();
			}
		}
	}
</script>

<style lang="scss" scoped>
.outcolor {
	width: 100%;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: RGB(241,241,241);
	.header {
		width: 100%;
		height: 60px;
		line-height: 60px;
		background: RGB(51,51,51);
		img {
			margin-top: 5px;
		}
		span {
			display: block;
			width: 150px;
			height: 20px;
			line-height: 20px;
			color: #fff;
			font-size: 20px;
			padding: 0 20px;
			border-left: 2px solid #cccccc;
			margin-top: 20px;
		}
	}
}
.forget {
	width: 800px;
	background: #FFF;
	margin: 60px auto 0;
	h3 span {
		display: block;
		color: #333;
		font-size: 24px;
		font-weight: 600px;
	}
	.h {
		padding: 20px 0;
		text-align: center;
		border-bottom: 2px solid #f7f7f7;
		margin: 0 30px 10px;
	}
	.content {
		width: 60%;
		margin: 0 auto;
		text-align: left;
		padding: 10px;
		span {
			display: block;
			margin: 20px 0;
			color: #333333;
			font-weight: normal;
			font-style: normal;
		}
		.el-input {
			display: block;
			width: 400px;
			height: 50px;
			line-height: 50px;
			margin: 0px 0 20px;
		}
		.el-button {
			width: 150px;
			height: 45px;
			display: block;
			align-items: center;
			margin: 80px auto 20px;
			border-radius: 10px;
		}
	}
}
</style>