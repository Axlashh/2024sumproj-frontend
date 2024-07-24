<template>
  <div class="common-layout">
    <el-container>
      <el-header><h1>MDT管理</h1></el-header>
      <div style="border-bottom:5px solid"></div>
      <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>

          <div>
            <el-input
                type="textarea"
                :rows="2"
                placeholder="字典值"
                style="width:15%;margin-bottom:20px;margin-left: 30%"
                v-model="textarea">
              clearable
            </el-input>

            <el-select
                v-model="typeValue"
                clearable
                placeholder="类型"
                style="width: 15%;margin-bottom:20px;margin-left: 30px;margin-top: 10px"
            >
              <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  v-model="item.label"
              />
            </el-select>

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
              {{ '添加' }}
            </el-button>
          </div>

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
import MDTRecord from './index.js'
export default MDTRecord

</script>
