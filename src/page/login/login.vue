<template>
	<div class="login-container">
		<el-alert title="欢迎使用医院门诊系统" type="success" :closable="false" style="position: fixed"></el-alert>
		<el-row>
			<el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
				<div style="color: transparent">占位符</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<el-form ref="form" :model="form" :rules="rules" class="login-form" label-position="left">
					<div class="title">hello !</div>
					<div class="title-tips">欢迎来到{{ title }}！</div>
					<el-form-item style="margin-top: 40px" prop="username">
						<span class="svg-container svg-container-admin">
							<vab-icon :icon="['fas', 'user']" />
						</span>
						<el-input v-model.trim="form.username" v-focus placeholder="请输入用户名" tabindex="1" type="text" />
					</el-form-item>
					<el-form-item prop="password">
						<span class="svg-container">
							<vab-icon :icon="['fas', 'lock']" />
						</span>
						<el-input :key="passwordType" ref="password" v-model.trim="form.password" :type="passwordType"
							tabindex="2" placeholder="请输入密码" @keyup.enter.native="handleLogin2" />
						<span v-if="passwordType === 'password'" class="show-password" @click="handlePassword">
							<vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
						</span>
						<span v-else class="show-password" @click="handlePassword">
							<vab-icon :icon="['fas', 'eye']"></vab-icon>
						</span>
					</el-form-item>
					<el-button :loading="loading" class="login-btn" type="primary" @click="handleLogin2">
						登录
					</el-button>
					<router-link to="/register">
						<div style="margin-top: 20px;color: darkred">注册</div>
					</router-link>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {
		isPassword
	} from '@/utils/validate';
	import {
		userLogin
	} from "@/api/getData.js";
	import {
		setStorage,
		getStorage
	} from "@/utils/localStorage.js";
	export default {
		name: 'Login',
		directives: {
			focus: {
				inserted(el) {
					el.querySelector('input').focus()
				},
			},
		},
		data() {
			const validateusername = (rule, value, callback) => {
				if ('' == value) {
					callback(new Error('用户名不能为空'))
				} else {
					callback()
				}
			}
			const validatePassword = (rule, value, callback) => {
				if (!isPassword(value)) {
					callback(new Error('密码不能少于6位'))
				} else {
					callback()
				}
			}
			return {
				nodeEnv: process.env.NODE_ENV,
				title: "h",
				form: {
					username: '',
					password: '',
				},
				rules: {
					username: [{
						required: true,
						trigger: 'blur',
						validator: validateusername,
					}, ],
					password: [{
						required: true,
						trigger: 'blur',
						validator: validatePassword,
					}, ],
				},
				loading: false,
				passwordType: 'password',
				redirect: undefined,
			}
		},
		watch: {
			$route: {
				handler(route) {
					this.redirect = (route.query && route.query.redirect) || '/'
				},
				immediate: true,
			},
		},
		created() {
			document.body.style.overflow = 'hidden'
		},
		beforeDestroy() {
			document.body.style.overflow = 'auto'
		},
		mounted() {
			// this.form.username = 'admin'
			// this.form.password = '123456'
			// setTimeout(() => {
			//   this.handleLogin()
			// }, 3000)
		},
		methods: {
			handlePassword() {
				this.passwordType === 'password' ?
					(this.passwordType = '') :
					(this.passwordType = 'password')
				this.$nextTick(() => {
					this.$refs.password.focus()
				})
			},
			handleLogin() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.loading = true
						console.log(this.form)
						this.$router.push({
							name: "home"
						});
						// this.$store
						//     .dispatch('user/login', this.form)
						//     .then(() => {
						//       const routerPath =
						//           this.redirect === '/404' || this.redirect === '/401'
						//               ? '/'
						//               : this.redirect
						//       this.$router.push(routerPath).catch(() => {})
						//       this.loading = false
						//     })
						//     .catch(() => {
						//       this.loading = false
						//     })
					} else {
						return false
					}
				})
			},
			handleLogin2() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.loading = true
						//1.发送登录请求后台方法,请求js
						let userData = {
							userId: this.form.username,
							userPwd: this.form.password
						}
						userLogin(userData).then(res => {
							if (res != -1) {
								//正确的逻辑代码
								//2.把后台返回的用户数据存入到缓存
								setStorage("userInfo", JSON.stringify(res.datas));
								//3.跳转到首页
								let info = res.datas;
								if (info.authorityName == "普通用户") {
									this.$message.error('你不是管理员！');
									this.loading=false;
								} else {
									//管理员
									this.$router.push({
										name: "home"
									});
									//4.给用户提示
									this.$message.success("登录成功");
								}

							} else {
								setTimeout(() => {
									this.loading = false;
								}, 3000)
							}
						})
					} else {
						this.$message.error('请输入正确的用户名和密码');
						return false;
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.login-container {
		height: 100vh;
		background: url('~@/assets/login_images/login.jpg') center center fixed no-repeat;
		background-size: cover;

		.title {
			font-size: 54px;
			font-weight: 500;
			color: rgba(14, 18, 26, 1);
		}

		.title-tips {
			margin-top: 29px;
			font-size: 26px;
			font-weight: 400;
			color: rgba(14, 18, 26, 1);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.login-btn {
			display: inherit;
			width: 220px;
			height: 60px;
			margin-top: 5px;
			border: 0;

			&:hover {
				opacity: 0.9;
			}
		}

		.login-form {
			position: relative;
			max-width: 100%;
			margin: calc((100vh - 425px) / 2) 10% 10%;
			overflow: hidden;

			.forget-password {
				width: 100%;
				margin-top: 40px;
				text-align: left;

				.forget-pass {
					width: 129px;
					height: 19px;
					font-size: 20px;
					font-weight: 400;
					color: rgba(92, 102, 240, 1);
				}
			}
		}

		.tips {
			margin-bottom: 10px;
			font-size: 14px;
			color: #fff;

			span {
				&:first-of-type {
					margin-right: 16px;
				}
			}
		}

		.title-container {
			position: relative;

			.title {
				margin: 0 auto 40px auto;
				font-size: 34px;
				font-weight: bold;
				color: #1890ff;
				text-align: center;
			}
		}

		.svg-container {
			position: absolute;
			top: 14px;
			left: 15px;
			z-index: 999;
			font-size: 16px;
			color: #d7dee3;
			cursor: pointer;
			user-select: none;
		}

		.show-password {
			position: absolute;
			top: 14px;
			right: 25px;
			font-size: 16px;
			color: #d7dee3;
			cursor: pointer;
			user-select: none;
		}

		::v-deep {
			.el-form-item {
				padding-right: 0;
				margin: 20px 0;
				color: #454545;
				background: transparent;
				border: 1px solid transparent;
				border-radius: 2px;

				&__content {
					min-height: 32px;
					line-height: 32px;
				}

				&__error {
					position: absolute;
					top: 100%;
					left: 18px;
					font-size: 12px;
					line-height: 18px;
					color: #e72100;
				}
			}

			.el-input {
				box-sizing: border-box;

				input {
					height: 58px;
					padding-left: 45px;
					//font-size: $base-font-size-default;
					font-size: 16px;
					line-height: 58px;
					color: #606266;
					background: #f6f4fc;
					border: 0;
					caret-color: #606266;
				}
			}
		}
	}
</style>
