<template>
	<div>
		<el-form-item v-if="$check_register_field('add','employee_name','/ordinary_staff/view')" label="员工姓名" prop="employee_name">
		<el-input id="employee_name" v-model="form['employee_name']" placeholder="请输入员工姓名"></el-input>
		</el-form-item>
		<el-form-item v-if="$check_register_field('add','employee_gender','/ordinary_staff/view')" label="员工性别" prop="employee_gender">
		<el-select id="employee_gender" v-model="form['employee_gender']">
			<el-option v-for="o in list_employee_gender" :key="o" :label="o" :value="o">
			</el-option>
		</el-select>
		</el-form-item>
		<el-form-item v-if="$check_register_field('add','employee_job_number','/ordinary_staff/view')" label="员工工号" prop="employee_job_number">
		<el-input id="employee_job_number" v-model="form['employee_job_number']" placeholder="请输入员工工号"></el-input>
		</el-form-item>

	</div>
</template>

<script>
	import mixin from "@/mixins/component.js";

	export default {
		mixins: [mixin],
		props:{

			form:{
				type: Object,
				default: function(){
					return {
						"employee_name":'',
						"employee_gender":'',
						"employee_job_number":'',
					}
				}
			},

		},
		data() {
			return {
				field: "ordinary_staff_id",
				url_add: "~/api/ordinary_staff/add?",
				url_set: "~/api/ordinary_staff/set?",
				url_upload: "~/api/ordinary_staff/upload?",
				list_employee_gender: ['男','女'],

				rules: {
					"employee_name": [ ],
					"employee_gender": [ ],
					"employee_job_number": [ {required: true,message: '员工工号不能为空'}, ],
				}

			}
		},
		methods: {

		},
		created() {
		}
	}
</script>
