import { resetPassword } from '@/api/login'
import {addDict, deleteDict, getDictList} from "@/api/dict";
import Pagination from "@/components/Pagination/index.vue";
import {FormRules} from "element-plus";
import {getMenuTree} from "@/api/menu";
import {getCheckedMenuIds, getRoleList} from "@/api/role";

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
            roleList: null,
            listQuery: {
                page: 1,
                limit: 20,
                },
            dialogVisible: false,
            dialogStatus: '',
            textMap: {
                editRole: '编辑角色'
            },
            temp: {
                value: null,
            },
            rules: FormRules = {
            },
            menuListTree: null,
            checkedMenuIds: [],
        }
    },

    methods:{
        handleDelete(row){
            deleteDict({dictionaryId: row.dictionaryId}).then(res => {
                this.getList()
            })
        },
        handleEdit(row){
            this.dialogVisible = true
            this.dialogStatus = 'editRole'
            getCheckedMenuIds(row).then(res => {
                this.checkedMenuIds = res.data
            })
            this.temp = Object.assign({}, row)

        },
        handleSearch(){
            this.getList()
        },
        handleCreate(){
            this.dialogVisible = true
            this.dialogStatus = 'addRole'
        },
        handleCommit() {
        },
        handleCheckChange(data, checkData) {
            var roleIds = this.$refs.tree.getCheckedKeys()
            this.temp.roleIdList = roleIds
            console.log(this.temp.roleIdList)
        },
        getList() {
            getRoleList(this.listQuery).then(res => {
                this.roleList = res.data.list
                console.log(this.roleList)
            })
        },
        getMenuTree() {
            getMenuTree().then(res => {
                this.menuListTree = res.data
            })
        }


    },
    created() {
        this.getList()
        this.getMenuTree()
    }
}