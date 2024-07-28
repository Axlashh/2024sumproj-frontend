<template>
  <div class="common-layout">
    <el-container>
      <el-header><h1>MDT管理</h1></el-header>
      <div style="border-bottom:5px solid"></div>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>

          <div>
            <!--            普通的输入框-->
            <!--            <el-input-->
            <!--                type="input"-->
            <!--                :rows="2"-->
            <!--                placeholder="字典值"-->
            <!--                style="width:15%;margin-bottom:18px;margin-left: 0%"-->
            <!--                v-model="input">-->
            <!--              clearable-->
            <!--            </el-input>-->
            <!--            文本域输入框-->
            <el-select
                v-model="MDTmanageValue"
                clearable
                placeholder="MDT团队名"
                style="width: 15%;margin-bottom:20px;margin-left: 30px;margin-top: 10px"
            >
              <el-option
                  v-for="item in MDTmanage"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-model="item.label"
              />
            </el-select>

            <el-input
                type="textarea"
                :rows="2"
                placeholder="患者姓名"
                style="width:15%;margin-bottom:20px;margin-left: 30%"
                v-model="textarea">
              clearable
            </el-input>

            <el-input
                type="textarea"
                :rows="2"
                placeholder="开始时间至结束时间"
                style="width:15%;margin-bottom:20px;margin-left: 30%"
                v-model="textarea">
              clearable
            </el-input>

            <el-button
                :loading="loading"
                type="primary"
                style="width:15%;margin-bottom:10px;margin-left: 2.5%"
                @click.native.prevent="handleSerch"
            >
              {{ '搜索' }}
            </el-button>

            <el-button
                :loading="loading"
                type="primary"
                style="width:15%;margin-bottom:10px;margin-left: 2.5%"
                @click="handleCreat"
            >
              {{ 'MDT申请' }}
            </el-button>
          </div>

          <el-table :data="tableData" style="width: 100%" stripe height="250">
            <el-table-column prop="id" label="1" width="180" />
            <el-table-column prop="value" label="2" width="180" />
            <el-table-column prop="name" label="3" width="180"/>
            <el-table-column prop="type" label="4" width="180"/>
            <el-table-column prop="key" label="5" width="180"/>
            <el-table-column prop="number" label="6" width="180"/>
            <el-table-column fixed="right" label="7" width="120">
              <template #default>
                <el-button link type="primary" size="small" @click="handleDelete">
                  资料管理
                </el-button>
                <el-button link type="primary" size="small" @click="handleEdit">
                  诊序详情
                </el-button>
                <el-button link type="primary" size="small" @click="handlePeople">
                  人员详情
                </el-button>
                <el-button link type="primary" size="small" @click="handleMeet">
                  会议预约
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MDTmanage from './MDTmanage.js'
export default MDTmanage

</script>
