<template>
  <div class="common-layout">
    <el-container>
      <el-header>表</el-header>
      <el-container>
        <el-aside width="200px">左</el-aside>
        <el-main>
          <el-table :data="tableData" style="width: 100%" stripe height="250">
            <el-table-column prop="date" label="1" width="180" />
            <el-table-column prop="name" label="2" width="180" />
            <el-table-column prop="address" label="3" />
            <el-table-column fixed="right" label="4" width="120">
              <template #default>
                <el-button link type="primary" size="small" @click="handleDelete">
                  删除
                </el-button>
                <el-button link type="primary" size="small">
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
