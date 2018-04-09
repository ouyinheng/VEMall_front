<template>
	<div class="forget">
		 <el-button type="info" icon="el-icon-message" circle @click="findPwd">忘记密码</el-button>
	</div>
</template>

<script>
	import { toFindPwd } from '@/api/api'
	export default {
		name: 'forget',
		data(){
			return {
				mail:'ouyinheng@163.com'
				// mail:'851034271@qq.com'
			}
		},
		methods:{
			findPwd(){
				const _this = this;
				toFindPwd({param:_this.mail}).then(data=>{
					
				}).catch();
			}
		}
	}
</script>

<style scoped>
	
</style>