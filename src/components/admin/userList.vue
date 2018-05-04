<template>
    <div class="userList">
       <transition name="el-zoom-in-top">
        <el-card class="user-card" style="padding:0;margin:0;" v-if="isShow">
            <el-table
            :data="list"
            align="center"
            header-align="center"
            style="width: 100%;padding:0;margin:0;">
           <el-table-column
              type="index"
              :index="indexMethod">
            </el-table-column>
            <el-table-column
              prop="icon_url"
              label="头像" >
              <template slot-scope="scope">
                <img style="width:40px;height:40px;border-radius:50%;" :src="base+'/queryImages?img='+scope.row.icon_url">
              </template>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
              <template  slot-scope="scope">
                <el-tag type="warning">{{scope.row.gender==0?'男':'女'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="密码">
              <template  slot-scope="scope">
                <span>你是看不到的</span>
              </template>
            </el-table-column>
            <el-table-column
              label="账号状态"
              prop="status">
             <template slot-scope="scope">
              <el-switch
                style="display: block"
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :disabled="true"
                @change="handleChange(scope.$index, scope.row)">
              </el-switch>
            </template>
            </el-table-column>
            <el-table-column
              prop="limit"
              label="标签">
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
                  :total="total"
                  >
                  <!-- :total="userList.length" -->
                </el-pagination>
            </div>
        </el-card>
      </transition>
        <el-card class="user-card" v-if="!isShow">
            <div slot="header" class="clearfix">
              <span>修改信息</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
             <el-form-item label="密码">
                <el-input v-model="form.password" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="账号状态">
                <el-switch v-model="form.status"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即提交</el-button>
                <el-button @click="toBack">取消</el-button>
              </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import {mapState,mapActions,mapGetters } from 'vuex'
    import { base, editUser,delUser } from '@/api/api'
    export default {
        name: 'userList',
        data() {
          return {
            list:[],
            page_size:8,
            base:base,
            isShow:true,
            form: {
                username:'',
                password:'',
                status:'',
                icon_url:'',
                id:0             
            },
            total:0
          };
        },
        computed:{
          ...mapState(['userList']),
          ...mapGetters(['changeGender'])
        },
        methods:{
            updateUserInfo(){
                const _this = this;
                this.getAllUser().then(data=>{
                    _this.list = _this.userList;
                    _this.limitList(_this.userList,0);
                    _this.total = _this.userList.length;
                })
            },
            toEdit(info){
                const _this = this;
                editUser(info).then(data=>{
                    this.$message({
                      type: 'success',
                      message: '修改成功!',
                    });
                    _this.updateUserInfo();
                }).catch(error=>{
                    this.$message({
                        type: 'error',
                        message: '修改失败!'
                    });
                })
            },
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
            //修改用户信息
            handleEdit(index, row) {
                this.form = {
                    username:row.username,
                    password:row.password,
                    status:row.status,
                    id:row.id
                }
                this.isShow = !this.isShow;
            },
            handleDelete(index, row) {
                const _this = this;
                var tip = '此操作将永久删除用户信息, 是否继续?';
                this.$confirm(tip, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    delUser({id:row.id}).then(data=>{
                        this.$message({
                          type: 'success',
                          message: '删除成功!',
                        });
                        _this.updateUserInfo();
                    }).catch(error=>{
                        this.$message({
                          type: 'error',
                          message: '删除失败!'
                        });
                    })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消操作'
                  });          
                });
            },
            limitList(data,page){
                var start = page * 8;
                var end = start + 8;
                this.list = data.slice(start,end);
            },
            indexMethod(index) {
                return index +1 ;
            },
            handleChange(index,row){
                const _this = this;
                this.form = {
                    username:row.username,
                    password:row.password,
                    status:row.status==true?1:0,
                    id:row.id
                }
                this.$confirm('此操作将x修改用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.toEdit(_this.form);
                }).catch(() => {
                    _this.list.status = !_this.list.status;
                    this.$message({
                        type: 'info',
                        message: '已取消修改'
                    });          
                });
            },
            onSubmit() {
                const _this = this;
                this.$confirm('此操作将x修改用户信息, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    editUser(_this.form).then(data=>{
                        this.$message({
                          type: 'success',
                          message: '修改成功!',
                        });
                        _this.updateUserInfo();
                        _this.isShow = !_this.isShow;
                    }).catch(error=>{
                        this.$message({
                            type: 'error',
                            message: '修改失败!'
                        });
                    })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消修改'
                  });          
                });
            },
            toBack(){
                this.isShow = !this.isShow;
            },
            ...mapActions([
              'getAllUser'
            ])
        },
        created(){
            this.updateUserInfo();
        }
    }
</script>

<style scoped>
    .user-card {
      margin: 0;
    }
    .text {
      font-size: 14px;
    }

    .item {
      padding: 18px 0;
    }

</style>