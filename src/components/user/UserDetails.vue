<template>
	<div class="UserDetails">
		<header class="title">品牌精选</header>
		<div class="flexT">
			<div>
				<img :src="base+'/queryImages?img='+user.icon_url" alt="" width='100px'>
				<el-upload
				  class="upload-demo"
				  :action="base+'/admin/savefile/?icon'"
				  :show-file-list="false"
				  :limit='1'
				  :onSuccess="uploadSuccess"
				  list-type="picture">
				  <div style="margin:10px 0;">修改头像</div>
				  <el-button size="small" type="primary">点击上传</el-button>
				</el-upload>
			</div>
		</div>
	</div>
</template>

<script>
	import { base,editUserIcon } from "@/api/api"
	export default {
		name: 'UserDetails',
		data(){
			return {
				base:base,
				user:''
			}
		},
	    methods: {
	      	uploadSuccess(response, file, fileList) {
                console.log('上传文件', response)
                const _this = this;
                editUserIcon({icon_url:response.data,id:_this.user.id}).then(data=>{
                	_this.user.icon_url = "icon/"+response.data
                	sessionStorage.setItem('user',JSON.stringify(_this.user))
                }).catch()
          	}
	    },
		created(){
			this.user = JSON.parse(sessionStorage.getItem('user'));
		}
	}
</script>

<style>
.UserDetails {
	width: 1000px;
	margin: 0px 0 0 20px;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.UserDetails .title {
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
.UserDetails .flexT {
	width: 100%;
	padding: 20px;
}
.UserDetails .flexT>div{
	width: 100%;
	padding: 10px 0;
	border-bottom: 1px solid #dadada;
	text-align: left;
	display: flex;
	flex-direction: row;

}
.UserDetails .flexT img{
	height: 100px;
	border-radius: 10px;
	margin-right: 40px;
}
</style>