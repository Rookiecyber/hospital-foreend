<template>
  <div>
    <el-input
        style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;"
        v-model="listQuery"
        size="small"
        placeholder="请输入药品名称"
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
<!--      <el-button-->
<!--          size="small"-->
<!--          type="primary"-->
<!--          icon="el-icon-plus"-->
<!--          @click="add"-->
<!--      >-->
<!--        新增-->
<!--      </el-button>-->
      <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="dialogTableVisible = true"
      >
        查看处方单
      </el-button>
    </el-button-group>

    <el-table
        v-loading="listLoading"
        :data="drugList.slice((cur_page-1)*pageSize,cur_page*pageSize)"
        element-loading-text="正在疯狂加载"
        border
        fit
        height="500px"
        class="table-container"
        highlight-current-row
    >
      <el-table-column
          label="序号"
          width="100"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.index }}
        </template>
      </el-table-column>
      <el-table-column
          label="药品名称"
          width="200"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
          label="生产商"
          width="180	"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.manufactor }}
        </template>
      </el-table-column>
      <el-table-column
          label="单价"
          width="100"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="库存数量"
          width="150"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.inventory }}
        </template>
      </el-table-column>
      <el-table-column
          label="需要数量"
          width="200"
          align="center"
      >
        <template slot-scope="scope">
<!--          {{ scope.row.num }}-->

          <el-input-number size="mini" :min="0" :max="drugList[scope.row.index-1].inventory"
                           v-model="drugList[scope.row.index-1].num"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center"
      >
        <template slot-scope="scope">
          <el-button-group>

            <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="addtoPrescription(scope)"
            >
              添加
            </el-button>

<!--            <el-button-->
<!--                type="danger"-->
<!--                icon="el-icon-delete"-->
<!--                size="mini"-->
<!--                @click="del(scope)"-->
<!--            >-->
<!--              删除-->
<!--            </el-button>-->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
<!--    处方-->
    <el-dialog title="处方" :visible.sync="dialogTableVisible">
      <el-table :data="prescription">
        <el-table-column property="index" label="序号" width="150"></el-table-column>
        <el-table-column property="name" label="药名" width="200"></el-table-column>
        <el-table-column property="num" label="数量"></el-table-column>
      </el-table>
      <el-button @click="tijiao()">提交</el-button>
    </el-dialog>
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
        <el-form-item label="药品">
          <el-input v-model="temp.name" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="厂家名">
          <el-input v-model="temp.manufactor" placeholder="请输入厂家名" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="temp.price"  :min="0"  label="价格"></el-input-number>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number v-model="temp.inventory" :min="0"  label="库存数量"></el-input-number>
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
import { getAllDrug,deleteDrug,getDrugByName,insertDrug,updateDrug } from '@/api/getDrug.js';
import { addPrescription } from '@/api/addPrescription.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {
  deepClone
} from "@/utils/index.js";
const _temp = {
  // id: '',
  name: '',
  manufactor: '',
  price: '',
  inventory: '',
}
export default {
  data() {
    return {
      dialogTableVisible: false,
      test:0,
      listLoading: true, //查询时加载遮罩
      listQuery: "",
      drugList: [],
      temp: Object.assign({}, _temp),
      dialogVisible: false, //弹出框显示
      dialogType: 'create',
      cur_page: 1,
      pageSize: 10,
      //数据条数
      total: 0,
      prescription:[],
      flag:0,
      drugs:[]
    }
  },

  methods: {
    tijiao(){
      for(let i = 0; i < this.prescription.length; i++){
        let x = {
          "id":this.prescription[i].id,
          "count":this.prescription[i].num
        }
        this.drugs.push(x);
      }
      console.log({
        createTime: new Date().getTime()+'',
        isReceived:0,
        isPaid:0,
        isRefunded:0,
        patientId:1,
        doctorId:1,
        drugs:this.drugs
      }),
        addPrescription({
        createTime: new Date().getTime()+'',
        isReceived:0,
        isPaid:0,
        isRefunded:0,
        patientId:1,
        doctorId:1,
        drugs:this.drugs
      }).then((res)=>{
        if(res!=-1){
          alert("提交处方成功");
        }
      })
    },
    addtoPrescription(scope){
      console.log("开始添加");
      // this.prescription.push({
      //   "id":scope.row.id,
      //   "count":scope.row.num
      // });
      if(scope.row.num){
        for(let i = 0; i < this.prescription.length; i++) {
            if(this.prescription[i].id==scope.row.id){
              this.prescription[i].num += scope.row.num;
              this.flag=1;
              break;
            }
        }
        if(this.flag==0)
        {
          this.prescription.push(scope.row);
          this.flag=0;
        }
      }

      console.log(scope.row.id);

      console.log("添加后的prescription结果："+this.prescription);
    },
    init() {
      this.listLoading = true;
      getAllDrug({}).then((res) => {
        if (res != -1) {
          // console.log("这是res\n");
          // console.log(res);
          res.data.forEach((item, index) => {
            item.index = index + 1;
            //console.log(item)
            item.num=0;
          })
          this.drugList = res.data;
          this.total = this.drugList.length;
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
      console.log("执行修改");
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
    del(scope) {
      this.$confirm('确认删除该条数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setTimeout(() => {
          //this.list.splice(scope.$index, 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }, 300)
        this.temp = deepClone(scope.row);
        let deldata = this.temp;
        deleteDrug(deldata).then((res) => {
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
        updateDrug(data).then((res) => {
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
        insertDrug(data).then((res) => {
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
      // console.log("开始搜索");
      let drug = {
        name: this.listQuery
      }
      this.listLoading = true;
      // console.log("drug为："+drug);
      // console.log(drug.name)
      getDrugByName(drug).then((res) => {
        if (res != -1) {
          // console.log(company);
          res.data.forEach((item, index) => {
            item.index = index + 1;
            //console.log(item)
          })
          this.drugList = res.data;
          // console.log("搜索结果"+this.drugList);
          this.total=this.drugList.length;
          this.cur_page=1;
          this.listLoading = false;
        }
      })
    },
    // 分页导航改变页码大小在method里定义
    handleSizeChange(val) {
      this.pageSize = val;
      this.cur_page = 1;
      //console.log(this.companyList.slice((this.cur_page - 1) * this.pageSize, this.cur_page * this.pageSize));
    },
    // 分页导航
    handleCurrentChange(val) {
      //console.log(val);
      this.cur_page = val;
      //console.log(this.cur_page);
      //console.log(this.companyList.slice((this.cur_page - 1) * this.pageSize, this.cur_page * this.pageSize));
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.init();
      // //页面初始化的时候执行
      // this.initDocList();
      // //this.testMap();
      // //初始化获取类型数据
      // this.initCategoryList();
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