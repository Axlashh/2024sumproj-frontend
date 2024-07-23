import { resetPassword } from '@/api/login'

export default {
    name:'HomeView',
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            type:[
                {label:'无',value:1},
            ],
            tableData : [
                {
                  date: '序号',
                  name: '患者姓名',
                  address: 'MDT团队',
                },
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ]
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

    }
}