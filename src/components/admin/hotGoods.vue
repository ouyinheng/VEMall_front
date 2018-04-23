<template>
	<div class="hotGoods">
		
		<span class="title">热门商品</span>
		<el-table
		    :data="data"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="商品名称">
		            <span>{{ props.row.name }}</span>
		          </el-form-item>
		          <el-form-item label="商品 ID">
		            <span>{{ props.row.id }}</span>
		          </el-form-item>
		          <el-form-item label="商品分类">
		            <span>{{ props.row.classify }}</span>
		          </el-form-item>
		           <el-form-item label="商品价格">
		            <span>{{ props.row.price }}</span>
		          </el-form-item>
		          <el-form-item label="发货地址">
		            <span>{{ props.row.region }}</span>
		          </el-form-item>
		          <el-form-item label="商品详情">
		            <span>{{ props.row.details }}</span>
		          </el-form-item>
		          <el-form-item label="商品图片">
		            <!-- <span>{{ props.row.details }}</span> -->
		             <img v-for="(item,index) in props.row.picture" :src="base+'/queryImages?img=goods/hotGoods/'+min+item" class="image" style="display:inline-block;width:78px;">
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="商品 ID"
		      prop="id">
		    </el-table-column>
		    <el-table-column
		      label="商品名称"
		      prop="name">
		    </el-table-column>
		    <el-table-column
		      label="描述"
		      prop="intro">
		    </el-table-column>
		  </el-table>
	</div>
</template>

<script>
	import { requestFileName,queryCommodity,base } from "@/api/api"
	export default {
		nama: 'hotGoods',
		data(){
			return {
				fileArr:[],
				currentDate: new Date(),
				data:[],
				base:base,
				min:'78_78',
				mid:'428_428',
				max:'800_800',
				 tableData5: [{
			          id: '12987122',
			          name: '好滋好味鸡蛋仔',
			          category: '江浙小吃、小吃零食',
			          desc: '荷兰优质淡奶，奶香浓而不腻',
			          address: '上海市普陀区真北路',
			          shop: '王小虎夫妻店',
			          shopId: '10333'
			        }, {
			          id: '12987123',
			          name: '好滋好味鸡蛋仔',
			          category: '江浙小吃、小吃零食',
			          desc: '荷兰优质淡奶，奶香浓而不腻',
			          address: '上海市普陀区真北路',
			          shop: '王小虎夫妻店',
			          shopId: '10333'
			        }, {
			          id: '12987125',
			          name: '好滋好味鸡蛋仔',
			          category: '江浙小吃、小吃零食',
			          desc: '荷兰优质淡奶，奶香浓而不腻',
			          address: '上海市普陀区真北路',
			          shop: '王小虎夫妻店',
			          shopId: '10333'
			        }, {
			          id: '12987126',
			          name: '好滋好味鸡蛋仔',
			          category: '江浙小吃、小吃零食',
			          desc: '荷兰优质淡奶，奶香浓而不腻',
			          address: '上海市普陀区真北路',
			          shop: '王小虎夫妻店',
			          shopId: '10333'
			        }]
			}
		},
		methods:{
			getData(){
				const _this = this;
				queryCommodity({property:'hotGoods'}).then(data=>{
					console.log(data,'hotGoods');
					_this.data = data;
					for(let i=0;i<data.length;i++){
						let picture = [];
						for(let j=0;j<data[i].picture.length;j++){
				    		let arr = data[i].picture[j].url.split('_');
				    		if(arr[0] == '78'){
				    			let url = '';
				    			for(let j=2;j<arr.length;j++){
				    				url += "_"+arr[j];
				    			}
								picture.push(url);
				    		}
				    	}
				    	_this.data[i].picture = picture;
					}
					console.log(_this.data);
				}).catch()
			}
		},
		created(){
			this.getData();
			const _this = this;
			requestFileName({param:'hotGoods'}).then(data=>{
				_this.fileArr = data;
			}).catch();
		}
	}
</script>

<style>
.hotGoods {
	width: 90%;
	min-width: 1200px;
	/*padding: 10px;*/
	margin: 0 auto;
	border: 1px solid #dcdcdc;
	border-radius: 8px;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
	overflow: hidden;
}
.hotGoods .title {
	display: block;
	width: 100%;
	height: 60px;
	line-height: 60px;
	padding-left: 30px;
	font-size: 20px;
	text-align: left;
	border-bottom: 1px solid #dcdcdc;
	box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
	border-color: rgba(0,0,0,.14);
}
.price {
    font-size: 13px;
    color: red;
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
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>