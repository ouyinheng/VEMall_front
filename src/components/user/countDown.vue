<template>
	<div class="countDown"> 
		<el-button :disabled="disabled" type="primary" @click='getAuthCode' class="auth">{{ msg }}</el-button>
	</div>
</template>

<script>
	export default {
		name: 'countDown',
		data(){
			return {
				msg:'获取验证码',
				disabled: false
			}
		},
		methods:{
			getAuthCode(){
				this.disabled = true;
				let timer = 120;
				const _this = this;
				this.msg = timer +'s';
				const interId = setInterval(function(){
					_this.msg = --timer + 's';
				},1000);
				setTimeout(function(){
					window.clearInterval(interId);
					_this.disabled = false;
					_this.msg = '重新获取'
				},120000);
				this.$emit('getAuthCode')
			}
		}
	}
</script>

<style>
	.countDown .auth {
		width: 100px;
		align-items: center;
	}
</style>