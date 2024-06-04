<template>
	<el-main class="bg edit_wrap">
		<el-form ref="form" :model="form" status-icon label-width="120px" v-if="is_view()">
			<!-- <el-col v-if="user_group === '制造商' || $check_field('get','name_of_goods') || $check_field('add','name_of_goods') || $check_field('set','name_of_goods')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="制造商" prop="name_of_goods">
					<el-input id="name_of_goods" v-model="form['name_of_goods']" placeholder="请输入制造商"
							  v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','name_of_goods')) || (!form['warehousing_record_id'] && $check_field('add','name_of_goods'))" :disabled="disabledObj['name_of_goods_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','name_of_goods')">{{form['name_of_goods']}}</div>
				</el-form-item>
			</el-col> -->
			<el-col v-if="user_group === '管理员' || $check_field('get','goods_no') || $check_field('add','goods_no') || $check_field('set','goods_no')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="货物来源" prop="goods_no">
					<el-input id="goods_no" v-model="form['goods_no']" placeholder="请输入货物来源"
							  v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','goods_no')) || (!form['warehousing_record_id'] && $check_field('add','goods_no'))" :disabled="disabledObj['goods_no_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','goods_no')">{{form['goods_no']}}</div>
				</el-form-item>
			</el-col>
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','warehousing_date') || $check_field('add','warehousing_date') || $check_field('set','warehousing_date')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="入库日期" prop="warehousing_date">
					<el-date-picker :disabled="disabledObj['warehousing_date_isDisabled']" v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','warehousing_date')) || (!form['warehousing_record_id'] && $check_field('add','warehousing_date'))" id="warehousing_date"
						v-model="form['warehousing_date']" type="date" placeholder="选择日期">
					</el-date-picker>
					<div v-else-if="$check_field('get','warehousing_date')">{{form['warehousing_date']}}</div>
				</el-form-item>
			</el-col> -->
			<el-col v-if="user_group === '管理员' || $check_field('get','receipt_quantity') || $check_field('add','receipt_quantity') || $check_field('set','receipt_quantity')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="总物资量" prop="receipt_quantity">
					<el-input-number id="receipt_quantity" v-model.number="form['receipt_quantity']"
						v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','receipt_quantity')) || (!form['warehousing_record_id'] && $check_field('add','receipt_quantity'))" :disabled="disabledObj['receipt_quantity_isDisabled']"></el-input-number>
					<div v-else-if="$check_field('get','receipt_quantity')">{{form['receipt_quantity']}}</div>
				</el-form-item>
			</el-col>
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','volume_of_goods_in_storage') || $check_field('add','volume_of_goods_in_storage') || $check_field('set','volume_of_goods_in_storage')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="入库货物体积" prop="volume_of_goods_in_storage">
					<el-input id="volume_of_goods_in_storage" v-model="form['volume_of_goods_in_storage']" placeholder="请输入入库货物体积"
							  v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','volume_of_goods_in_storage')) || (!form['warehousing_record_id'] && $check_field('add','volume_of_goods_in_storage'))" :disabled="disabledObj['volume_of_goods_in_storage_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','volume_of_goods_in_storage')">{{form['volume_of_goods_in_storage']}}</div>
				</el-form-item>
			</el-col> -->
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','weight_of_goods_in_storage') || $check_field('add','weight_of_goods_in_storage') || $check_field('set','weight_of_goods_in_storage')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="入库货物重量" prop="weight_of_goods_in_storage">
					<el-input id="weight_of_goods_in_storage" v-model="form['weight_of_goods_in_storage']" placeholder="请输入入库货物重量"
							  v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','weight_of_goods_in_storage')) || (!form['warehousing_record_id'] && $check_field('add','weight_of_goods_in_storage'))" :disabled="disabledObj['weight_of_goods_in_storage_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','weight_of_goods_in_storage')">{{form['weight_of_goods_in_storage']}}</div>
				</el-form-item>
			</el-col> -->
			<el-col v-if="user_group === '管理员' || $check_field('get','receipt_invoice') || $check_field('add','receipt_invoice') || $check_field('set','receipt_invoice')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<!-- <el-form-item label="仓库类型" prop="receipt_invoice">
					<div v-if="disabledObj['receipt_invoice_isDisabled']">
						<div v-if="$check_field('get','receipt_invoice')">
							<el-button type="primary" @click="$download($fullUrl(form['receipt_invoice']),form['receipt_invoice'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
					<div v-else>
						<el-upload v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','receipt_invoice')) || (!form['warehousing_record_id'] && $check_field('add','receipt_invoice'))" class="upload-demo" drag
								   action="" style="max-width: 300px;width: 100%;" :http-request="upload_receipt_invoice" :limit="1" accept="">
							<i class="el-icon-upload"></i>
							<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						</el-upload>
						<div v-else-if="$check_field('get','receipt_invoice')">
							<el-button type="primary" @click="$download($fullUrl(form['receipt_invoice']),form['receipt_invoice'])">下载<i
									class="el-icon-download el-icon--right"></i></el-button>
						</div>
					</div>
				</el-form-item> -->
				<el-form-item label="仓库类型" >
						<el-select v-model="query.receipt_invoice">
                            <el-option v-for="o in list_warehouse_type" :key="o" :label="o"
                            	:value="o">
                            </el-option>
						</el-select>
					</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','freight_vehicle') || $check_field('add','freight_vehicle') || $check_field('set','freight_vehicle')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="仓库所在地" prop="freight_vehicle">
					<el-select id="freight_vehicle" v-model="form['freight_vehicle']"
						v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','freight_vehicle')) || (!form['warehousing_record_id'] && $check_field('add','freight_vehicle'))">
						<el-option v-for="o in list_freight_vehicle" :key="o['vehicle_name']" :label="o['vehicle_name']"
							:value="o['vehicle_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','freight_vehicle')">{{form['freight_vehicle']}}</div>
				</el-form-item>
			</el-col>
			<el-col v-if="user_group === '管理员' || $check_field('get','freight_driver') || $check_field('add','freight_driver') || $check_field('set','freight_driver')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="仓库经纬度" prop="freight_driver">
					<el-select id="freight_driver" v-model="form['freight_driver']"
						v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','freight_driver')) || (!form['warehousing_record_id'] && $check_field('add','freight_driver'))">
						<el-option v-for="o in list_freight_driver" :key="o['employee_name']" :label="o['employee_name']"
							:value="o['employee_name']">
						</el-option>
					</el-select>
					<div v-else-if="$check_field('get','freight_driver')">{{form['freight_driver']}}</div>
				</el-form-item>
			</el-col>
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','estimated_time') || $check_field('add','estimated_time') || $check_field('set','estimated_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="预计时间" prop="estimated_time">
					<el-date-picker :disabled="disabledObj['estimated_time_isDisabled']" v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','estimated_time')) || (!form['warehousing_record_id'] && $check_field('add','estimated_time'))" id="estimated_time"
						v-model="form['estimated_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','estimated_time')">{{form['estimated_time']}}</div>
				</el-form-item>
			</el-col> -->
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','actual_time') || $check_field('add','actual_time') || $check_field('set','actual_time')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="实际时间" prop="actual_time">
					<el-date-picker :disabled="disabledObj['actual_time_isDisabled']" v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','actual_time')) || (!form['warehousing_record_id'] && $check_field('add','actual_time'))" id="actual_time"
						v-model="form['actual_time']" type="datetime" placeholder="选择日期时间">
					</el-date-picker>
					<div v-else-if="$check_field('get','actual_time')">{{form['actual_time']}}</div>
				</el-form-item>
			</el-col> -->
			<!-- <el-col v-if="user_group === '管理员' || $check_field('get','expense_settlement') || $check_field('add','expense_settlement') || $check_field('set','expense_settlement')" :xs="24" :sm="12" :lg="8" class="el_form_item_warp">
				<el-form-item label="费用结算" prop="expense_settlement">
					<el-input id="expense_settlement" v-model="form['expense_settlement']" placeholder="请输入费用结算"
							  v-if="user_group === '管理员' || (form['warehousing_record_id'] && $check_field('set','expense_settlement')) || (!form['warehousing_record_id'] && $check_field('add','expense_settlement'))" :disabled="disabledObj['expense_settlement_isDisabled']"></el-input>
					<div v-else-if="$check_field('get','expense_settlement')">{{form['expense_settlement']}}</div>
				</el-form-item>
			</el-col> -->
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
				field: "warehousing_record_id",
				url_add: "~/api/warehousing_record/add?",
				url_set: "~/api/warehousing_record/set?",
				url_get_obj: "~/api/warehousing_record/get_obj?",
				url_upload: "~/api/warehousing_record/upload?",

				query: {
					"warehousing_record_id": 0,
				},

				form: {
					"name_of_goods":'', // 制造商
					"goods_no":'', // 货物来源
					"warehousing_date":'', // 入库日期
					"receipt_quantity":0, // 入库数量 总物资量
					"volume_of_goods_in_storage":'', // 入库货物体积
					"weight_of_goods_in_storage":'', // 入库货物重量
					"receipt_invoice":'', // 入库发票 仓库类型
					"freight_vehicle":'', // 货运车辆 仓库所在地
					"freight_driver":'', // 货运司机 仓库经纬度
					"estimated_time":'', // 预计时间 
					"actual_time":'', // 实际时间
					"expense_settlement":'', // 费用结算
					"warehousing_record_id": 0, // ID

				},
				disabledObj:{
					"name_of_goods_isDisabled": false,
					"goods_no_isDisabled": false,
					"warehousing_date_isDisabled": false,
          "receipt_quantity_isDisabled": false,
					"volume_of_goods_in_storage_isDisabled": false,
					"weight_of_goods_in_storage_isDisabled": false,
					"receipt_invoice_isDisabled": false,
					"freight_vehicle_isDisabled": false,
					"freight_driver_isDisabled": false,
					"estimated_time_isDisabled": false,
					"actual_time_isDisabled": false,
					"expense_settlement_isDisabled": false,
				},
				//货运车辆选项列表
				list_freight_vehicle: [],
				//货运司机选项列表
				list_freight_driver: [],
				//仓库类型选项列表
				list_warehouse_type: ['普通仓库','仓储中心','应急储备点'],
			}
		},
		methods: {
			/**
			 * 上传入库发票
			 * @param {Object} param文件参数
			 */
			upload_receipt_invoice(param){
				this.uploadFile(param.file, "receipt_invoice");
			},
			/**
			 * 获取货运车辆列表
			 */
			async get_list_freight_vehicle() {
				var json = await this.$get("~/api/vehicle_information/get_list?");
				if(json.result && json.result.list){
					this.list_freight_vehicle = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
			},
			/**
			 * 获取货运司机列表
			 */
			async get_list_freight_driver() {
				var json = await this.$get("~/api/driver_information/get_list?");
				if(json.result && json.result.list){
					this.list_freight_driver = json.result.list;
				}
				else if(json.error){
					console.error(json.error);
				}
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
        if (this.form["warehousing_date"].indexOf("-")===-1){
          this.form["warehousing_date"] = this.$toTime(parseInt(this.form["warehousing_date"]),"yyyy-MM-dd")
        }
				this.form["estimated_time"] = this.$toTime(parseInt(this.form["estimated_time"]),"yyyy-MM-dd hh:mm:ss")
				this.form["actual_time"] = this.$toTime(parseInt(this.form["actual_time"]),"yyyy-MM-dd hh:mm:ss")
				$.db.del("form");
				return param;
			},

			/**
			 * 获取对象之后
			 * @param {Object} json
			 * @param {Object} func
			 */
			get_obj_after(json, func){
        if(this.form["warehousing_date"]=="0000-00-00"){
          this.form["warehousing_date"] = null;
        }
				if(parseInt(this.form["warehousing_date"]) > 9999){
					this.form["warehousing_date"] = this.$toTime(parseInt(this.form["warehousing_date"]),"yyyy-MM-dd")
				}
        if(this.form["estimated_time"]=="0000-00-00 00:00:00"){
          this.form["estimated_time"] = null;
        }
				if(parseInt(this.form["estimated_time"]) > 9999){
					this.form["estimated_time"] = this.$toTime(parseInt(this.form["estimated_time"]),"yyyy-MM-dd hh:mm:ss")
				}
        if(this.form["actual_time"]=="0000-00-00 00:00:00"){
          this.form["actual_time"] = null;
        }
				if(parseInt(this.form["actual_time"]) > 9999){
					this.form["actual_time"] = this.$toTime(parseInt(this.form["actual_time"]),"yyyy-MM-dd hh:mm:ss")
				}
			},

			is_view(){
				var bl = this.user_group == "管理员";

				if(!bl){
					bl = this.$check_action('/warehousing_record/table','add');
					console.log(bl ? "你有表格添加权限视作有添加权限" : "你没有表格添加权限");
				}
				if(!bl){
					bl = this.$check_action('/warehousing_record/table','set');
					console.log(bl ? "你有表格添加权限视作有修改权限" : "你没有表格修改权限");
				}
				if(!bl){
					bl = this.$check_action('/warehousing_record/view','add');
					console.log(bl ? "你有视图添加权限视作有添加权限" : "你没有视图添加权限");
				}
				if(!bl){
					bl = this.$check_action('/warehousing_record/view','set');
					console.log(bl ? "你有视图修改权限视作有修改权限" : "你没有视图修改权限");
				}
				if(!bl){
					bl = this.$check_action('/warehousing_record/view','get');
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
			this.get_list_freight_vehicle();
			this.get_list_freight_driver();
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
