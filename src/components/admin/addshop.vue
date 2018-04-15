<template>
    <div class="addshop">
      <myaddress @getAddressData="getAddressData"></myaddress>
    </div>
</template>

<script>
    import { mapState,mapActions } from 'vuex'
    import { base } from '@/api/api'
    import myaddress from '@/modules/address'
    export default {
        name: 'addshop', 
        data() {
            return {
                
            };
        },
        components:{
            myaddress
        },
        computed:{

        },
        methods:{
            getAddressData(province,city,district){
                console.log(province,city,district);
            }
        },
        created(){
        }
    }
</script>

<style scoped>
  
</style>