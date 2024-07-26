import { resetPassword } from '@/api/login'

export default {
    name:'HomeView',
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            tableData: [],
            timeLimit: null,
            loading: false,
            listLoading: false,
            listQuery: {
                page: 1,
                limit: 20,
                groupName: undefined,
                patientName: undefined,
                type: 0
            },
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
        handleSerch(){

        },
        handleCreat(){

        },
        handleFilter() {
            console.log(this.timeLimit)
        },

        getSortClass: function(key) {
            const sort = this.listQuery.sort
            return sort === `+${key}` ? 'ascending' : 'descending'
        },

    }
}