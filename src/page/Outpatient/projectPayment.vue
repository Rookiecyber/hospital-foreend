<template>
  <div style="margin: 50px;">
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
    <div style="margin-bottom: 50px; font-size: 30px;">拿药进度</div>
    <!-- :active代表进行到哪一步， -->
    <el-steps :space="200" :active=active finish-status="success">
      <el-step title="配药"></el-step>
      <el-step title="审核"></el-step>
      <el-step title="拿药"></el-step>
    </el-steps>
  </div>

</template>

<script>
import { checkPrescription } from '@/api/addPrescription.js';
import { getByPrescriptionId } from '@/api/getAuditResult.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  id: '',
  name: '',
  address: '',
  telephone: '',
}
export default {
  data() {
    return {
      listLoading: true, //查询时加载遮罩
      prescriptionId: "",
      isReceived:"",
      isDistributed:"",
      isPassed: "",
      active:0,
      departmentList: [],
      temp: Object.assign({}, _temp),
      dialogVisible: false, //弹出框显示
      dialogType: 'create',
      cur_page: 1,
      pageSize: 10,
      //数据条数
      total: 0

    }
  },

  methods: {

    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },

    search() {
      let prescription = {
        id: this.prescriptionId
      }
      this.listLoading = true;
      checkPrescription(prescription).then((res) => {
        if (res != -1) {
          this.isReceived = res.data.prescription.isReceived;
          this.isDistributed = res.data.prescription.isDistributed;
          this.listLoading = false;
        }
      })
      getByPrescriptionId(this.prescriptionId).then((res) => {
        if (res != -1) {
          this.isPassed = res.data.isPassed;
          this.listLoading = false;
        }
      })
      if(this.isDistributed == 1){
        if (this.isPassed == 1){
          if(this.isReceived == 1){//111
            this.active = 3
          } else {//110
            this.active = 2
          }
        } else {//100
          this.active = 1
        }
      } else {//000
        this.active = 0
      }
    },


  },

  mounted() {
    this.$nextTick(() => {
      this.init();

    })
  },

}
</script>

<style lang="scss">
.w-200{
  width: 200px;
}
.filter-item{
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}


</style>