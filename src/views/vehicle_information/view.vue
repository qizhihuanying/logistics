<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','vehicle_name') || $check_field('add','vehicle_name') || $check_field('set','vehicle_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车辆编号" prop="vehicle_name">
					<el-input id="vehicle_name" v-model="form['vehicle_name']" placeholder="请输入车辆编号"
							  v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','vehicle_name')) || (!form['vehicle_information_id'] && $check_field('add','vehicle_name'))" :disabled="disabledObj['vehicle_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','vehicle_name')">{{form['vehicle_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','license_plate') || $check_field('add','license_plate') || $check_field('set','license_plate')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车牌号" prop="license_plate">
					<el-input id="license_plate" v-model="form['license_plate']" placeholder="请输入车牌号"
							  v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','license_plate')) || (!form['vehicle_information_id'] && $check_field('add','license_plate'))" :disabled="disabledObj['license_plate_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','license_plate')">{{form['license_plate']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','location') || $check_field('add','location') || $check_field('set','location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="所在仓库" prop="location">
					<el-input id="location" v-model="form['location']" placeholder="请输入所在仓库"
							  v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','location')) || (!form['vehicle_information_id'] && $check_field('add','location'))" :disabled="disabledObj['location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','location')">{{form['location']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','vehicle_status') || $check_field('add','vehicle_status') || $check_field('set','vehicle_status')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车辆状态" prop="vehicle_status">
					<el-select id="vehicle_status" v-model="form['vehicle_status']"
						v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','vehicle_status')) || (!form['vehicle_information_id'] && $check_field('add','vehicle_status'))">
						<el-option v-for="o in list_vehicle_status" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','vehicle_status')">{{form['vehicle_status']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','vehicle_remarks') || $check_field('add','vehicle_remarks') || $check_field('set','vehicle_remarks')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="车辆备注" prop="vehicle_remarks">
					<el-input type="textarea" id="vehicle_remarks" v-model="form['vehicle_remarks']" placeholder="请输入车辆备注"
						v-if="user_group === '管理员' || (form['vehicle_information_id'] && $check_field('set','vehicle_remarks')) || (!form['vehicle_information_id'] && $check_field('add','vehicle_remarks'))" :disabled="disabledObj['vehicle_remarks_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','vehicle_remarks')">{{form['vehicle_remarks']}}</div>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="el_form_btn_warp">
				<el-form-item>
					<el-button type="primary" @click="submit()">提交</el-button>
					<el-button @click="cancel()">取消</el-button>
				</el-form-item>
			</el-col>

		</el-form>
	</el-main>
</template>

<script>
	import mixin from "@/mixins/page.js";

	export default {
		mixins: [mixin],
		data() {
			return {
				field: "vehicle_information_id",
				url_add: "~/api/vehicle_information/add?",
				url_set: "~/api/vehicle_information/set?",
				url_get_obj: "~/api/vehicle_information/get_obj?",
				url_upload: "~/api/vehicle_information/upload?",

				query: {
					"vehicle_information_id": 0,
				},

				form: {
					"vehicle_name":'', // 车辆编号
					"license_plate":'', // 车牌号
					"location":'', // 所在仓库
					"vehicle_status":'', // 车辆状态
					"vehicle_remarks":'', // 车辆备注
					"vehicle_information_id": 0, // ID

				},
				disabledObj:{
					"vehicle_name_isDisabled": false,
					"license_plate_isDisabled": false,
					"location_isDisabled": false,
					"vehicle_status_isDisabled": false,
					"vehicle_remarks_isDisabled": false,
				},
				//车辆状态选项列表
				list_vehicle_status: ['运输中','空闲中','保养中'],
				// 仓库类型列表
				list_warehouse_type: ['普通仓库','仓储中心','应急储备点'],
			}
		},
		methods: {

			/**
			 * 获取对象之前
			 * @param {Object} param
			 */
			get_obj_before(param) {
				var form = "";
				if(this.form && form){
					Object.keys(this.form).forEach(key => {
						Object.keys(form).forEach(dbKey => {
							// if(dbKey === "charging_standard"){
							// 	this.form['charging_rules'] = form[dbKey];
							// 	this.disabledObj['charging_rules_isDisabled'] = true;
							// };
							if(key === dbKey){
								this.disabledObj[key+'_isDisabled'] = true;
							}
						})
					})
				}
				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/vehicle_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/vehicle_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/vehicle_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/vehicle_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/vehicle_information/view','get');
					console.log(bl ? "你有视图查询权限视作有查询权限" : "你没有视图查询权限");
				}

				console.log(bl ? "具有当前页面的查看权，请注意这不代表你有字段的查看权" : "无权查看当前页，请注意即便有字段查询权限没有页面查询权限也不行");

				return bl;
			},
			/**
			 * 上传文件
			 * @param {Object} param
			 */
			uploadimg(param) {
				this.uploadFile(param.file, "avatar");
			},

		},
		created() {
		},
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
