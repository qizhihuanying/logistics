<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','rule_name') || $check_field('add','rule_name') || $check_field('set','rule_name')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="规则名称" prop="rule_name">
					<el-input id="rule_name" v-model="form['rule_name']" placeholder="请输入规则名称"
							  v-if="user_group === '管理员' || (form['kpi_rule_id'] && $check_field('set','rule_name')) || (!form['kpi_rule_id'] && $check_field('add','rule_name'))" :disabled="disabledObj['rule_name_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','rule_name')">{{form['rule_name']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','update_date') || $check_field('add','update_date') || $check_field('set','update_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="更新日期" prop="update_date">
					<el-date-picker :disabled="disabledObj['update_date_isDisabled']" v-if="user_group === '管理员' || (form['kpi_rule_id'] && $check_field('set','update_date')) || (!form['kpi_rule_id'] && $check_field('add','update_date'))" id="update_date"
						v-model="form['update_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','update_date')">{{form['update_date']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','rule_content') || $check_field('add','rule_content') || $check_field('set','rule_content')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="规则内容" prop="rule_content">
					<el-input type="textarea" id="rule_content" v-model="form['rule_content']" placeholder="请输入规则内容"
						v-if="user_group === '管理员' || (form['kpi_rule_id'] && $check_field('set','rule_content')) || (!form['kpi_rule_id'] && $check_field('add','rule_content'))" :disabled="disabledObj['rule_content_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','rule_content')">{{form['rule_content']}}</div>
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
				field: "kpi_rule_id",
				url_add: "~/api/kpi_rule/add?",
				url_set: "~/api/kpi_rule/set?",
				url_get_obj: "~/api/kpi_rule/get_obj?",
				url_upload: "~/api/kpi_rule/upload?",

				query: {
					"kpi_rule_id": 0,
				},

				form: {
					"rule_name":'', // 规则名称
					"update_date":'', // 更新日期
					"rule_content":'', // 规则内容
					"kpi_rule_id": 0, // ID

				},
				disabledObj:{
					"rule_name_isDisabled": false,
					"update_date_isDisabled": false,
					"rule_content_isDisabled": false,
				},
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
        if (this.form["update_date"].indexOf("-")===-1){
          this.form["update_date"] = this.$toTime(parseInt(this.form["update_date"]),"yyyy-MM-dd")
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
        if(this.form["update_date"]=="0000-00-00"){
          this.form["update_date"] = null;
        }
				if(parseInt(this.form["update_date"]) > 9999){
					this.form["update_date"] = this.$toTime(parseInt(this.form["update_date"]),"yyyy-MM-dd")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/kpi_rule/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_rule/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_rule/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_rule/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/kpi_rule/view','get');
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
