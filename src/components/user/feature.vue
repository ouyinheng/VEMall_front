<!-- 特色 -->
<template>
	<div class="feature">
		<el-row>
		  <el-col :span="4" v-for="(item, index) in data" :key="index" style="margin:5px;">
		    <el-card :body-style="{ padding: '0px' }">
		     <img v-lazy="item.url" class="image">
		      <div style="padding: 14px;">
		        <span>好吃的汉堡</span></br>
		        <span style="font-size:14px;color:gray;">好吃的汉堡</span>
		        <div class="bottom clearfix">
		        	<span style="color:red">￥12345</span>
		        </div>
		      </div>
		    </el-card>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'feature',
		data(){
			return {
				data:[{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/dacba6e1-f5cf-4db2-8dfa-da6b16b98bac.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/43bac4e7-c7f6-4776-966b-7fa24aee334b.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/1cec0736-b403-4bf3-9bb0-1171470f4cc8.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				},{
					title:'潮范儿&学生',
					content:'小轻快</br>电力持久，时刻玩的High',
					url:'@/../static/images/feature/a63be799-d333-4a99-8a05-bc83d0495940.jpg'
				}]
			}
		}
	}
</script>

<style>
.feature {
	width: 1200px;
	margin: 150px auto;
}
.time {
    font-size: 13px;
    color: #999;
}
  
.bottom {
    margin-top: 13px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    width: 100%;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
  
.clearfix:after {
    clear: both
}
</style>