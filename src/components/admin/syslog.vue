<template>
	<div class="syslog">
		<el-table
		    :data="showData"
		    style="width: 100%">
		    <el-table-column
		      type="index"
		      :index="indexMethod">
		    </el-table-column>
		    <el-table-column
		      prop="user"
		      label="用户"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="limit"
		      label="权限"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="operate"
		      label="操作">
		    </el-table-column>
		    <el-table-column
		      prop="op_time"
		      label="时间">
		    </el-table-column>
		    <el-table-column
		      prop="place"
		      label="地点">
		    </el-table-column>
		     <el-table-column
		      prop="ip"
		      label="ip">
		    </el-table-column>
		</el-table>
		<!-- <el-pagination
		  background
		  @current-change="pagechange"
		  layout="prev, pager, next"
		  :total="1000">
		</el-pagination> -->
		<el-pagination
		  background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="page_size"
          layout="prev, pager, next"
          :total="total"
          >
        </el-pagination>
	</div>
</template>

<script>
	import { base,requestAllLog } from '@/api/api'
	export default {
		name: 'syslog',
		data(){
			return {
				page_size:10,
				total:0,
				showData:[],
				tableData: []
			}
		},
		methods:{
			indexMethod(index) {
		        return index;
		    },
		    handleSizeChange(val){

		    },
		    handleCurrentChange(cur){
		    	this.showData = this.setData(this.tableData,(cur-1)*10,(cur-1)*10+10);
		    },
		    setData(data,start,end){
		    	let arr = [];
		    	if(end>data.length){
		    		end = data.length
		    	}
		    	for(let i=start;i<end;i++){
		    		arr.push(data[i])
		    	}
		    	return arr;
		    }
		},
		created(){
			const _this = this;
			requestAllLog().then(data=>{
				_this.tableData = data;
				_this.total = _this.tableData.length;
				_this.showData = _this.setData(_this.tableData,0,10);
			}).catch()
		}
	}
</script>

<style lang='scss' scoped>
	
</style>