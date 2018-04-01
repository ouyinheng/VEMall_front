<template>
    <div class="index">
      <div>
        <el-upload
          class="upload-demo"
          drag
          action="http://192.168.17.131:3000/subject/savefile/"
          multiple
          :onSuccess="uploadSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
</template>

  <script>
    import $ from 'jquery'

    export default {
    name:'index',
    data: function () {
      return {
        
      }
    },
    methods: {
      uploadSuccess (response, file, fileList) {
        console.log('上传文件', response)
      }
    }
  }

</script>
<style>
 .index .router-link{color:#fff;}
 .index .but-group .el-button{margin-right: 20px;}
</style>
