<template>
  <div>
    ddd
  </div>
</template>

<script>
import { getAllDrug} from '@/api/getDrug';
import { deepClone } from '@/utils/index.js';
import { setStorage, getStorage} from "@/utils/localStorage.js";
import {Message} from "element-ui";
export default {
  data() {
    return {
      data:"1",
    }
  }

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