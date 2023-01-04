<template>

  <div>
<!--    <el-button-->
<!--        style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;"-->
<!--        type="primary" @click="dialog = true" >-->
<!--      点击开始挂号-->
<!--    </el-button>-->
    <el-form  style="margin-top:20px"
        ref="form" :model="registerRecord" label-width="80px">
      <el-form-item label="病人姓名" style="width: 620px">
        <el-input v-model="registerRecord.name"></el-input>
      </el-form-item>
      <el-form-item label="科室">
        <el-select v-model="registerRecord.dep" placeholder="请选择">
          <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="医生">
        <el-select v-model="registerRecord.doctor" placeholder="请选择">
          <el-option
              v-for="item in doctorList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="registerRecord.createTime" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
<!--        <el-col :span="11">-->
<!--          <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
<!--        </el-col>-->
      </el-form-item>

      <el-form-item label="挂号费">
        <el-input-number v-model="registerRecord.fee"  :min="0"  label="挂号费"></el-input-number>
      </el-form-item>
<!--      <el-form-item label="活动性质">-->
<!--        <el-checkbox-group v-model="form.type">-->
<!--          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="地推活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
<!--          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="danger" @click="pay">缴费</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAllDrug } from '@/api/getDrug.js';
import {getAll} from "@/api/getDepartment.js";
import {getAllStaff} from "@/api/getStaff.js";
import {addRecord} from "@/api/getRegisterRecord.js";
import { setStorage, getStorage} from "@/utils/localStorage.js";
const _temp = {
  // id: '',
  create_time: '',
  fee: '',
  is_paid: '',
  is_hang_up: '',
  is_canceled: '',
  is_completed: '',
  is_refunded: '',
  patientId: '',
  doctorId: '',
  department_id: '',
}
export default {
  data() {
    return {
      registerRecord: {
        name: '',
        dep: '',
        doctor: '',
        createTime:''
      },
      departmentList:[],//部门信息
      doctorList:[],//医生信息
    }
  },

  methods: {
    initdepartment() {
      getAll({}).then((res) => {
        if (res != -1) {
          console.log("部门结果");
          console.log(res);
          this.departmentList = res.data;

        }

      })
    },
    onSubmit(){ //点击挂号
      let data = registerRecord;
      console.log(data);
      addRecord(data).then((res)=>{
        if(res!=-1){
          console.log("挂号成功");
        }
      })
    },
    pay() {
      const h = this.$createElement;

      this.$notify({
        title: '缴费成功',
        message: h('i', { style: 'color: teal'}, '你已成功缴费'+this.registerRecord.fee+"元")
      });
    },
    initCarList(){
      this.listLoading = false;
      getAllDrug({}).then((res)=>{
        console.log("****药品：：：：");
        console.log(res);
        console.log(res.data);
        // consol.log(JSON.parse(res.data));
        if(res != -1){
          console.log("这是res\n");
          console.log(res);
          res.data.forEach((item, index) => {
            item.index = index+1;
            //console.log(item)
          })
          this.drugList = res.data;
          this.listLoading = false;
        }

      })
    },
    refresh() {
      //  this.listQuery = {
      // page: 1,
      // limit: 20,
      // created_at: undefined,
      // status: undefined,
      // keyword: undefined
      //  }
      this.initCarList()
    },
    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },
    add() {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    edit(scope) {
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'modify'
      this.temp = deepClone(scope.row)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          this.list.splice(scope.$index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }, 300)
      })
    },
    submit() {
      if (this.listLoading) {
        return
      }
      this.listLoading = true
      setTimeout(() => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.loading = false
      }, 300)
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initdepartment();//获取部门结果
    })
  },

}
</script>

<style>
.w-200{
  width: 200px;
}
.filter-item{
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>