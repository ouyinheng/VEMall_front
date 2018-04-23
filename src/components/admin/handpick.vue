<template>
	<div class="handpick">
		<span class="title">品牌精选</span>
		 <el-table
		    :data="data"
		    style="width: 100%;"
		    :row-class-name="tableRowClassName">
		    <el-table-column
		      type="index"
		      width="50">
		    </el-table-column>
		    <el-table-column
		      prop="displayImg"
		      label="商品图片"
		      width="180">
		      <template slot-scope="scope">
                <img :src="base+'/queryImages?img=goods/allGoods/'+scope.row.displayImg" class="image" width="78px">
              </template>
		    </el-table-column>
		    <el-table-column
		      prop="classify"
		      label="商品类别"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="商品名"
		      width="280">
		    </el-table-column>
		     <el-table-column
		      prop="region"
		      label="发货地区"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="num"
		      label="数量(个)"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="details"
		      label="商品详情"
		      width="320">
		    </el-table-column>
		    <el-table-column
		      prop="price"
		      label="价格(元)">
		      <template slot-scope="scope">
		      		<span style="color: red;font-size: 18px;">¥{{scope.row.price}}</span>
		      </template>
		    </el-table-column>
		  </el-table>
	</div>
</template>

<script>
	import { requestFileName,queryCommodity,base } from "@/api/api"
	export default {
		name: 'handpick',
		data(){
			return {
				fileArr:[],
				currentDate: new Date(),
				data:[],
				base:base,
				min:'78_78',
				mid:'428_428',
				max:'800_800'
			}
		},
		methods:{
			getData(){
				const _this = this;
				queryCommodity({property:'handpick'}).then(data=>{
					console.log(data,'handpick');
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
			},
			tableRowClassName({row, rowIndex}) {
		        if (rowIndex === 1) {
		          return 'warning-row';
		        } else if (rowIndex === 3) {
		          return 'success-row';
		        }
		        return '';
		    }
		},
		created(){
			this.getData();
			const _this = this;
			requestFileName({param:'handpick'}).then(data=>{
				_this.fileArr = data;
			}).catch();
		}
	}
</script>

<style>
.handpick {
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
.handpick .title {
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
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>