import { resetPassword } from '@/api/login'
import {addDict, deleteDict, getDictList} from "@/api/dict";
import Pagination from "@/components/Pagination/index.vue";
import {FormRules} from "element-plus";

export default {
    components: {Pagination},
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            type:[
                {label:'无',value:1},
            ],
            pageIndex: null,
            pageSize: null,
            total: null,
            dictionaryList: [],
            listQuery: {
                page: 1,
                limit: 20,
                },
            dialogVisible: false,
            dialogStatus: '',
            textMap: {
                addDict: '添加字典值'
            },
            temp: {
                value: null,
            },
            rules: FormRules = {
                value: [{
                    required: true,
                    message: '请选择患者',
                    trigger: 'blur'
                }],
                code: [{
                    required: true,
                    message: '请选择患者',
                    trigger: 'blur'
                }],
                type: [{
                    required: true,
                    message: '请选择患者',
                    trigger: 'blur'
                }],
            },
            }
        },

    methods:{
        handleDelete(row){
            deleteDict({dictionaryId: row.dictionaryId}).then(res => {
                this.getList()
            })
        },
        handleEdit(){

        },
        handleSearch(){
            getDictList(this.listQuery).then(res => {
                this.dictionaryList = res.data.list
                this.total = parseInt(res.data.total)
                this.pageIndex = parseInt(res.data.page)
                this.pageSize = parseInt(res.data.limit)
            })
        },
        handleCreate(){
            this.dialogVisible = true
            this.dialogStatus = 'addDict'
        },
        handleCommit() {
            addDict(this.temp).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    this.getList()
                }
            })
        },
        getList() {
            getDictList(this.listQuery).then(res => {
                this.dictionaryList = res.data.list
                this.total = parseInt(res.data.total)
                this.pageIndex = parseInt(res.data.page)
                this.pageSize = parseInt(res.data.limit)
            })
        }

    },
    created() {
        this.getList()
    }
}