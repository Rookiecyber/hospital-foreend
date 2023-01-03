import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
import moment from "moment" //全局引入时间工具包
// import '@/styles/index.scss' // global css
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false
Vue.use(ElementUI);     //全局注入element
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
