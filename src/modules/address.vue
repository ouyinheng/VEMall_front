<!-- 地址选择组件 -->
<template>
    <div>
        <el-select v-model="province" clearable placeholder="请选择" filterable @change="toChange">
            <el-option
              v-for="(item,index) in addressData"
              :key="index"
              :label="index"
              :value="index">
            </el-option>
        </el-select>
        <el-select v-model="city" clearable placeholder="请选择" filterable>
            <el-option
              v-for="(item,index) in addressData[province]"
              :key="index"
              :label="index"
              :value="index">
            </el-option>
        </el-select>
         <el-select v-model="district" v-if="province!=''" clearable placeholder="请选择" filterable @change="setData">
            <el-option
              v-for="(item,index) in addressData[province][city]"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
        </el-select>
    </div>
</template>
<script>
    import addressData from '../assets/js/addressData.js'
    export default {
        name:'myaddress',
        data: function () {
            return {
                addressData:addressData,
                province:'',
                city:'',
                district: ''
            }
        },
        computed: {
          
        },
        methods: {
            toChange(){
                this.city = '';
                this.district = '';
            },
            setData(){
                this.$emit('getAddressData',this.province,this.city,this.district);
            }
        },
        created:function(){
        }
    }
</script>
<style>

</style>
