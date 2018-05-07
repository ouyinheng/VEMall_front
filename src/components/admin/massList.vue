<template>
    <div class="massList">
      <el-col id="myCard" :span="4" v-for="(item, index) in massList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img v-lazy="base+'/queryImages?img='+item.icon_url" class="image">
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import { base } from '@/api/api'
    export default {
        name: 'massList', 
        data() {
            return {
              currentDate: new Date(),
              base:base
            };
        },
        computed:{
          ...mapState(['massList'])
        },
        methods:{
            ...mapActions([
              'getAllMass'
            ])
        },
        created(){
            var _this = this;
            this.getAllMass()
        }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
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
  
  #myCard {
    width: 20%;
    display: flex;
    flex-direction: col;
    flex-wrap: wrap;
    margin: 10px;
    justify-content: space-around;
  }
</style>