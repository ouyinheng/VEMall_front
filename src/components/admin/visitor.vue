<template>
    <div class="visitor">
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <div id="gender" :style="{width: '300px', height: '300px'}"></div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'

    export default {
        name: 'visitor',
        data(){
            return {
                gender:{
                    female:0,
                    male:0
                },
                limits:{
                    sysAdmin:0,
                    admin:0,
                    member:0
                }
            }
        },
        mounted(){
            
        },
        computed:{
          ...mapState(['userList']),
        },
        methods:{
            drawLine(){
                const _this = this;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                let gender = this.$echarts.init(document.getElementById('gender'))
                // 绘制图表
                myChart.setOption({
                    title: { text: '' },
                    tooltip: {},
                    xAxis: {
                        data: ["系统管理员","管理员","成员"]
                    },
                    yAxis: {},
                    series: [{
                        name: '',
                        type: 'bar',
                        data: [_this.limits.sysAdmin, _this.limits.admin, _this.limits.member]
                    }]
                });
                gender.setOption({
                    title: { text: '男女比例' },
                    series : [{
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        roseType: 'angle',
                        data:[
                            {value:_this.gender.male, name:'男:'+_this.gender.male},
                            {value:_this.gender.female, name:'女:'+_this.gender.female}
                        ]}
                    ]
                });
               
            },
            ...mapActions([
              'getAllUser'
            ])
        },
        created(){
            const _this = this;
            this.getAllUser().then((data)=>{
                _this.userList.forEach((item,index)=>{
                    if(item.gender == 0){
                        _this.gender.male ++
                    } else {
                        _this.gender.female ++
                    }
                    if(item.limit == 1){
                        _this.limits.sysAdmin ++
                    } else if(item.limit == 2){
                        _this.limits.admin ++
                    } else {
                        _this.limits.member ++
                    }
                })
                this.drawLine();
            })
        }
    }
</script>

<style scoped>
    
</style>