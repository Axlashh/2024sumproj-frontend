<template>
  <div class="app-container">
    <div class="filter-container" style="float: right">

      <el-select
          v-model="listQuery.mdtGroupId"
          clearable
          placeholder="MDT团队名"
          class="filter-item"
          @change="getRecordList"
      >
        <el-option
            v-for="item in mdtGroupList"
            :key="item.mdtGroupId"
            :label="item.name"
            :value="item.mdtGroupId"
        />
      </el-select>

      <el-input
          placeholder="患者姓名"
          clearable
          filterable
          resize="none"
          class="filter-item"
          v-model="listQuery.patientName"
          @change="getRecordList"
      >
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
          @change="getRecordList"
      />

      <el-button
          :loading="loading"
          type="primary"
          class="filter-item"
          @click.native.prevent="getRecordList"
      >
        {{ '搜索' }}
      </el-button>

      <el-button
          :loading="loading"
          type="primary"
          class="filter-item"
          @click="handleAppointment"
      >
        {{ 'MDT申请' }}
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
      <el-table-column :label="'患者姓名'" fixed width="200" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'MDT团队'" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.mdtGroupName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'申请医生姓名'" fixed="right" width="200" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.applyDoctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'会议开始时间'" fixed="right" width="200" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'会议结束时间'" fixed="right" width="200" align="center">
        <template v-slot:default="{row}">
          <span>{{ row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'操作'" fixed="right" width="200" align="center">
        <template #default>
          <el-button link type="primary" size="small" @click="handleDelete">
            资料管理
          </el-button>
          <el-button link type="primary" size="small" @click="handleDelete">
            诊疗详情
          </el-button>
          <el-button link type="primary" size="small" @click="handleDelete">
            人员详情
          </el-button>
          <el-button link type="primary" size="small" @click="handleDelete">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>1"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getRecordList"
    />

    <el-dialog :title="textMap[dialogStatus]" v-model="dialogVisible">
      <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="right"
          label-width="110px"
          style="width: 100%; margin-left:40px;margin-top: 40px"
          >

        <el-col span="12">
        <el-form-item :label="'患者'" v-if="dialogStatus === 'appointment'" prop="patientId">
          <el-select
            v-model="temp.patientId"
            clearable
            class="form-item"
            placeholder="患者">
            <el-option
              v-for="item in patientList"
              :key="item.patientId"
              :label="item.name"
              :value="item.patientId"/>
          </el-select>
        </el-form-item>
          <el-form-item :label="'MDT团队'" v-if="dialogStatus === 'appointment'" prop="mdtGroupId">
          <el-select
              v-model="temp.mdtGroupId"
              clearable
              class="form-item"
              placeholder="MDT团队">
            <el-option
                v-for="item in mdtGroupList"
                :key="item.mdtGroupId"
                :label="item.name"
                :value="item.mdtGroupId"/>
          </el-select>
          </el-form-item>
          <el-form-item :label="'申请原因'" v-if="dialogStatus === 'appointment'" prop="appointmentReason">
          <el-input
            v-model="temp.appointmentReason"
            placeholder="申请原因"
            class="form-item"
            type="textarea"/>
          </el-form-item>
          </el-col>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus === 'appointment'" type="primary" @click="handleAppointmentForm">
          确定
        </el-button>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import MDTRecord from './index.js'
export default MDTRecord

</script>

<style>
.dialog-footer {
  display: flex;
  justify-content: flex-end; /* Aligns buttons to the right */
  gap: 10px; /* Adds space between the buttons */
}

.form-item {
  width: 70%;
  margin-bottom: 20px;
}

.el-form-item {
  position: relative;
}

.custom-error-message {
  position: absolute;
  left: 0;
  bottom: 0;
  color: #f56c6c;
  font-size: 12px;
  padding: 0 12px;
}
</style>
