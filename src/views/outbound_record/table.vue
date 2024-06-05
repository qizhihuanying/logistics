<template>
	<el-main class="bg table_wrap" @click="showStartButton">
	  <!-- 居中的大按钮 -->
	  <button v-if="showButton" class="start-button" @click="startSimulation">
		开始模拟
	  </button>
	  <!-- 加载动画 -->
	  <div v-if="isLoading" class="loading-animation">
		<div class="spinner"></div>
		<div class="loading-text">模拟中...</div>
	  </div>
	  <!-- 视频 -->
	  <video class="video-overlay" v-if="!isLoading" v-bind:src="videoSrc" autoplay>
		Your browser does not support the video tag.
	  </video>
	  <video class="video-overlay-2" v-if="!isLoading" v-bind:src="videoSrc2" autoplay>
		Your browser does not support the video tag.
	  </video>
	  <video class="video-overlay-3" v-if="!isLoading" v-bind:src="videoSrc3" autoplay>
		Your browser does not support the video tag.
	  </video>
	</el-main>
  </template>
<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				// 弹框
				showModal: false,
				// 获取数据地址
				url_get_list: "~/api/outbound_record/get_list?like=0",
				url_del: "~/api/outbound_record/del?",

				// 字段ID
				field: "outbound_record_id",

				// 查询
				query: {
					"size": 7,
					"page": 1,
					"name_of_goods": "",
					"delivery_date": "",
					"freight_driver": "",
					"login_time": "",
					"create_time": "",
					"orderby": `create_time desc`
				},
				// 数据
				list: [],
				// 货运车辆列表
				list_freight_vehicle: [],
				// 货运司机列表
				list_freight_driver: [],
				videoSrc: require('../../assets/video/simulation.mp4'),
				videoSrc2: require('../../assets/video/storage.mp4'),
				videoSrc3: require('../../assets/video/orders.mp4'),
				isLoading: true,
				showButton: true,
			}
		},
		methods: {
			showStartButton() {
				this.showButton = true;
			},
			  // 开始模拟的方法
			startSimulation() {
				this.isLoading = true; // 显示加载动画
				this.showButton = false; // 隐藏按钮
				setTimeout(() => {
				this.isLoading = false; // 隐藏加载动画
				// 这里可以添加其他初始化代码，比如获取视频数据等
				}, 25000); // 三秒后隐藏加载动画
			},
			// 关闭弹框
			closeModal(){
				this.showModal = false;
				},
			/**
			 * 获取货运车辆列表
			 */
			async get_list_freight_vehicle() {
				var json = await this.$get("~/api/vehicle_information/get_list?");
				if(json.result){
					this.list_freight_vehicle = json.result.list;
				}else if (json.error){
					console.log(json.error);
				}
			},
			/**
			 * 获取货运司机列表
			 */
			async get_list_freight_driver() {
				var json = await this.$get("~/api/driver_information/get_list?");
				if(json.result){
					this.list_freight_driver = json.result.list;
				}else if (json.error){
					console.log(json.error);
				}
			},

			open_tip() {
				const h = this.$createElement;

				var message = "";
				var list = this.list;

				var ifs = [ ];
				for (var n = 0; n < ifs.length; n++) {
					var o = ifs[n];
					for (var i = 0; i < list.length; i++) {
						var lt = list[i];
						if (o.type == "数内") {
							if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
								if (lt[o.factor] > o.start && lt[o.factor] < o.end) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.start || o.start === 0) {
								if (lt[o.factor] > o.start) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.end || o.end === 0) {
								if (lt[o.factor] < o.end) {
									o["idx"] = o["idx"] + 1;
								}
							}
						} else if (o.type == "数外") {
							if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
								if (lt[o.factor] < o.start || lt[o.factor] > o.end) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.start || o.start === 0) {
								if (lt[o.factor] < o.start) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.end || o.end === 0) {
								if (lt[o.factor] > o.end) {
									o["idx"] = o["idx"] + 1;
								}
							}
						} else if (o.type == "日内") {
							if ((o.start) && (o.end)) {
								if (lt[o.factor] > o.start && lt[o.factor] < o.end) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.start) {
								if (lt[o.factor] < o.start) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.end) {
								if (lt[o.factor] > o.end) {
									o["idx"] = o["idx"] + 1;
								}
							}
						} else if (o.type == "日外") {
							if (o.start && o.end) {
								if (lt[o.factor] < o.start || lt[o.factor] > o.end) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.start) {
								if (lt[o.factor] < o.start) {
									o["idx"] = o["idx"] + 1;
								}
							} else if (o.end) {
								if (lt[o.factor] > o.end) {
									o["idx"] = o["idx"] + 1;
								}
							}
						}
					}

					if (o["idx"]) {
						message += o.title;
						if (o["type"] == "数内") {
							if (o.start || o.start === 0) {
								message += "大于" + o.start;
							}
							if ((o.start || o.start === 0) && (o.end || o.end === 0)) {
								message += "并且";
							}
							if (o.end || o.end === 0) {
								message += "小于" + o.end;
							}
						} else if (o["type"] == "数外") {
							if (o.start || o.start === 0) {
								message += "小于" + o.start;
							}
							if ((o.start || o.start === 0) || (o.end || o.end === 0)) {
								message += "或者";
							}
							if (o.end || o.end === 0) {
								message += "大于" + o.end;
							}
						} else if (o["type"] == "日内") {
							if (o.start) {
								message += "在" + o.start + "之后";
							}
							if (o.start && o.end) {
								message += "并且";
							}
							if (o.end) {
								message += "在" + o.end + "之前";
							}
						} else if (o["type"] == "日外") {
							if (o.start) {
								message += "在" + o.start + "之前";
							}
							if (o.start || o.end) {
								message += "或者";
							}
							if (o.end) {
								message += "在" + o.end + "之后";
							}
						}
						message += "的有" + o["idx"] + "条";
					}
				}

				if (message) {
					message += "，需要处理、请尽快处理。";
					this.showModal = true;
					// this.$notify({
					// 	title: '提醒',
					// 	dangerouslyUseHTMLString: true,
					// 	message: h('i', {
					// 		style: 'color: teal'
					// 	}, message)
					// });
				}
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}

		},
		created() {
			// 初始化货运车辆列表
			this.get_list_freight_vehicle();
			// 初始化货运司机列表
			this.get_list_freight_driver();
			setTimeout(() => {
				this.open_tip();
			}, 1000)
		},
		mounted() {
			// 设置三秒后显示视频
		},
	}
</script>

<style type="text/css">
	.bg {
		background: white;
	}

	.form.p_4 {
		padding: 1rem;
	}

	.form .el-input {
		width: initial;
	}

	.mt {
		margin-top: 1rem;
	}

	.text_center {
		text-align: center;
	}

	.float-right {
		float: right;
	}


	.modal_wrap{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.5);
		z-index: 99999999;
	}
	.modal_wrap .modal_box{
		width: 400px;
		height: 200px;
		background: url("../../assets/modal_bg.jpg") no-repeat center;
		background-size: cover;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -200px;
		margin-top: -100px;
		border-radius: 10px;
		}
	.modal_wrap .modal_box .modal_box_close{
		font-size: 20px;
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
		}
	.modal_wrap .modal_box .modal_box_title{
	  text-align: center;
    font-size: 18px;
    margin: 16px auto;
    color: #fff;
    border-bottom: 1px solid rgba(117, 116, 116,0.5);
    padding-bottom: 16px;
    width: 356px;
		}
	.modal_wrap .modal_box .modal_box_text{
			text-align: center;
		font-size: 15px;
		color: #fff;
		margin-top: 25px;
		}
	.modal_wrap .modal_box .btn_box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 42px;
		}
			.modal_wrap .modal_box .btn_box span{
				display: inline-block;
				width: 80px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border: 1px solid #ccc;
				font-size: 14px;
				cursor: pointer;
				color: #fff;
			}
	.modal_wrap .modal_box .btn_box span:nth-child(2){
		background: #409EFF;
		color: #fff;
		border-color: #409EFF;
		margin-left: 15px;
	}
	.video-overlay {
		position: fixed; 
		right: 0;
		bottom: 0;
		width: 1620px;
		height: 1000px;
		z-index: 90; 
		background-size: cover;
		transition: 1s opacity;
	}
	.video-overlay-2 {
		position: fixed; 
		right: 1300px;
		bottom: 100px;
		width: 480px;
		height: 360px;
		z-index: 100; 
		background-size: cover;
		transition: 1s opacity;
	}
	.video-overlay-3 {
		position: fixed; 
		right: 1300px;
		bottom: 550px;
		width: 480px;
		height: 360px;
		z-index: 100; 
		background-size: cover;
		transition: 1s opacity;
	}
	/* 加载动画容器样式 */
	.loading-animation {
	pointer-events: none;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 200px; /* 设置动画的宽度，可以根据需要调整 */
	height: 200px; /* 设置动画的高度，可以根据需要调整 */
	z-index: 101; /* 确保加载动画在视频之上 */
	}

	/* 点旋转动画样式 */
	.spinner {
	width: 100px; /* 根据需要调整大小 */
	height: 100px; /* 根据需要调整大小 */
	border: 15px solid rgba(255, 255, 255, 0.2); /* 边框颜色 */
	border-top-color: #3498db; /* 上边框颜色，设置为加载动画的主要颜色 */
	border-radius: 50%;
	animation: spin 2s linear infinite;
	z-index: 101;
	}

	/* 文字样式 */
	.loading-text {
	margin-top: 20px; /* 与旋转图标的距离 */
	font-size: 48px; /* 字体大小 */
	color: #3498db; /* 字体颜色，与图标颜色相匹配 */
	z-index: 101;
	}

	/* 旋转动画 */
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	  /* 居中的大按钮样式 */
	.start-button {
	position: fixed;
    display: block;
    margin: 250px auto 0 600px; /* 调整上边距以覆盖更大的区域 */
    padding: 20px 40px; /* 增加内边距 */
    font-size: 32px; /* 增大字体大小 */
    text-align: center; /* 文本居中 */
    /* cursor: pointer; */
    background-color: #3498db; /* 按钮背景颜色 */
    color: white; /* 文字颜色 */
    border: none; /* 无边框 */
    border-radius: 10px; /* 按钮圆角 */
    width: 400px; /* 按钮宽度，可以根据需要调整 */
	height: 300px;
    transition: background-color 0.3s; /* 背景颜色变化的过渡效果 */
	z-index: 10000;
  }

</style>
