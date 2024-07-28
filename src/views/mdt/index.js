import { resetPassword } from '@/api/login'
import Pagination from "@/components/Pagination/index.vue";
import {
    appointmentApply,
    commitFile,
    getFileList,
    getMdtGroupList, getMdtMeetingList,
    getMdtRecordList,
    getPatientFile, meetingTimeCommit,
    synOneFile
} from "@/api/mdt";
import {ElMessage, FormRules} from "element-plus";
import {getPatientList} from "@/api/user";

export default {
    name:'HomeView',
    components: {Pagination},
    filters: {
        fileTypeFilter(type) {
            return this.fileTypeOptions[type] || 'Unknown File Type';
        },
        timeFilter(dateTime) {
            return "¥" + dateTime.toString();
        }
    },
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            tableData: [],
            timeLimit: null,
            appointmentTimeLimit: null,
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

                fileName: null,
                fileType: null,
                fileDesc: null,
            },
            dialogVisible: false,
            dialogStatus: '',
            textMap: {
                appointment: 'MDT申请',
                fileManage: '资料管理',
                addFile: '添加文件',
                meetingAppointment: '会议预约',
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
            fileList: [],
            fileTypeOptions: [],
            patientFileList: [],
            mdtMeetingList: [],
            tempRow: null,
            appointment: false,
            type:[
                {label:'无',value:1},
            ],
        }
    },

    methods:{
        fileManage(row) {
            this.dialogVisible = true
            this.dialogStatus = 'fileManage'
            this.tempRow = Object.assign({}, row)
            getFileList({ mdtFileIds: this.tempRow.mdtFileIds }).then(res => {
                this.fileList = res.data
            })
        },
        handleDelete(){

        },
        handleEdit(){

        },
        handleSearch(){

        },
        handleAppointment(){
            this.dialogVisible = true
            this.dialogStatus = 'appointment'
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
        handleAddFile() {
            this.dialogStatus = 'addFile'
        },
        handleSynFile() {
            this.dialogVisible = true
            this.dialogStatus = 'synFile'
            this.listLoading = true
            getPatientFile({patientId: this.tempRow.patientId, mdtFileIds: this.tempRow.mdtFileIds}).then(res => {
                this.listLoading = false
                this.patientFileList = res.data
            })
        },
        synOneFile(row) {
            synOneFile({mdtFileId: row.mdtFileId, mdtRecordId: this.tempRow.mdtRecordId}).then(res => {
                getPatientFile(this.tempRow)
            })
        },
        handleCommitFile() {
            this.temp.patientId = this.patientId
            commitFile(this.temp).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    ElMessage({
                        message: '文件提交成功'
                    })
                }
            })
        },
        handleMeetingAppointment(row) {
            this.dialogVisible = true
            this.dialogStatus = 'meetingAppointment'
            this.tempRow = Object.assign({}, row)
            getMdtMeetingList({mdtRecordId: row.mdtRecordId}).then(res => {
                this.mdtMeetingList = res.data.mdtMeetingList
                this.appointment = res.data.appointment
            })
        },
        handleMeetingTimeAppointment() {
            meetingTimeCommit({startTime: this.appointmentTimeLimit[0], endTime: this.appointmentTimeLimit[1], mdtRecordId: this.tempRow.mdtRecordId}).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    ElMessage({
                        message: '会议预约成功'
                    })
                }
            })
        }
    },
    created() {
        this.getRecordList()
        this.getPatientList()
        this.getMdtGroupList()
    }
}