<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','driver_staff') || $check_field('add','driver_staff') || $check_field('set','driver_staff')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="司机员工" prop="driver_staff">
						<el-select v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','driver_staff')) || (!form['kpi_assessment_id'] && $check_field('add','driver_staff'))" id="driver_staff" v-model="form['driver_staff']" :disabled="disabledObj['driver_staff_isDisabled']">
							<el-option v-for="o in list_user_driver_staff" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
						<el-select v-else-if="$check_field('get','driver_staff')" id="driver_staff" v-model="form['driver_staff']" :disabled="true">
							<el-option v-for="o in list_user_driver_staff" :key="o['username']" :label="o['nickname'] + '-' + o['username']"
									   :value="o['user_id']">
							</el-option>
						</el-select>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','employee_name') || $check_field('add','employee_name') || $check_field('set','employee_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="员工姓名" prop="employee_name">
					<el-input id="employee_name" v-model="form['employee_name']" placeholder="请输入员工姓名"
							  v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','employee_name')) || (!form['kpi_assessment_id'] && $check_field('add','employee_name'))" :disabled="disabledObj['employee_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','employee_name')">{{form['employee_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','employee_job_number') || $check_field('add','employee_job_number') || $check_field('set','employee_job_number')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="员工工号" prop="employee_job_number">
					<el-input id="employee_job_number" v-model="form['employee_job_number']" placeholder="请输入员工工号"
							  v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','employee_job_number')) || (!form['kpi_assessment_id'] && $check_field('add','employee_job_number'))" :disabled="disabledObj['employee_job_number_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','employee_job_number')">{{form['employee_job_number']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','assessment_date') || $check_field('add','assessment_date') || $check_field('set','assessment_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="考核日期" prop="assessment_date">
					<el-date-picker :disabled="disabledObj['assessment_date_isDisabled']" v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','assessment_date')) || (!form['kpi_assessment_id'] && $check_field('add','assessment_date'))" id="assessment_date"
						v-model="form['assessment_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','assessment_date')">{{form['assessment_date']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','assessment_type') || $check_field('add','assessment_type') || $check_field('set','assessment_type')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="考核类型" prop="assessment_type">
					<el-select id="assessment_type" v-model="form['assessment_type']"
						v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','assessment_type')) || (!form['kpi_assessment_id'] && $check_field('add','assessment_type'))">
						<el-option v-for="o in list_assessment_type" :key="o" :label="o" :value="o">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','assessment_type')">{{form['assessment_type']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','kpi_score') || $check_field('add','kpi_score') || $check_field('set','kpi_score')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="kpi分数" prop="kpi_score">
					<el-input-number id="kpi_score" v-model.number="form['kpi_score']"
						v-if="user_group === '管理员' || (form['kpi_assessment_id'] && $check_field('set','kpi_score')) || (!form['kpi_assessment_id'] && $check_field('add','kpi_score'))" :disabled="disabledObj['kpi_score_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','kpi_score')">{{form['kpi_score']}}</div>
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
				field: "kpi_assessment_id",
				url_add: "~/api/kpi_assessment/add?",
				url_set: "~/api/kpi_assessment/set?",
				url_get_obj: "~/api/kpi_assessment/get_obj?",
				url_upload: "~/api/kpi_assessment/upload?",

				query: {
					"kpi_assessment_id": 0,
				},

				form: {
					"driver_staff": 0, // 司机员工
					"employee_name":'', // 员工姓名
					"employee_job_number":'', // 员工工号
					"assessment_date":'', // 考核日期
					"assessment_type":'', // 考核类型
					"kpi_score":0, // kpi分数
					"kpi_assessment_id": 0, // ID

				},
				disabledObj:{
					"driver_staff_isDisabled": false,
					"employee_name_isDisabled": false,
					"employee_job_number_isDisabled": false,
					"assessment_date_isDisabled": false,
					"assessment_type_isDisabled": false,
          "kpi_score_isDisabled": false,
				},
				// 用户列表
				list_user_driver_staff: [],
				//考核类型选项列表
				list_assessment_type: ['加','减'],
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
				// 获取缓存数据附加
				form = $.db.get("form");
				$.push(this.form ,form);
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
        if (this.form["assessment_date"].indexOf("-")===-1){
          this.form["assessment_date"] = this.$toTime(parseInt(this.form["assessment_date"]),"yyyy-MM-dd")
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
        if(this.form["assessment_date"]=="0000-00-00"){
          this.form["assessment_date"] = null;
        }
				if(parseInt(this.form["assessment_date"]) > 9999){
					this.form["assessment_date"] = this.$toTime(parseInt(this.form["assessment_date"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/kpi_assessment/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_assessment/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_assessment/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_assessment/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_assessment/view','get');
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
