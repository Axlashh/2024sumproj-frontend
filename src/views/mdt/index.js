import { resetPassword } from '@/api/login'
import Pagination from "@/components/Pagination/index.vue";
import {appointmentApply, getMdtGroupList, getMdtRecordList} from "@/api/mdt";
import {ElMessage, FormRules} from "element-plus";
import {getPatientList} from "@/api/user";

export default {
    name:'HomeView',
    components: {Pagination},
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            tableData: [],
            timeLimit: null,
            loading: false,
            total: null,
            pageIndex: null,
            pageSize: null,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                groupName: undefined,
                patientName: undefined,
                type: 0
            },
            temp: {
                patientId: null,
                mdtGroupId: null,
                appointmentReason: '',
            },
            dialogVisible: false,
            dialogStatus: '',
            textMap: {
                appointment: 'MDT申请',
                file: '资料管理',
            },
            rules: FormRules = {
                patientId: [{
                    required: true,
                    message: '请选择患者',
                    trigger: 'blur'
                }],
            },
            patientList: [],
            mdtGroupList: [],
            type:[
                {label:'无',value:1},
            ],
        }
    },

    methods:{
        handleDelete(){

        },
        handleEdit(){

        },
        handleSearch(){

        },
        handleAppointment(){
            this.dialogVisible = true
            this.dialogStatus = 'appointment'
            console.log(this.dialogVisible)
        },
        handleAppointmentForm() {
            this.$refs.dataForm.validate((valid) => {
                console.log(valid)
                if (valid) {
                    appointmentApply(this.temp).then(res => {
                        if (res.code === 20000) {
                            this.dialogVisible = false
                            ElMessage({
                                message: '申请成功，请等待mdt团队秘书与您联系！'
                            })
                        } else {
                            ElMessage({
                                message: '申请失败！'
                            })
                        }
                    }).catch(error => {
                        console.log("999")
                    })
                } else {
                    // 表单验证失败
                    console.log('表单验证失败');
                }
            });


        },
        handleFilter() {
            console.log(this.timeLimit)
        },
        getRecordList() {
            getMdtRecordList(this.listQuery).then(res => {
                this.tableData = res.data.list
                this.total = parseInt(res.data.total)
                this.pageIndex = parseInt(res.data.page)
                this.pageSize = parseInt(res.data.limit)
            }).catch(error => {
                console.log(error)
            })
        },
        getPatientList() {
            getPatientList().then(res => {
                this.patientList = res.data
            })
        },
        getMdtGroupList() {
            getMdtGroupList().then(res => {
                this.mdtGroupList = res.data
            })
        },

        getSortClass: function(key) {
            const sort = this.listQuery.sort
            return sort === `+${key}` ? 'ascending' : 'descending'
        },

    },
    created() {
        this.getRecordList()
        this.getPatientList()
        this.getMdtGroupList()
    }
}