import { resetPassword } from '@/api/login'

export default {
    data(){
        return{
            input:'',
            textarea:'',
            typeValue:'',
            MDTmanageValue:'',
            type:[
                {label:'无',value:1},
            ],
            MDTmanage:[
                {label:'无',value:1},
            ],
            tableData : [
                {
                    id: '序号',
                    value: '患者姓名',
                    name: 'MDT团队',
                    type: '申请医生姓名',
                    key: '会议开始时间',
                    number: '会议结束时间',
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
        handleMeet(){

        },
        handlePeople(){

        },

    }
}