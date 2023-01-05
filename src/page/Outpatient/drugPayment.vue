<template>

  <div style="margin: 1.25rem;">
    <div style="display: inline-block;">
      <el-input
          style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;"
          v-model="prescriptionId"
          size="small"
          placeholder="请输入处方号"
          clearable
          class="filter-item"
      />
      <el-button-group style="margin-right: 20px;margin-top: 20px;margin-bottom: 20px;"
                       class="filter-item">
        <el-button
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search"
        >
          搜索
        </el-button>
      </el-button-group>
      <el-table :data="drugList">
<!--        <el-table-column property="drugList.index" label="序号" width="150"></el-table-column>-->
        <el-table-column property="name" label="药名" width="200"></el-table-column>
        <el-table-column property="count" label="数量" width="150"></el-table-column>
        <el-table-column property="price" label="价格" width="150"></el-table-column>
        <el-table-column property="total" label="总共" width="150"></el-table-column>
      </el-table>
      <el-button @click="payChufang()">缴费</el-button>
    </div>
  </div>

</template>

<script>
import {addPrescription, checkPrescription, pay} from "@/api/addPrescription";
import {deleteDrug, getAllDrug, getDrugByName, insertDrug, updateDrug} from "@/api/getDrug";
import {deepClone} from "@/utils";
export default {
  data(){
    return{
      drugList: [],
      countList:[],
      prescriptionId:0,
      prescriptionList:[],
      total:0,
    }

  },
  methods:{
    search(){
      console.log("开始搜索");
      checkPrescription({
        "id":this.prescriptionId
      }).then((res)=>{
          if(res!=-1){
            this.drugList = res.data.drugList;
            this.countList = res.data.countList;
            for(let i = 0; i < this.drugList.length; i++) {
              this.drugList[i].count = this.countList[i];
              this.drugList[i].total = this.countList[i] *  this.drugList[i].price;
            }
            console.log("当前处方为:");
            console.log(this.drugList);
            console.log(this.countList);
          }
      })
    },
    payChufang(){
      for(let i = 0; i < this.drugList.length; i++) {
        this.total  += this.drugList[i].total;
      }//支付
      pay({
        id: this.prescriptionId
      }).then((res)=>{
        if(res!=-1){
          const h = this.$createElement;
          this.$notify({
            title: '缴费成功',
            message: h('i', { style: 'color: teal'}, '你已成功缴费'+this.total+"元")
          });
        }
      })

    },
    initdrug() {
      getAllDrug({}).then((res) => {
        if (res != -1) {
          console.log("药物表");
          res.data.forEach((item, index) => {
            item.index = index + 1;
          })
          this.drugList = res.data;
          console.log(this.drugList);
        }
      })
    },
    initPrescription(){

    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.initdrug();
    })
  },
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>