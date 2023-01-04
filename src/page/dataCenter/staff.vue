<template>
  <div>
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
        :data="staffList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
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
          label="账号"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>
      <el-table-column
          label="姓名"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
          label="性别"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column
          label="职称"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column
          label="年龄"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.age }}
        </template>
      </el-table-column>
      <el-table-column
          label="职务"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.type }}
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
        <el-form-item label="账号">
          <el-input v-model="temp.nickname" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="temp.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="temp.sex" placeholder="请输入性别" />
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="temp.job" placeholder="请输入职称" />
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="temp.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="temp.type" placeholder="请输入职务" />
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
import { insertStaff,deleteStaff,updateStaff,getStaffByID,getAllStaff } from '@/api/getStaff.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  id: '',
  nickname: '',
  name: '',
  sex: '',
  job:"",
  age:"",
  type:"",
}
export default {
  data() {
    return {
      listLoading: true, //查询时加载遮罩
      inputData: "",
      staffList: [],
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
      getAllStaff({}).then((res) => {
        if (res != -1) {
          console.log(res);
          res.data.forEach((item, index) => {
            item.index = index + 1;
            //console.log(item)
          })
          this.staffList = res.data;
          this.total = this.staffList.length;
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
        deleteStaff(deldata).then((res) => {
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
        updateStaff(data).then((res) => {
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
        insertStaff(data).then((res) => {
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