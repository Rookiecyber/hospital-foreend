<template>
  <div>

    <el-button
        type="primary" style="margin-top: 20px"
        plain
        @click="callPatient">
      叫号
    </el-button>

    <el-table
        v-loading="listLoading"
        :data="registerRecordList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
        element-loading-text="正在疯狂加载"
        border
        fit
        style="height: 100%;font-size: 20px;width: 100%"
        :row-style="{height:'75px'}"
        :cell-style="{padding:'0px'}"
        class="table-container"
        highlight-current-row
        v-show="isShow"

    >
      <el-table-column
          label="序号"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>


      <el-table-column
          label="名字"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="问诊医生"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页组件ui -->
    <div style="width: 100%;height: 100%" class="pagination">
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                     :current-page="cur_page" :page-sizes="[10,15,20,50]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>

  </div>
</template>

<script>
import { addRecord,checkRecord,registerComplete,getAllRegisterRecord } from '@/api/getRegisterRecord.js';
import {getPatientByID} from "../../api/getOutPatient";
import {getStaffByID} from "../../api/getStaff";
import { setStorage, getStorage} from "@/utils/localStorage.js";
import Speech from 'speak-tts';
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  name: '',
}
export default {
  data() {
    return {
      Speech:null,
      listLoading: true, //查询时加载遮罩
      inputData: "",
      registerRecordList: [],
      nameList:[],
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

    callPatient() {
      let shift = this.registerRecordList.shift();
      this.Speech.speak({text:'请' + shift.name + '问诊' + shift.doctorName}).then(()=>{
      })
      this.$notify({
        title: '提示',
        message: '请' + shift.name + '问诊' + shift.doctorName,
        duration: 0
      });
    },
    speechInit(){
      this.Speech = new Speech();
      this.Speech.setLanguage('zh-CN');
      this.Speech.init().then(()=>{
        console.log('语音播报初始化完成...')
      })
    },

    init() {
      this.listLoading = true;
      getAllRegisterRecord({}).then((res) => {
        if (res != -1) {
          res.data.forEach((item, index) => {
            item.index = index + 1;
            let patientId = res.data[index].patientId;
            let doctorId = res.data[index].doctorId;
            getPatientByID(patientId).then((res) => {
              item.name = res.data.name;
            })
            getStaffByID(doctorId).then((res) => {
              item.doctorName = res.data.name;
            })

          })
          this.registerRecordList = res.data;
          this.total = this.registerRecordList.length;

          this.listLoading = false;
        }

      })
    },
    resetTemp() {
      this.temp = Object.assign({}, _temp)
    },
    // 分页导航改变页码大小在method里定义
    handleSizeChange(val) {
      this.pageSize = val;
      this.cur_page = 1;
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.speechInit();
    })
  },

}
</script>

<style scoped>

</style>