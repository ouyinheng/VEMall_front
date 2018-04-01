<template>
    <div class="userList">
        <el-card class="box-card">
            <el-table
            :data="list"
            align="center"
            header-align="center"
            style="width: 100%">
           <el-table-column
              type="index"
              :index="indexMethod">
            </el-table-column>
            <el-table-column
              prop="icon_url"
              width="80"
              label="头像" >
              <template slot-scope="scope">
                <img style="width:40px;height:40px;border-radius:50%;" :src="'http://192.168.17.131:3000/queryImages?img='+scope.row.icon_url">
              </template>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="password"
              label="密码">
            </el-table-column>
            
            <el-table-column
              label="账号状态"
              prop="status"
              width="120">
             <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="handleChange(scope.$index, scope.row)">
              </el-switch>
            </template>
            </el-table-column>
            <el-table-column
              prop="limit"
              label="标签"
              width="120">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.limit === 1 ? 'danger':scope.row.limit === 2?'primary' : 'success'"
                  close-transition>{{scope.row.limit === 1?'系统管理员':scope.row.limit === 2?'管理员':'成员'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
           <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="page_size"
                  layout="prev, pager, next, jumper"
                  :total="userList.length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {mapState,mapActions,mapGetters } from 'vuex'
    export default {
        name: 'userList',
        data() {
          return {
            list:[],
            page_size:8
          };
        },
        computed:{
          ...mapState(['userList'])
        },
        methods:{
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.limitList(this.userList,val-1);
                if(val == this.page_size){
                    currentPage1 = this.page_size;
                }
                console.log(`当前页: ${val}`);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            limitList(data,page){
                var start = page * 8;
                var end = start + 8;
                this.list = data.slice(start,end);
            },
            indexMethod(index) {
                return index +1 ;
            },
            handleChange(index,data){
              console.log(index,data);
            },
            ...mapActions([
              'getAllUser'
            ])
        },
        created(){
            var _this = this;
            this.getAllUser().then(data=>{
                _this.limitList(_this.userList,0);
            })
        }
    }
</script>

<style scoped>
    
</style>