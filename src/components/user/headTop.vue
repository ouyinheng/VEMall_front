<template>
	<div class="headTop">
  		<div class="left">
  			<span>占位符</span>
  		</div>
  		<div class="right">
			<div class="search">
				<input type="text" name="search">
				<span class="el-icon-search"></span>
			</div>
			<span class="iconfont icon-account" @click="toPopup"></span>
			<el-badge :value="12" class="item cart">
			  	<span class="iconfont icon-cart"></span>
			</el-badge>
  		</div>
	</div>
</template>

<script>
	export default {
		name: 'headTop',
		data(){
			return {
				
			}
		},
		methods:{
		    toPopup(){
		    	this.$emit('toPopup')
		    }
		}
	}
</script>

<style>
	.headTop {
		width: 80%;
		height: 80px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20px;
	}
	.headTop .left {
		width: 65%;
	}
	.headTop .right {
		width: 35%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.headTop .right>span,.headTop .right .cart {
		height: 40px;
		line-height: 40px;
		margin-top: 10px;
		font-size: 25px;
		color: #fff;
		padding: 0 10px;
	}
	.headTop .right>span:hover,.headTop .right .cart:hover {
		cursor: pointer;
	}
	.headTop .right .cart>span {
		font-size: 25px;
	}
	/*搜索框*/
	.search {
		width: 275px;
		height: 36px;
		line-height: 36px;
		margin-top: 10px;
		border: 1px solid gray;
		border-radius: 20px;
		
	}
	.search input {
		display: block;
		width: 220px;
		height: 36px;
		line-height: 36px;
		padding-left: 15px;
		float: left;
		border: none;
		border-radius: 20px;
		outline: none;
		font-size: 14px;
		/*background: rgba(255,255,255,0);*/
		background-color: transparent;
	}
	.headTop .right .search span {
		width: 30px;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		background: pink;
		font-size: 20px;
		color: #fff;
		float: right;
		border-radius: 50%;
		text-align: center;
	}
</style>