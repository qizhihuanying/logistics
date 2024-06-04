<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<el-col v-if="user_group === '管理员' || $check_field('get','name_of_goods') || $check_field('add','name_of_goods') || $check_field('set','name_of_goods')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="制造商" prop="name_of_goods">
					<el-input id="name_of_goods" v-model="form['name_of_goods']" placeholder="请输入制造商"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','name_of_goods')) || (!form['warehouse_management_id'] && $check_field('add','name_of_goods'))" :disabled="disabledObj['name_of_goods_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','name_of_goods')">{{form['name_of_goods']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','goods_no') || $check_field('add','goods_no') || $check_field('set','goods_no')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="货物来源" prop="goods_no">
					<el-input id="goods_no" v-model="form['goods_no']" placeholder="请输入货物来源"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','goods_no')) || (!form['warehouse_management_id'] && $check_field('add','goods_no'))" :disabled="true"></el-input>
					<div v-else-if="$check_field('get','goods_no')">{{form['goods_no']}}</div>
				</el-form-item>
			</el-col>
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','cargo_volume') || $check_field('add','cargo_volume') || $check_field('set','cargo_volume')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="货物体积" prop="cargo_volume">
					<el-input id="cargo_volume" v-model="form['cargo_volume']" placeholder="请输入货物体积"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','cargo_volume')) || (!form['warehouse_management_id'] && $check_field('add','cargo_volume'))" :disabled="disabledObj['cargo_volume_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','cargo_volume')">{{form['cargo_volume']}}</div>
				</el-form-item>
			</el-col> -->
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','cargo_weight') || $check_field('add','cargo_weight') || $check_field('set','cargo_weight')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="货物重量" prop="cargo_weight">
					<el-input id="cargo_weight" v-model="form['cargo_weight']" placeholder="请输入货物重量"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','cargo_weight')) || (!form['warehouse_management_id'] && $check_field('add','cargo_weight'))" :disabled="disabledObj['cargo_weight_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','cargo_weight')">{{form['cargo_weight']}}</div>
				</el-form-item>
			</el-col> -->
			<el-col v-if="user_group === '管理员' || $check_field('get','location') || $check_field('add','location') || $check_field('set','location')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="所在货位" prop="location">
					<el-input id="location" v-model="form['location']" placeholder="请输入所在货位"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','location')) || (!form['warehouse_management_id'] && $check_field('add','location'))" :disabled="disabledObj['location_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','location')">{{form['location']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','storage_age_of_goods') || $check_field('add','storage_age_of_goods') || $check_field('set','storage_age_of_goods')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="入库时间" prop="storage_age_of_goods">
					<el-input id="storage_age_of_goods" v-model="form['storage_age_of_goods']" placeholder="请输入入库时间"
							  v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','storage_age_of_goods')) || (!form['warehouse_management_id'] && $check_field('add','storage_age_of_goods'))" :disabled="disabledObj['storage_age_of_goods_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','storage_age_of_goods')">{{form['storage_age_of_goods']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','goods_inventory') || $check_field('add','goods_inventory') || $check_field('set','goods_inventory')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="货物库存" prop="goods_inventory">
					<el-input-number id="goods_inventory" v-model.number="form['goods_inventory']"
						v-if="user_group === '管理员' || (form['warehouse_management_id'] && $check_field('set','goods_inventory')) || (!form['warehouse_management_id'] && $check_field('add','goods_inventory'))" :disabled="disabledObj['goods_inventory_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','goods_inventory')">{{form['goods_inventory']}}</div>
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
				field: "warehouse_management_id",
				url_add: "~/api/warehouse_management/add?",
				url_set: "~/api/warehouse_management/set?",
				url_get_obj: "~/api/warehouse_management/get_obj?",
				url_upload: "~/api/warehouse_management/upload?",

				query: {
					"warehouse_management_id": 0,
				},

				form: {
					"name_of_goods":'', // 制造商
					"goods_no":this.$get_stamp(), // 货物来源
					"cargo_volume":'', // 货物体积
					"cargo_weight":'', // 货物重量
					"location":'', // 所在货位
					"storage_age_of_goods":'', // 入库时间
					"goods_inventory":0, // 货物库存
					"warehouse_management_id": 0, // ID

				},
				disabledObj:{
					"name_of_goods_isDisabled": false,
					"goods_no_isDisabled": false,
					"cargo_volume_isDisabled": false,
					"cargo_weight_isDisabled": false,
					"location_isDisabled": false,
					"storage_age_of_goods_isDisabled": false,
          "goods_inventory_isDisabled": false,
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
					bl = this.$check_action('/warehouse_management/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/warehouse_management/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/warehouse_management/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/warehouse_management/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/warehouse_management/view','get');
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
