<template>
    <div>
        <div style="background-color: rgb(255, 255, 255);padding: 10px;height: 495px;">

            <!-- 数量统计 -->
            <div class="main-top-card" style="margin-top: 50px;">

                <el-card class="box-card"  style="background-image: repeating-linear-gradient(122.5deg,rgb(255,253,20) -11.3%, rgba(214,49,102,1) 99.5%, rgba(43,60,194,1) 0, rgba(80,141,133, 0) 137.2%);">
                    <div  class="text item">
                        <div><i class="el-icon-user-solid icon-size icon-color-user"></i></div>
                        <div>
                            <div class="card-text card-num">用户总数</div>
                            <div class="card-num">{{userCount}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" style="background-image: repeating-linear-gradient(304.9deg,rgb(255,253,20) -13.7%, rgba(4,202,223,1) 99.5%, rgba(131,194,43,1) 0, rgba(80,141,133, 0) 112.4%);">
                    <div  class="text item">
                        <div><i class="el-icon-document icon-size icon-color-doc"></i></div>
                        <div>
                            <div class="card-text card-num">订单总数</div>
                            <div class="card-num">{{totalOrder}}</div>
                        </div>
                    </div>
                </el-card>
                <el-card class="box-card" style="background-image: repeating-linear-gradient(303.8deg,rgba(253,253,192,1) -13.4%, rgba(189,68,204,1) 96.1%, rgba(80,141,133,0) 115.9%);">
                    <div  class="text item">
                        <div><i class="el-icon-s-flag icon-size icon-color-user-type"></i></div>
                        <div>
                            <div class="card-text card-num">销售额</div>
                            <div class="card-num">{{totalMoney}}</div>
                        </div>
                    </div>
                </el-card>

            </div>
            <!-- 数量统计结束 -->

            <el-row style="margin-top: 100px;">
                <el-col :span="7">
                    <div >
                        <el-card class="box-card-echarts" >
                            <div class="text item echarts-render" v-loading="waitcharts" element-loading-text="正在疯狂加载" id="typeEcharts">

                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="7" >
                    <div class="grid-content">
                        <el-card class="box-card-echarts">
                            <div  class="text item echarts-render" v-loading="waitcharts" element-loading-text="正在疯狂加载" id="moneyEcharts">

                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col :span="10"><div class="grid-content " >
                    <div class="grid-content">
                        <el-card class="box-card-echarts-last" v-loading="waitcharts" element-loading-text="正在疯狂加载" id="transporEcharts">
                            <div  >
                            
                            </div>
                        </el-card>
                    </div>
                </div>
                </el-col>
            </el-row>
			<!-- <div style="margin-top: 25px;">
				<el-carousel :interval="4000" type="card" height="400px"  >
					<el-carousel-item v-for="item in adList" :key="item">
						<img v-if="item" :src="item" >
					</el-carousel-item>
				</el-carousel>
			</div> -->
        </div>
        
    </div>
</template>

<script>
    import { queryTotal } from '@/api/getUser.js';
	import {
		queryByCondition,
		selectByName,
		getByOperation,
		queryByCondition1,
		queryByTypeId,
		getmoney
	} from "@/api/mainPage.js";
    import { setStorage, getStorage} from "@/utils/localStorage.js";
    //引入面包屑组件

    export default {
		
        data() {
            return {
				//标语列表
				adList:["http://5b0988e595225.cdn.sohucs.com/images/20180122/6ac4ce92c3414bcc9dcb9811cffd977d.jpeg",
				"http://pic.baike.soso.com/ugc/baikepic2/18371/20180116183604-135628557_jpg_1024_697_59019.jpg/0",
				"https://file03.sg560.com/upimg01/2016/08/918087/Content/1827352901932343918087.jpg"],
				//遮罩
				waitcharts:true,
				//订单总数
				totalOrder:'0',
                //用户总数
                userCount:'',
				//销售总额
				totalMoney:'',
				//订单类型数据
                typeoption :{
                    title: {
                        text: '订单类型 ',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show:false,

                    },
                    series: [
                        {
                            avoidLabelOverlap: true,
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },
				//耗材清单
                moneyoption :{
                  backgroundColor: '#ffffff',
                  title: {
                    text: '耗材清单',
                    left: 'center',
                    top: 0,
                    textStyle: {
                      color: '#000'
                    }
                  },
                  tooltip: {
                    trigger: 'item'
                  },
                  visualMap: {
                    show: false,
                    min: 0,
                    max: 200,
                    inRange: {
                      colorLightness: [0, 1.5]
                    }
                  },
                  series: [
                    {
                      name: '耗材清单',
                      type: 'pie',
                      radius: '55%',
                      center: ['50%', '50%'],
                      data: [
                        { value: 335, name: 'Direct' },
                        { value: 310, name: 'Email' },
                        { value: 274, name: 'Union Ads' },
                        { value: 235, name: 'Video Ads' }
                      ],
                      roseType: 'radius',
                      label: {
                        color: 'rgba(0,0,0,0.5)'
                      },
                      labelLine: {
                        lineStyle: {
                          color: 'rgba(0,0,0, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                      },
                      itemStyle: {
                        color: '#aaffff',
                        shadowBlur: 200,
                        shadowColor: 'rgba(255, 255, 127, 0.5)'
                      },
                      animationType: 'scale',
                      animationEasing: 'elasticOut',
                      animationDelay: function (idx) {
                        return Math.random() * 200;
                      }
                    }
                  ]
                },
				//运输利润数据
                transporoption : {
					title: {
					    text: '运输利润',
					    left: 'center',
						top:20
					},
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      type: 'line',
                      lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                      }
                    }
                  },
                  legend: {
						show:false
                  },
                  singleAxis: {
                    top: 50,
                    bottom: 50,
                    axisTick: {},
                    axisLabel: {},
                    type: 'time',
                    axisPointer: {
                      animation: true,
                      label: {
                        show: true
                      }
                    },
                    splitLine: {
                      show: true,
                      lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                      }
                    }
                  },
                  series: [
                    {
                      type: 'themeRiver',
                      emphasis: {
                        itemStyle: {
							colorBy: 'data' ,
                          shadowBlur: 20,
                          shadowColor: 'rgba(0, 255, 127, 0.8)'
                        }
                      },
                      data: [
                        ['2015/11/08', 10, 'DQ'],
                        ['2015/11/09', 15, 'DQ'],
                        ['2015/11/10', 35, 'DQ'],
                        ['2015/11/11', 38, 'DQ'],
                        ['2015/11/12', 22, 'DQ'],
                        ['2015/11/13', 16, 'DQ']
                      ]
                    }
                  ]
                }


            }


        },
        methods: {
            getTyprEcharts(){
				this.moneyoption.series[0].data=[];
				this.typeoption.series[0].data=[];
				this.transporoption.series[0].data=[];
				//销售额度
				getmoney().then((res)=>{
				    if(res != -1){
				        this.totalMoney = res.datas;
				    }
				})
				//用户总数
                queryTotal().then((res)=>{
                    if(res != -1){
                        this.userCount = res.datas;
                    }
                })
				//查询各个类型数量
				queryByTypeId({"materialtypeId":1}).then((res)=>{
					// console.log("data66666666666666")
				 //  console.log(this.moneyoption.series.data)
				  if(res != -1){
					  this.moneyoption.series[0].data.push({value: parseInt(res.datas), name: '办公耗材' });
				  }
					
				})
				queryByTypeId({"materialtypeId":2}).then((res)=>{
				  // console.log(res)
				  if(res != -1){
					  this.moneyoption.series[0].data.push({value: parseInt(res.datas), name: '卫生耗材' });
				  }
					
				})
				queryByTypeId({"materialtypeId":3}).then((res)=>{
				  console.log(res)
				  if(res != -1){
					  this.moneyoption.series[0].data.push({value: parseInt(res.datas), name: '人员耗材' });
				  }
					
				})
				queryByTypeId({"materialtypeId":4}).then((res)=>{
				  console.log(res)
				  if(res != -1){
					  this.moneyoption.series[0].data.push({value: parseInt(res.datas), name: '团建耗材' });
				  }
					
				})
				//运输订单数量
				queryByCondition1({}).then((res)=>{
				  console.log(res)
				  if(res != -1){
					  this.typeoption.series[0].data.push({ value: parseInt(res.datas.length), name: '运输订单' });
						this.totalOrder =parseInt(this.totalOrder)+ parseInt(res.datas.length);
						res.datas.forEach((item, index) => {
							this.transporoption.series[0].data.push([item.transportationStartTime,parseInt(item.transportationMoney),"利润"])
							
							
						})
						console.log("************")
				  }
					
				})
				//货物订单数量
				queryByCondition({}).then((res)=>{
				  if(res != -1){
				    
				    this.totalOrder =parseInt(this.totalOrder)+ parseInt(res.datas.length);
				    
					// console.log("这是data");
					// console.log(this.typeoption.series[0].data);
					this.typeoption.series[0].data.push({ value: parseInt(res.datas.length), name: '货物订单' });
					
					
				  }
				
				})
				//物资订单数量
				let data = {
				  page: 1,
				  limit:1000,
				  materialName:"",
				  }
				selectByName(data).then((res)=>{
					
					if(res != -1){
							this.totalOrder =parseInt(this.totalOrder)+ parseInt(res.datas.length);
							this.typeoption.series[0].data.push({ value: parseInt(res.datas.length), name: '物资订单' });
						}
				})
				//汽车购销数量
				getByOperation({}).then((res) => {
					if (res != -1) {
						this.totalOrder =parseInt(this.totalOrder)+ parseInt(res.datas.length);
						this.typeoption.series[0].data.push({ value: parseInt(res.datas.length), name: '汽车购销' });
					}
				
				
				})
				
                
            },
			drawEcharts(){
				//饼状图数据
					let typeEcharts = this.$echarts.init(document.getElementById("typeEcharts"));
					let moneyEcharts= this.$echarts.init(document.getElementById("moneyEcharts"));
					let transporEcharts= this.$echarts.init(document.getElementById("transporEcharts"));
				//渲染图表
				setTimeout(() =>{
				 //    console.log("这是option"+this.moneyoption);
					// console.log(this.moneyoption);
					this.moneyoption.series[0].data.sort(function (a, b) {
											return b.value - a.value;
												})
				    typeEcharts.setOption(this.typeoption);
				    moneyEcharts.setOption(this.moneyoption);
				    transporEcharts.setOption(this.transporoption);
					console.log("+++++++++++++++++++++++++++++++");
					this.waitcharts=false
				},500);
			}



        },
        mounted() {
            this.getTyprEcharts();
			this.drawEcharts();
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .box-card {
        width: 400px;
        margin-right: 150px;

    }
    .card-text{
        margin-bottom: 10px;
    }
    .box-card-last {
        width: 370px;
        /* background-color: rgb(16,12,42) !important; */
    }
    .main-top-card{
        display: flex;

    }
    .card-num{
        font-size: 15px;
        font-weight: bolder;
        color: white;
    }
    .icon-size{
        font-size: 45px;
    }
    .icon-color-doc{
        color:rgb(170, 85, 0)
    }
    .icon-color-user{
        color:rgb(18, 116, 201)
    }
    .icon-color-user-type{
        color:rgb(244, 31, 45)
    }


    /* 图表css*/

    .box-card-echarts{

        width: 350px;
        margin-right: 0px;
        height: 250px;
    }
    .box-card-echarts-last{
        width: 540px;
        height: 250px;
        background-color: rgb(255, 255, 255) !important;
    }
	.box-card-echarts-last1{
	    width: 1140px;
	    height: 250px;
	    background-color: rgb(246, 255, 212) !important;
	}
    .echarts-render{
        background-color: rgb(255, 255, 255);
        width: 300px;
        height: 250px;
    }
    .grid-content {
        border-radius: 20px;
        min-height: 36px;
    }
</style>