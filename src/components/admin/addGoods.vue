<template>
    <div class='addGoods'>
        <div>
            <el-card class="box-card" v-if="isShow">
              <div slot="header" class="clearfix">
                <span>添加商品</span>
              </div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="商品名称" prop="shortname">
                    <el-input v-model="ruleForm.shortname"></el-input>
                  </el-form-item>
                  <el-form-item label="商品全称" prop="longname">
                    <el-input v-model="ruleForm.longname"></el-input>
                  </el-form-item>
                  <el-form-item label="简介描述" prop="intro">
                    <el-input v-model="ruleForm.intro"></el-input>
                  </el-form-item>
                  <el-form-item label="商品分类" prop="classify">
                    <el-input v-model="ruleForm.classify"></el-input>
                  </el-form-item>
                  <el-form-item label="展示价格" prop="price">
                    <el-input-number size="mini" v-model="ruleForm.price"></el-input-number> 元
                  </el-form-item>
                  <el-form-item label="库存数量" prop="num">
                     <el-input-number size="mini" v-model="ruleForm.num"></el-input-number> 件
                  </el-form-item>
                  <el-form-item label="购买限制" prop="astrict">
                    <el-input-number size="mini" v-model="ruleForm.astrict"></el-input-number> 件
                  </el-form-item>
                  <el-form-item label="发货地区" prop="region">
                      <myaddress @getAddressData="getAddressData"></myaddress>
                  </el-form-item>
                  <el-form-item label="商品性质" prop="property">
                      <el-radio-group v-model="ruleForm.property" size="small" >
                          <el-radio border v-model="ruleForm.property" :label="item" v-for="(item,index) in propertys" :key="index" @change="upIsUpload">{{item}}</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="首页图片">
                    <el-upload
                      :action="base+'/admin/savefile/?'+'goods/allGoods'"
                      list-type="picture-card"
                      :file-list="fileList"
                      :limit='1'
                      v-if="isUpload"
                      :onSuccess="uploadSuccess1"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="商品图片">
                    <el-upload
                      :action="base+'/admin/savefile/?'+upParam"
                      list-type="picture-card"
                      :file-list="fileArr"
                      multiple
                      v-if="isUpload"
                      :drag="true"
                      :onSuccess="uploadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="商品详情" prop="details" style="margin-top: 50px;">
                    <el-input type="textarea" v-model="ruleForm.details"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                  </el-form-item>
                </el-form>
            </el-card>

        </div>
    </div>
</template>

<script>
    import {base} from '@/api/api'
    import myaddress from '@/modules/address'
    import { appendCommodity,requestFileName } from '@/api/api'
    export default {
        name:'addGoods',
        data(){
            return {
                active:1,
                bool:false,
                dialogImageUrl: '',
                dialogVisible: false,
                base:base,
                isShow:true,//是否显示添加商品页
                isUpload:false,
                propertys:[],
                fileArr:[],
                fileList:[],
                ruleForm: {
                    shortname: '',    //商品名称
                    longname: '', //商品全程
                    intro: '',    //简介
                    classify: '', //分类
                    price: 1,     //价格
                    num: 0,       //数量
                    astrict: 0,   //没人限制购买量
                    region: '',   //发货地区
                    property: '', //活动性质
                    details: '',  //商品详情
                    displayImg:'',
                    picture: []   //商品图片路径
                },
                upParam:{},
                rules: {
                    shortname: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    longname: [
                        { required: true, message: '请输入商品名称', trigger: 'blur' }
                    ],
                    intro:{ required: true, message: '请输入商品简介', trigger: 'blur' },
                    classify:{ required: true, message: '请输入商品分类', trigger: 'blur' },
                    details:{ required: true, message: '请输入商品详情', trigger: 'blur' },
                }
            }
        },
        components:{
            myaddress
        },
        methods:{
          //得到发货区
            getAddressData(province,city,district){
                this.ruleForm.region = province+'-'+city+'-'+district;
                // console.log(this.ruleForm.region);
            },
            uploadSuccess(response, file, fileList) {
                console.log('上传文件', response)
                this.ruleForm.picture.push(response.data);
            },
            uploadSuccess1(response, file, fileList){
                console.log('上传文件', response)
                this.ruleForm.displayImg = response.data;
            },
            submitForm(formName) {
                var param = this.ruleForm;
                const _this = this;
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      appendCommodity(param).then(data=>{
                          this.$message({
                            message: '添加成功',
                            type: 'success'
                          });
                          _this.$refs[formName].resetFields();
                          _this.fileArr = [];
                          _this.fileList = [];
                      }).catch()
                  } else {
                    this.$message.error('添加失败');
                    return false;
                  }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            upIsUpload(value){
                this.isUpload = true;
                this.upParam = "goods/"+value;
            }
        },
        created(){
            const _this = this;
            requestFileName({param:'goods'}).then(data=>{
              _this.propertys = data;
            }).catch();
        }
    }
</script>
<style scoped>
    .index .router-link{color:#fff;}
    .index .but-group .el-button{margin-right: 20px;}
    .fullScreen:hover{
        color:#409EFF;
    }
    .box-card {
        min-height: 500px;
        /*max-height: 660px;*/
        /*overflow-y: scroll;*/
    }
    .shadow {
        position: absolute;
        z-index: 10;
        width: 100%;
        min-height: 700px;
        top: 10px;
        left: 2%;
        float: left;
        background: RGBA(0,0,0,0.5);
    }
</style>