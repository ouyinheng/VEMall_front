<template>
    <div class="management">
      <div>
        <el-button @click='getRes'>默认按钮</el-button>
      </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {requestImages} from '../../../api/api'
    export default {
        name:'management',
        data: function () {
            return {
              
            }
        },
        methods: {
            getRes(){
                requestImages().then((data)=>{
                  console.log(data);
                })
            }
        }
    }

</script>
<style>
   .management .router-link{color:#fff;}
   .management .but-group .el-button{margin-right: 20px;}
</style>
