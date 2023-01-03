<template>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="queryData" class="input-with-select">
                <el-select v-model="selectData" slot="prepend" placeholder="请选择" >
                    <el-option v-for="(item, index) in categoryList" :key="index" :label="item.categoryName" :value="item.categoryId"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="selectDoc"> 查询</el-button>
            </el-input>
            <el-table
					v-loading="loading"
					element-loading-text="拼命加载中"
					element-loading-spinner="el-icon-loading"
					element-loading-background="rgba(0, 0, 0, 0.8)"
                    :data="docList"
                    stripe
                    style="width: 100%">
                <el-table-column
						width="100px;"
						align="center"
                        prop="docId"
                        label="主键ID">
                </el-table-column>
                <el-table-column
						width="150px;"
						align="center"
                        prop="categoryName"
                        label="类型名称">
                </el-table-column>
                <el-table-column
						align="center"
                        prop="docTitle"
                        label="文档名称">
                </el-table-column>
				<el-table-column
						align="center"
						show-overflow-tooltip
				        prop="docSummary"
				        label="文档概要">
				</el-table-column>
				<el-table-column
						align="center"
				        prop="docUploaduser"
				        label="上传者">
				</el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
	import { getDocByCondition,getCategoryByCondition,docSelectOne } from '@/api/getData.js';
	import { setStorage, getStorage} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				docList: [],//用于存放doc数据
				selectData: "",//被选择的下拉
				queryData: "",//用于条件查询
				categoryList: [],//用于接收类型数据
				loading:true,//查询时加载遮罩
			}
		},
		methods: {
			//获取类型数据
			initCategoryList(){
				getCategoryByCondition({}).then(res => {
					//新增一个全部,放到数组最前面
					if(res != -1){
						res.datas.unshift({categoryId : "", categoryName: "全部"});
						this.categoryList = res.datas;
					}
				});
			},
			//获取文档数据
			initDocList(){
				this.loading = true;
				//获取用户输入/选择的查询条件
				let data = {
					categoryId : this.selectData,
					docTitle: this.queryData
				}
				getDocByCondition(data).then((res) => {
					if(res != -1){
						this.docList = res.datas;
						this.loading = false;
					}
					//条件筛选遍历
					/* let filterArr = this.docList.filter((item, index) => {
						return item.docId % 5 == 0;
					}); */
				})
			},
			selectDoc(){
				docSelectOne({id: 105}).then()
			},
		},
		mounted() {			
			this.$nextTick(() => {
				//页面初始化的时候执行
				this.initDocList();
				//this.testMap();
				//初始化获取类型数据
				this.initCategoryList();
			})
		},
		
	}
</script>

<style>

.table-style-thead{
	width:100%;	
}
.table-style-thead-th{
	width: 250px;
}
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>