<template>
  <div style="margin: 50px;">
    <div style="margin-bottom: 50px; font-size: 30px;">拿药进度</div>
    <!-- :active代表进行到哪一步， -->
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="配药"></el-step>
      <el-step title="审核"></el-step>
      <el-step title="拿药"></el-step>
    </el-steps>
  </div>

</template>

<script>
export default {
  name: "projectPayment"
}
</script>

<style scoped>

</style>