<template>
    <div class='addGoods'>
        <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>添加商品</span>
              </div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="商品名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
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
                  <el-form-item label="活动性质" prop="property">
                    <el-checkbox-group v-model="ruleForm.property">
                        <el-radio v-model="ruleForm.property" label="正常发布">正常发布</el-radio>
                        <el-radio v-model="ruleForm.property" label="促销活动">促销活动</el-radio>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="活动图片">
                    <el-upload
                      :action="base+'/admin/savefile/'"
                      list-type="picture-card"
                      multiple
                      :onSuccess="uploadSuccess"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                  <el-form-item label="商品详情" prop="details">
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
    import { appendCommodity } from '@/api/api'
    export default {
        name:'addGoods',
        data(){
            return {
                active:1,
                bool:false,
                dialogImageUrl: '',
                dialogVisible: false,
                base:base,
                ruleForm: {
                    name: '',    //商品名
                    intro: '',   //简介
                    classify: '',//分类
                    price: 1,    //价格
                    num: 0,      //数量
                    astrict: 0,  //没人限制购买量
                    region: '',  //发货地区
                    property: '',//活动性质
                    details: '', //商品详情
                    picture: []  //商品图片路径
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
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
                console.log(this.ruleForm.region);
                this
            },
            uploadSuccess(response, file, fileList) {
                console.log('上传文件', response)
                this.ruleForm.picture.push(response.data);
            },
            submitForm(formName) {
                var param = this.ruleForm;
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      appendCommodity(param).then(data=>{
                          this.$message({
                            message: '添加成功',
                            type: 'success'
                          });
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
            }
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