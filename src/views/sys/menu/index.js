import { resetPassword } from '@/api/login'
import {addDict, deleteDict, getDictList} from "@/api/dict";
import Pagination from "@/components/Pagination/index.vue";
import {FormRules} from "element-plus";
import {addMenu, deleteMenu, getMenuList, updateMenu} from "@/api/menu";

export default {
    components: {Pagination},
    data(){
        return {
            input: '',
            textarea: '',
            typeValue: '',
            typeList: [
                {value: 0, label: '目录'},
                {value: 1, label: '页面'},
                {value: 2, label: '按钮'}
            ],
            pageIndex: null,
            pageSize: null,
            total: null,
            menuList: [],
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
            rules: FormRules = {},
        }
    },

    methods:{
        handleDelete(row){
            deleteMenu({menuId: row.menuId}).then(res => {
                this.getList()
            })
        },
        handleEdit(row){
            this.temp = Object.assign({}, row)
            this.dialogVisible = true;
            this.dialogStatus = 'editRow'
        },
        handleSearch(){
            this.getList()
        },
        handleCreate(){
            this.dialogVisible = true
            this.dialogStatus = 'addMenu'
            this.temp = {}
        },
        handleCommit() {
            addMenu(this.temp).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    this.getList()
                }
            })
        },
        handleUpdate() {
            updateMenu(this.temp).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    this.getList()
                }
            })
        },
        getList() {
            console.log(this.listQuery)
            getMenuList(this.listQuery).then(res => {
                this.menuList = res.data.list
                this.total = parseInt(res.data.total)
                this.pageIndex = parseInt(res.data.page)
                this.pageSize = parseInt(res.data.limit)
            })
        }

    },
    created() {
        this.getList()
    },
    computed: {
        // 根据 type 值查找对应的标签
        typeLabel() {
            return (typeValue) => {
                const type = this.typeList.find(item => item.value === typeValue);
                return type ? type.label : '未知';
            };
        }
    }
}