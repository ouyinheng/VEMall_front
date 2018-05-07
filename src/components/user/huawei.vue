<template>
	<div class="huawei">
		<div class="left">
			<div class="content" style="color:#fff;">
				<img img="@/../static/images/hot/p20name.png" alt="图片不见了">
				<span style="font-size:20px;">4000万莱卡双摄*,</br>AI摄影大师</span></br>
				<div class="toKown">
					<span style="font-size: 25px;margin-top: 500px;">了解更多</span>
					<span class="el-icon-back turn" style="font-size: 25px;"></span>
				</div>
				<span style="font-size:10px;" class="smallFont">HUAWEI P20 Pro为后置4000万+2000万+800万像素徕卡三镜头</span>
				<img v-lazy="img" class="phone">
			</div>
		</div>
		<div class="right">
			<img src="@/../static/images/hot/be5bae72-bd0d-47be-8554-272cf573eea7.jpg" alt="图片不见了" width="450px">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'huawei',
		data(){
			return {
				img:'@/../static/images/hot/products-phone-img-04.png'
			}
		}
	}
</script>
<style>
	.huawei {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.huawei .left {
		width: 600px;
		height: 450px;
		background: RGB(52,187,223);
		text-align: left;
	}
	.huawei .left .content {
		width: 350px;
		position: relative;
		top: 80px;
		left: 100px;
		/*padding: 10px;*/
	}
	.huawei .left .content:hover {
		cursor: pointer;
	}
	.huawei .left .content .phone {
		position: relative;
		top: -380px;
		right: -250px;
		float: right;
		transition: margin 0.5s;
	}
	.huawei .left .content:hover .phone {
		margin-top: -30px;
	}
	.huawei .left .content>span {
		display: block;
		margin-top: 30px;
	}
	.huawei .left .content .toKown {
		margin-top: 70px;
	}
	.huawei .left .content .toKown .turn {
		transform: rotate(180deg);
		transition: margin 0.5s;
	}
	.huawei .left .content:hover .toKown .turn {
		margin-left: 20px;
	}
	.huawei .left .content .smallFont {
		display: block;
		margin-top: 70px;
	}
	.huawei .right {
		width: 450px;
		height: 500px;
		background: #fff;
	}
</style>