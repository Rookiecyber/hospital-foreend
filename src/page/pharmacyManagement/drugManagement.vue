<template>
  <div>
    <el-input
        style="width: 190px;margin-right: 40px;margin-top: 20px;margin-bottom: 20px;"
        v-model="listQuery.keyword"
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
        :data="drugList"
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
          width="170"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="库存数量"
          width="200"
          align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.inventory }}
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--          label="车辆品牌"-->
      <!--          width="160"-->
      <!--          align="center"-->
      <!--      >-->
      <!--        <template slot-scope="scope">-->
      <!--          {{ scope.row.carBrand }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="left"
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

    <el-dialog
        :visible.sync="dialogVisible"
        :title="dialogType === 'modify' ? '修改' : '新增'"
    >
      <el-form
          ref="dataForm"
          :model="temp"
          label-width="150px"
          label-position="right"
      >
        <el-form-item label="车牌号">
          <el-input v-model="temp.carNumber" placeholder="请输入车牌号" />
        </el-form-item>
        <el-form-item label="车型">
          <el-input v-model="temp.carStyle" placeholder="请输入车型" />
        </el-form-item>
        <el-form-item label="车辆载重(单位:吨)">
          <el-input v-model="temp.carLoad" placeholder="请输入车辆载重(单位:吨)" />
        </el-form-item>
        <el-form-item label="车辆里程数(单位:千米)">
          <el-input v-model="temp.carMileage" placeholder="请输入车辆里程数(单位:千米)" />
        </el-form-item>
        <el-form-item label="车辆品牌">
          <el-input v-model="temp.carBrand" placeholder="请输入车辆品牌" />
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
import { getAllDrug } from '@/api/getDrug.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
const _temp = {
  // id: '',
  carNumber: '',
  carStyle: '',
  carLoad: '',
  carMileage: '',
  carBrand: '',
}
export default {
  data() {
    return {
      // carList: [{
      // 	index:1,
      //   carNumber: '2016-05-03',
      //   carStyle: '王小虎',
      //   carLoad: '上海市普陀区金沙江路 1518 弄',
      //   carMileage: 150,
      //   carBrand:"大众"
      // },],//用于存放doc数据
      selectData: "",//被选择的下拉
      queryData: "",//用于条件查询
      categoryList: [],//用于接收类型数据
      listLoading:true,//查询时加载遮罩
      drugList:[],
      listQuery:{
        page: 1,
        limit: 20,
        created_at: undefined,
        status: undefined,
        keyword: undefined
      },
      temp: Object.assign({}, _temp),
      dialogVisible: false,   //弹出框显示
      dialogType: 'create',
    }
  },

  methods: {
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
    // //获取类型数据
    // initCategoryList(){
    // 	getCategoryByCondition({}).then(res => {
    // 		//新增一个全部,放到数组最前面
    // 		if(res != -1){
    // 			res.datas.unshift({categoryId : "", categoryName: "全部"});
    // 			this.categoryList = res.datas;
    // 		}
    // 	});
    // },
    // //获取文档数据
    // initDocList(){
    // 	this.loading = true;
    // 	//获取用户输入/选择的查询条件
    // 	let data = {
    // 		categoryId : this.selectData,
    // 		docTitle: this.queryData
    // 	}
    // 	getDocByCondition(data).then((res) => {
    // 		if(res != -1){
    // 			this.docList = res.datas;
    // 			this.loading = false;
    // 		}
    // 		//条件筛选遍历
    // 		/* let filterArr = this.docList.filter((item, index) => {
    // 			return item.docId % 5 == 0;
    // 		}); */
    // 	})
    // },
    // selectDoc(){
    // 	docSelectOne({id: 105}).then()
    // },
  },
  // created() {
  //   this.initCarList();
  // },
  mounted() {
    this.$nextTick(() => {
      this.initCarList();
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