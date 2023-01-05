<template>
  <div>

    <el-table
        v-loading="listLoading"
        :data="auditCommentList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
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
          label="药方单号"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.prescriptionId }}
        </template>
      </el-table-column>
      <el-table-column
          label="是否通过"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.isPassed }}
        </template>
      </el-table-column>
      <el-table-column
          label="审核意见"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.auditComment }}</span>
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
              审核
            </el-button>
            <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="chufang(scope)"
            >
              查看处方单
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="处方" :visible.sync="dialogTableVisible">
      <el-table :data="drugList">
        <el-table-column property="name" label="药名" width="200"></el-table-column>
        <el-table-column property="count" label="数量" width="100"></el-table-column>
        <el-table-column property="price" label="价格" width="100"></el-table-column>
        <el-table-column property="total" label="总共" width="100"></el-table-column>
      </el-table>
<!--      <el-button @click="tijiao()">提交</el-button>-->
    </el-dialog>
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
        <el-form-item label="是否通过">
<!--          <el-input v-model="temp.isPassed" placeholder="请输入" />-->
          <el-switch
              on-value="1"
              off-value="0"
              v-model="temp.isPassed"
              @change="switchChange()" >
          </el-switch>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input
              type="textarea"
              :rows="2"
              v-model="temp.auditComment">
          </el-input>
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
import { insertAuditResult,deleteAuditResult,updateAuditResult,getAllAuditResult,isPassed } from '@/api/getAuditResult.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
import {checkPrescription} from "@/api/addPrescription";
const _temp = {
  id: '',
  pharmacistId:"",
  prescriptionId:"",
  isPassed:'',
  auditComment: '',
}
export default {
  data() {
    return {
      isPassed:0,
      drugList: [],
      countList:[],
      prescriptionId:0,
      prescriptionList:[],
      dialogTableVisible:false,
      listLoading: true, //查询时加载遮罩
      inputData: "",
      auditCommentList: [],
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
    switchChange(scope){
      // updateAuditResult({
      //   id:scope.row.id,
      //   isPassed:this.isPassed,
      // }).then((res)=>{
      //
      // })
    },
    chufang(scope){
      this.dialogTableVisible='true';
      console.log("开始查看处方");
      console.log(scope.row);
      checkPrescription({
        "id":scope.row.prescriptionId
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
    init() {
      this.listLoading = true;
      getAllAuditResult({}).then((res) => {
        if (res != -1) {
          console.log(res);
          res.data.forEach((item, index) => {
            item.index = index + 1;
            //console.log(item)
          })
          this.auditCommentList = res.data;
          this.total = this.auditCommentList.length;
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
      console.log("开始编辑");
      console.log(scope.row);
      this.resetTemp()
      this.dialogVisible = true
      this.dialogType = 'modify'
      this.temp = deepClone(scope.row)
      //console.log(this.temp)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    submit() {
      console.log('点击提交');
      let data = this.temp;
      console.log({
        id:data.id,
        isPassed:data.isPassed?1:0,
        auditComment: data.auditComment
      });
      if (this.dialogType == 'modify') {
        console.log("执行更新");
        updateAuditResult({
          id:data.id,
          isPassed:data.isPassed?1:0,
          auditComment: data.auditComment
        }).then((res) => {
          console.log("更新成功");
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
        insertAuditResult(data).then((res) => {
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