<template>
  <div class="app-container">
    <div class="filter-container" style="float: right">

      <el-select
          v-model="typeValue"
          clearable
          placeholder="MDT团队名"
          class="filter-item"
      >
        <el-option
            v-for="item in type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-model="item.label"
        />
      </el-select>

      <el-input
          placeholder="患者姓名"
          clearable
          filterable
          resize="none"
          class="filter-item"
          v-model="textarea">
        clearable
      </el-input>

      <el-date-picker
          v-model="timeLimit"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="预约开始日期"
          end-placeholder="预约结束日期"
          style="width: auto"
          class="filter-item"
          @change="handleFilter"
      />

      <el-button
          :loading="loading"
          type="primary"
          class="filter-item"
          @click.native.prevent="handleSerch"
      >
        {{ '搜索' }}
      </el-button>

      <el-button
          :loading="loading"
          type="primary"
          class="filter-item"
          @click="handleCreat"
      >
        {{ '添加' }}
      </el-button>
    </div>

    <el-table
        :data="tableData"
        v-loading="listLoading"
        style="width: 100%"
        highlight-current-row
    >
      <el-table-column :label="'序号'" fixed prop="id" align="center" width="50">
        <template v-slot:default="scope">
          <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'患者姓名'" fixed width="120" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'MDT团队'" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'申请医生姓名'" fixed="right" width="120" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'会议开始时间'" fixed="right" width="120" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'会议结束时间'" fixed="right" width="120" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" fixed="right" width="120" align="center">
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

  </div>
</template>

<script>
// @ is an alias to /src
import MDTRecord from './index.js'
export default MDTRecord

</script>
