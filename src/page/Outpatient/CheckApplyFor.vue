<template>
  <div>
    <!-- 用的是这个接口！！！！！！！！！！！！ -->
    <!-- 127.0.0.1/prescription/getUnauditedPrescription -->





























    <el-input
        style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;"
        v-model="inputData"
        size="small"
        placeholder="请输入信息"
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
      <el-button
          size="small"
          type="primary"
          icon="el-icon-refresh"
          @click="refresh"
      >
        刷新
      </el-button>
    </el-button-group>

    <el-table
        v-loading="listLoading"
        :data="medicalRecordList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
        element-loading-text="正在疯狂加载"
        border
        fit
        style="height: 100%;font-size: 20px;width: 100%"
        :row-style="{height:'75px'}"
        :cell-style="{padding:'0px'}"
        class="table-container"
        highlight-current-row
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
          label="药物过敏史"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.drugSensitivityHistory }}
        </template>
      </el-table-column>
      <el-table-column
          label="病史"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.presentIllnessHistory }}
        </template>
      </el-table-column>

      <el-table-column
          label="主诉"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.chiefComplaint }}
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          align="center"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
                type="primary"
                icon="el-icon-bell"
                size="mini"
                @click="edit(scope)"
            >
              审核
            </el-button>
            <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="drawer = true"
            >
              查看处方
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件ui -->
    <div style="margin-top:20px" class="pagination">
      <el-pagination background @current-change="handleCurrentChange" @size-change="handleSizeChange"
                     :current-page="cur_page" :page-sizes="[10,15,20,50]" :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <el-dialog
        :visible.sync="dialogVisible"
        :title="dialogType === 'modify' ? '修改' : '新增'"
    >
      <el-form
          ref="dataForm"
          :model="temp"
          label-width="150px"
          label-position="right"
          :rules = {required:true}
      >
        <el-form-item label="是否通过">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="temp.drugSensitivityHistory" placeholder="请输入审核意见" />
        </el-form-item>
      </el-form>
      <el-button type="danger" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </el-dialog>

    <el-drawer
        title="处方内容"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" >
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="grid-content bg-purple">
                {{'药品 ' + o }}
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                x{{o}}
              </div>
            </el-col>
          </el-row>
          <div slot="header">
            <span></span>
            <span style="float: right;"></span>
          </div>
        </div>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
import { insertMedicalRecord,deleteMedicalRecord,updateMedicalRecord,getMedicalRecordById,getAllMedicalRecord } from '@/api/getMedicalRecord.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  id: '',
  createTime: '',
  drugSensitivityHistory: '',
  presentIllnessHistory: '',
  chiefComplaint:"",
  departmentId:"",
  doctorId:"",
}
export default {
  data() {
    return {
      drawer: false,
      direction: 'ltr',
      radio: '1',
      listLoading: true, //查询时加载遮罩
      inputData: "",
      medicalRecordList: [],
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    init() {
      this.listLoading = true;
      getAllMedicalRecord({}).then((res) => {
        if (res != -1) {
          console.log(res);
          res.data.forEach((item, index) => {
            item.index = index + 1;
            //console.log(item)
          })
          this.medicalRecordList = res.data;
          this.total = this.medicalRecordList.length;
          this.listLoading = false;
        }

      })
    },
    refresh() {
      this.inputData="";
      this.init()
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
      console.log(scope.row);
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
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }, 300)
        this.temp = deepClone(scope.row);
        let deldata = this.temp;
        deleteMedicalRecord(deldata).then((res) => {
          if (res != -1) {
            this.init()
          }
        })
      })
    },
    submit() {
      if (this.listLoading) {
        return
      }
      let data = this.temp;
      if (this.dialogType == 'modify') {
        updateMedicalRecord(data).then((res) => {
          if (res != -1) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.init()
          }
        })
      } else {
        insertMedicalRecord(data).then((res) => {
          if (res != -1) {
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.init()
          }
        })
      }
    },
    search() {
      //待编写
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
    })
  },

}
</script>

<style>
.box-card {
  margin:0px auto ;
  width: 480px;
}
.w-200{
  width: 200px;
}
.filter-item{
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>