<template>
  <div style="margin-top:20px">
    <div style="font-size: 1.5rem; display: inline-block; margin-right: 2rem;">所属科室：血液科</div>
    <div style="font-size: 1.5rem; display: inline-block;">在岗医生：张三</div>

    <el-button-group style="margin-right: 20px;margin-top: 20px;margin-bottom: 20px;"
                     class="filter-item">

      <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="add"
      >
        新增
      </el-button>
    </el-button-group>

    <el-table
        v-loading="listLoading"
        :data="checkReportList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
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
          label="检查项目名称"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
          label="价格"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column
          label="是否付款"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isPaid }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="是否付款"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isPaid }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="是否完成检查"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isChecked }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="是否退费"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.isRefunded }}</span>
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
                icon="el-icon-edit"
                size="mini"
                @click="edit(scope)"
            >
              修改
            </el-button>
            <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="del(scope)"
            >
              删除
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件ui -->
    <div style="width: 100%;height: 100%" class="pagination">
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
        <el-form-item label="检查项目名称">
          <el-input v-model="temp.name" placeholder="请输入科室名称" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="temp.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="是否付款">
          <el-input v-model="temp.isPaid" placeholder="请输入科室名称" />
        </el-form-item>
        <el-form-item label="是否完成检查">
          <el-input v-model="temp.isChecked" placeholder="请输入科室名称" />
        </el-form-item>
        <el-form-item label="是否退费">
          <el-input v-model="temp.isRefunded" placeholder="请输入科室地点" />
        </el-form-item>

      </el-form>
      <el-button type="danger" @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="submit">
        确定
      </el-button>
    </el-dialog>

  </div>

</template>

<script>
import { insertCheckReport,deleteCheckReport,updateCheckReport,getCheckReportById,getAllCheckReport } from '@/api/getCheckReport.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  id: '',
  name: '',
  createTime: Date.now(),
  price: '',
  isPaid:"",
  isChecked:"",
  isRefunded:"",
  createDoctorId:"",
  checkDoctorId:"",
  patientId:"",
  departmentId:"",
}
export default {
  data() {
    return {
      listLoading: true, //查询时加载遮罩
      inputData: "",
      checkReportList: [],
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
    init() {
      this.listLoading = true;
      getAllCheckReport({}).then((res) => {
        if (res != -1) {
          console.log(res);
          res.data.forEach((item, index) => {
            item.index = index + 1;
          })
          this.checkReportList = res.data;
          this.total = this.checkReportList.length;
          this.listLoading = false;
        }

      })
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
        deleteCheckReport(deldata).then((res) => {
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
        updateCheckReport(data).then((res) => {
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
        insertCheckReport(data).then((res) => {
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
.w-200{
  width: 200px;
}
.filter-item{
  display: inline-flex;
  vertical-align: middle;
  margin-bottom: 10px;
}
</style>