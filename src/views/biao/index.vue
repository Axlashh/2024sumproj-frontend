<template>
  <div class="common-layout">
    <el-container>
      <el-header>表</el-header>
      <el-container>
        <el-aside width="200px">左</el-aside>
        <el-main>

          <el-input
              type="textarea"
              :rows="2"
              placeholder="字典值"
              style="width:47.5%;margin-bottom:30px;margin-left: 0%"
              v-model="textarea">
          </el-input>

          <el-select
              v-model="typeValue"
              clearable
              placeholder="类型"
              style="width: 480px;margin-bottom:18px;margin-left: 30px;margin-top: 10px"
          >
            <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-model="item.label"
            />
          </el-select>


          <el-table :data="tableData" style="width: 100%" stripe height="250">
            <el-table-column prop="date" label="1" width="180" />
            <el-table-column prop="name" label="2" width="180" />
            <el-table-column prop="address" label="3" />
            <el-table-column fixed="right" label="4" width="120">
              <template #default>
                <el-button link type="primary" size="small" @click="handleDelete">
                  删除
                </el-button>
                <el-button link type="primary" size="small" @click="handleEdit">
                  Edit
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
import tempbiao from './tempbiao.js'

export default tempbiao

</script>
