<template>
	<el-container>
		<el-aside width="250px">
			<el-menu style="height: 93.5vh;"
				:default-active="activeIndex"
				class="el-menu-vertical-demo"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				router>
			    <el-menu-item v-for="(item, index) in menuList" :key="index" :index="item.path" :route="item.path">
			        <i :class="item.icon"></i>
			        <span slot="title">{{item.title}}</span>
			    </el-menu-item>
			    <!-- <el-menu-item index="/userManager" :route="{path: '/userManager'}">
			        <i class="el-icon-user-solid"></i>
			        <span slot="title">用户管理</span>
			    </el-menu-item> -->
			</el-menu>
		</el-aside>
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
	import { } from '@/api/getData.js';
	import { setStorage, getStorage} from "@/utils/localStorage.js";
	export default {
		data() {
			return {
				// activeIndex: "/docManager",
				menuList: [],
			}
		},
		methods: {
		
		},
		mounted() {
			//跳转默认选中
			// this.activeIndex = this.$route.path;
			console.log(this.$route.query.childrenMenus)
			//
			if(this.$route.query.childrenMenus){
				//存入缓存
				setStorage("managerChildren" ,this.$route.query.childrenMenus);
				//渲染路由
				this.menuList = JSON.parse(this.$route.query.childrenMenus);
			}else{
				//获取缓存里的路径
				let menus = getStorage("managerChildren");
				this.menuList = JSON.parse(menus);
			}
			
		}
	}
</script>

<style>

</style>