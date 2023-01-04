<template>
  <div style="margin-top:20px">
    <div style="font-size: 1.5rem; display: inline-block; margin-right: 2rem;">所属科室：血液科</div>
    <div style="font-size: 1.5rem; display: inline-block;">在岗医生：张三</div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="date"
          label="患者姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="患者年龄"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="患者性别"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="检验项目"
          width="180">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="left">
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

          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "projectCheck"
}
</script>

<style scoped>
.box{
  margin-bottom: 1.8rem;
}
.name,.value{
  font-size: 30px;
  display: inline-block;
}
</style>