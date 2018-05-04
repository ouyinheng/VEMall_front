<template>
	<el-table
		    :data="list"
		    style="width: 100%">
		    <el-table-column type="expand">
		      <template slot-scope="props">
		        <el-form label-position="left" inline class="demo-table-expand">
		          <el-form-item label="商品名称">
		            <span>{{ props.row.longname }}</span>
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
		             <img v-for="(item,index) in props.row.picture" :src="base+'/queryImages?img='+property+min+item" class="image" style="display:inline-block;width:78px;">
		          </el-form-item>
		          <el-form-item label="轮播图" v-if="property=='goods/slideshow/'">
		          	<div class="noimg" @click="getId(props.row.id)" v-if="props.row.slideshow.length == 0">
		          		请添加图片
		          	</div>
		          	<img v-for="(item,index) in props.row.slideshow" :src="base+'/queryImages?img=slideshow/'+item.url" class="image" style="display:inline-block;width:400px;"  @click="getId(props.row.id)">
		          	<el-dialog title="收货地址" :visible.sync="dialogTableVisible">
					  	<el-upload
	                      :action="base+'/admin/savefile/?slideshow'"
	                      list-type="picture-card"
	                      :file-list="fileList"
	                      :limit='1'
	                      :onSuccess="uploadSuccess"
	                      :on-preview="handlePictureCardPreview"
	                      :on-remove="handleRemove">
	                      <i class="el-icon-plus"></i>
	                    </el-upload>
					</el-dialog>
		          </el-form-item>
		        </el-form>
		      </template>
		    </el-table-column>
		    <el-table-column
		      label="商品 ID"
		      prop="id"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      label="商品名称"
		      prop="longname">
		    </el-table-column>
		    <el-table-column
		      label="描述"
		      prop="intro">
		    </el-table-column>
		    <el-table-column
		      label="操作"
		       width="150">
		       <template slot-scope="props">
		       		<el-button type="primary" icon="el-icon-edit" circle @click="editInfo(props.row)"></el-button>
		       </template>
		    </el-table-column>
		  </el-table>
</template>

<script>
	import { requestFileName,queryCommodity,base,addSlideShow,querySlideShow } from "@/api/api"
	export default {
		props:['list','property'],
		name: 'mytable',
		data(){
			return {
				base:base,
				min:'78_78',
				mid:'428_428',
				max:'800_800',
				dialogTableVisible: false,
				fileList:[]
			}
		},
		methods:{
			handleClick() {
		        alert('button click');
		    },
			getId(id){
				this.nowid = id;
				this.dialogTableVisible = true
				console.log(id)
			},
			uploadSuccess(response, file, fileList) {
				let url = response.data;
				let id = this.nowid;
				const _this = this;
				addSlideShow({id:id,url:url}).then(data=>{
					console.log(data)
					_this.fileList = [];
					_this.dialogTableVisible = false;
					this.$emit('updateList');
				}).catch()
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            editInfo(data){
            	console.log(data);
            }
		},
		created(){

		}
	}
</script>

<style>
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