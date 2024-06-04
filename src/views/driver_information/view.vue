<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','driver_staff') || $check_field('add','driver_staff') || $check_field('set','driver_staff')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<!-- <el-form-item label="仓库类型" prop="driver_staff">
						<el-select v-if="user_group === '管理员' || (form['driver_information_id'] && $check_field('set','driver_staff')) || (!form['driver_information_id'] && $check_field('add','driver_staff'))" id="driver_staff" v-model="form['driver_staff']" :disabled="disabledObj['driver_staff_isDisabled']">
							<el-option v-for="o in list_user_driver_staff" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','driver_staff')" id="driver_staff" v-model="form['driver_staff']" :disabled="true">
							<el-option v-for="o in list_user_driver_staff" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item> -->
				<el-form-item label="仓库类型">
						<el-select v-model="form.driver_staff">
                            <!-- <el-option v-for="o in list_warehouse_type" :key="o" :label="o"
                            	:value="value">
                            </el-option> -->
							<el-option v-for="(o, index) in list_warehouse_type" :key="index" :label="o" :value="index">
        					</el-option>
						</el-select>
					</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','employee_name') || $check_field('add','employee_name') || $check_field('set','employee_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="仓库所在地" prop="employee_name">
					<el-input id="employee_name" v-model="form['employee_name']" placeholder="请输入仓库所在地"
							  v-if="user_group === '管理员' || (form['driver_information_id'] && $check_field('set','employee_name')) || (!form['driver_information_id'] && $check_field('add','employee_name'))" :disabled="disabledObj['employee_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','employee_name')">{{form['employee_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','employee_job_number') || $check_field('add','employee_job_number') || $check_field('set','employee_job_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="仓库经纬度" prop="employee_job_number">
					<el-input id="employee_job_number" v-model="form['employee_job_number']" placeholder="请输入仓库经纬度"
							  v-if="user_group === '管理员' || (form['driver_information_id'] && $check_field('set','employee_job_number')) || (!form['driver_information_id'] && $check_field('add','employee_job_number'))" :disabled="disabledObj['employee_job_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','employee_job_number')">{{form['employee_job_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','driver_kpi') || $check_field('add','driver_kpi') || $check_field('set','driver_kpi')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总物资量" prop="driver_kpi">
					<el-input-number id="driver_kpi" v-model.number="form['driver_kpi']"
						v-if="user_group === '管理员' || (form['driver_information_id'] && $check_field('set','driver_kpi')) || (!form['driver_information_id'] && $check_field('add','driver_kpi'))" :disabled="disabledObj['driver_kpi_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','driver_kpi')">{{form['driver_kpi']}}</div>
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
				field: "driver_information_id",
				url_add: "~/api/driver_information/add?",
				url_set: "~/api/driver_information/set?",
				url_get_obj: "~/api/driver_information/get_obj?",
				url_upload: "~/api/driver_information/upload?",

				query: {
					"driver_information_id": 0,
				},

				form: {
					"driver_staff": 0, // 仓库类型
					"employee_name":'', // 仓库所在地
					"employee_job_number":'', // 仓库经纬度
					"driver_kpi":0, // 总物资量
					"driver_information_id": 0, // ID

				},
				disabledObj:{
					"driver_staff_isDisabled": false,
					"employee_name_isDisabled": false,
					"employee_job_number_isDisabled": false,
          "driver_kpi_isDisabled": false,
				},
				// 用户列表
				list_user_driver_staff: [],
				list_warehouse_type: ['普通仓库','仓储中心','应急储备点'],
			}
		},
		methods: {
			/**
			 * 获取普通员工用户列表
			 */
			async get_list_user_driver_staff() {
                // if(this.user_group !== "管理员" && this.form["driver_staff"] === 0) {
                //     this.form["driver_staff"] = this.user.user_id;
                // }
                var json = await this.$get("~/api/user/get_list?user_group=普通员工");
                if(json.result && json.result.list){
                    this.list_user_driver_staff = json.result.list;
                }
                else if(json.error){
                    console.error(json.error);
                }
			},
			get_user_driver_staff(id){
				var obj = this.list_user_driver_staff.getObj({"user_id":id});
				var ret = "";
				if(obj){
					if(obj.nickname){
						ret = obj.nickname;}
					else{
						ret = obj.username;
					}
				}
				return ret;
			},

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
					bl = this.$check_action('/driver_information/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/driver_information/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/driver_information/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/driver_information/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/driver_information/view','get');
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
			this.get_list_user_driver_staff();
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
