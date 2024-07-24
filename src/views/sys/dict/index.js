import { resetPassword } from '@/api/login'

export default {
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
                        id: '序号',
                        value: '字典值',
                        name: '字典名称',
                        type: '字典类型',
                        key: '键',
                        number: '排序',
                    },
                    {
                        id: '1',
                        value: 'XX',
                        name: 'XX',
                        type: 'XX',
                        key: 'XX',
                        number: 'XX',
                    },
                    {
                        id: '2',
                        value: 'XX',
                        name: 'XX',
                        type: 'XX',
                        key: 'XX',
                        number: 'XX',
                    },
                    {
                        id: '3',
                        value: 'XX',
                        name: 'XX',
                        type: 'XX',
                        key: 'XX',
                        number: 'XX',
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