<template>
	<div class="headTop">
  		<div class="left">
  			<span @click="toHome" class="home">首页</span>
  		</div>
  		<div class="right">
				<!-- <input type="text" name="search" class="input"> -->
			    <el-autocomplete
				  popper-class="my-autocomplete"
				  v-model="state3"
				  :fetch-suggestions="querySearch"
				  placeholder="请输入内容"
				  :trigger-on-focus="false"
				  @select="handleSelect">
				  <i
				    class="el-icon-edit el-input__icon"
				    slot="suffix"
				    @click="handleIconClick">
				  </i>
				  <template slot-scope="{ item }">
				    <div class="name">{{ item.longname }}</div>
				    <!-- <span class="addr">{{ item.address }}</span> -->
				  </template>
				</el-autocomplete>

			<span class="allGoods" @click="toSeeAllGoods">所有商品</span>
			<el-dropdown v-if="bool==undefined?false:bool">
                <img v-lazy="base+'/queryImages?img='+user.icon_url" alt="lost" class="icon">
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="myDetails">个人信息</el-dropdown-item>
                  <!-- <el-dropdown-item>切换账户</el-dropdown-item> -->
                  <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
			<span class="iconfont icon-account" @click="toPopup" v-else></span>

			<el-badge :value="treasure==null?0:treasure.length" class="item cart">
			  	<span class="iconfont icon-cart"  v-popover:popover1></span>
			</el-badge>
			<el-popover
			  ref="popover1"
			  placement="top-start"
			  title="购物车"
			  width="400"
			  trigger="hover"
			  content="哎呀，您的购物车竟然是空的！">
			   	<!-- {{treasure}} -->
			   	<div v-if="treasure != null">
			   		<el-checkbox-group v-model="checkedGoods"  class="goodsList">
					    <el-checkbox v-for="(item,index) in treasure"  :label="item" :key="index">
					    	<div class="left">
					      		<img v-lazy="base+'/queryImages?img=goods/allGoods/'+item.displayImg" alt="" width="78px">
					        </div>
					        <div class="right" style="width: 250px;">
					      		<span style="display:block;overflow: hidden; text-overflow:ellipsis; white-space: nowrap; text-align:right;">{{item.shortname}}</span></br>
					      		<span style="color: red;display:block;margin-top: 20px;margin-right:10px;">¥{{item.price}}&nbsp;&nbsp;&nbsp;&nbsp;x{{item.goodsNum}}</span>
					        </div>
					    </el-checkbox>
					    
				    </el-checkbox-group>
				    <div class="accounts">
					   	<div class="price">
					   		总计:</br><span style="color: red;font-size:18px;">¥{{allPrice}}</span>
					   	</div>
					   <el-button type="danger" :disabled="allPrice==0?true:false" @click="toPayment">结算</el-button>
					</div>
			   	</div>
			</el-popover>
  		</div>
	</div>
</template>

<script>
	import { base,queryCommodity } from '@/api/api'
	export default {
		name: 'headTop',
		data(){
			return {
				base:base,
		        min:'78_78',
				mid:'428_428',
				max:'800_800',
				num:0,
				checkedGoods:[],
				userInfo:{},
				// allPrice:0
				restaurants: [],
		        state3: ''
			}
		},
		computed:{
			allPrice(){
				var num =0;
				for(var i=0;i<this.checkedGoods.length;i++){
					num += (this.checkedGoods[i].price*this.checkedGoods[i].goodsNum)
				}
				return num;
			}
		},
		methods:{
			toHome(){
				this.$router.push('/');
			},
		    toPopup(){
		    	this.$emit('toPopup')
		    },
		    logout(){
		    	this.$emit('logout')
		    },
		    toPayment(){
		    	this.$emit("toPayment",this.checkedGoods);
		    },
		    myDetails(){
		    	this.$router.push('/myDetails');
		    },
		    toSeeAllGoods(){
		    	this.$router.push('/allGoods');
		    },
		    querySearch(queryString, cb) {
		        var restaurants = this.restaurants;
		        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		      },
		    createFilter(queryString) {
		        return (restaurant) => {
		          return (restaurant.longname.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		        };
		    },
		    handleSelect(item) {
		        let data = item;
				let picture = [];
		    	for(let i=0;i<data.picture.length;i++){
		    		let arr = data.picture[i].url.split('_');
		    		if(arr[0] == '78'){
		    			let url = '';
		    			for(let j=2;j<arr.length;j++){
		    				url += "_"+arr[j];
		    			}
						picture.push(url);
		    		}
		    	}
		    	data.picture = picture;
				sessionStorage.setItem('goodDetails', JSON.stringify(data));
				// this.$router.push('/allGoods')
				window.open(window.location.origin + '/#/goodDetails')
		    },
		    handleIconClick(ev) {
		        // console.log(ev);
		    }
		},
	    mounted() {
	      	const _this = this;
			queryCommodity({property:null}).then(data=>{
	      		_this.restaurants = data;
			}).catch()
	    },
		created(){
			// console.log(this.treasure,this.user);
			if(this.treasure != null){
				this.num = this.treasure.length;
			}
		},
		props:['user','bool','treasure']
	}
</script>

<style lang='scss' scoped>
	.headTop {
		width: 80%;
		height: 80px;
		margin: 0 auto;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 20px;
		background: RGB(3,3,3);
		.left {
			width: 55%;
			.home {
				cursor: pointer;
				height: 80px;
				line-height: 80px;
			}
			.home:hover {
				color: skyblue;
			}
			span {
				color: #fff;
			}
		}
		.right {
			width: 45%;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.allGoods {
				display: block;
				width: 80px;
				height: 80px;
				line-height: 80px;
				font-size: 16px;
				color: #fff;
				cursor: pointer;
				margin: 0 10px 0 10px;
			}
			>span,.cart {
				height: 40px;
				line-height: 40px;
				margin-top: 20px;
				font-size: 25px;
				color: #fff;
				padding: 0 10px;
			}
			>span:hover,.cart:hover {
				cursor: pointer;
			}
			.cart>span {
				font-size: 25px;
			}
			
		}
	}
	.el-popover {
		min-height: 400px;
		max-height: 410px;
		margin-right: 20px;
		.goodsList {
			width:400px;
			min-height: 300px;
			padding: 0 10px;
			overflow-x: hidden;
			overflow-y: auto;
			max-height: 400px;
			.left {
				margin: 0 10px;
				float: left;
			}
			.right {
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				text-align:right;
			}
			.el-checkbox {
				width:100%;
				margin-left: 0px;
			}
		}
		.accounts {
			width: 400px;
			height: 60px;
			padding: 0 21px;
			background: RGB(240,240,240);
			position: relative;
			bottom: -20px;
			left: -20px;
			z-index: 10;
			font-size: 14px;
			.price {
				margin: 10px 0 0 10px;
				float: left;
			}
			.el-button {
				width: 150px;
				margin-top: 10px;
				float: right;
			}
		}
	}
	.icon {
        width:40px;
        height:40px;
        border-radius:50%;

        /*vertical-align:middle;*/
        margin:20px 5px 0;
    }
    .icon:hover,.headTop .right .search span:hover {
        cursor: pointer;
    }
	  .my-autocomplete li {
	    line-height: normal;
	    padding: 7px;
		}
	    .my-autocomplete .name {
	      text-overflow: ellipsis;
	      overflow: hidden;
	    }
	    .my-autocomplete .addr {
	      font-size: 12px;
	      color: #b4b4b4;
	    }

	    .my-autocomplete .highlighted .addr {
	      color: #ddd;
	    }
</style>