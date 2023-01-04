<template>
  <div style="margin: 1.25rem;">
    <div style="display: inline-block;">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px;">2023-01-05 00:45:09 的药单</span>
          <el-button style="float: right;" type="primary">缴费</el-button>
        </div>

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
    </div>
  </div>

</template>

<script>
export default {
  name: "drugPayment",
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>