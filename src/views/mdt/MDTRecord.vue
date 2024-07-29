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
        <template v-slot:default="{row,$index}">
          <el-button type="primary" class="handle-button" size="small" @click="fileManage(row,$index)">
            资料管理
          </el-button>
          <el-button type="primary" class="handle-button" size="small" @click="handleDelete">
            诊疗详情
          </el-button>
          <el-button type="primary" class="handle-button" size="small" @click="handleDelete">
            人员详情
          </el-button>
          <el-button type="primary" class="handle-button" size="small" @click="handleMeetingAppointment(row,$index)">
            会议预约
          </el-button>
          <el-button type="danger" class="handle-button" size="small" @click="handleDelete">
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
      <div v-if="dialogStatus === 'appointment'">
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
      </div>
      <div v-if="dialogStatus === 'fileManage'">
        <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            @click="handleAddFile"
        >
          添加文件
        </el-button>
        <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            @click="handleSynFile"
        >
          同步文件
        </el-button>
        <el-table
            :data="fileList"
            v-loading="listLoading"
            style="width: 100%"
            highlight-current-row
        >
          <el-table-column :label="'文件名称'" width="110" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.fileName }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'文件类型'" width="140" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.fileType | fileTypeFilter}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'文件描述'">
            <template v-slot:default="{row}">
              <span>{{ row.fileDesc }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'操作'" fixed="right">

          </el-table-column>
        </el-table>
      </div>
      <div v-if="dialogStatus === 'addFile'">
        <el-form
            :rules="rules"
            :model="temp"
            label-position="right"
        >
          <el-form-item label="文件名称" prop="fileName">
            <el-input
                v-model="temp.fileName"
                :placeholder="'文件名称'"
            />
          </el-form-item>
          <el-form-item label="文件类型" prop="fileType">
            <el-select
                v-model="temp.fileType"
                placeholder="文件类型"
                clearable
                filterable
            >
              <el-option v-for="item in fileTypeOptions" :key="item.code" :label="item.value" :value="item.code"/>
            </el-select>
          </el-form-item>
          <el-form-item label="文件描述" prop="fileDesc">
            <el-input
                v-model="temp.fileDesc"
                :placeholder="'文件描述'"
            />
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCommitFile">
            提交
          </el-button>
          <el-button @click="dialogStatus = 'fileManage'">
            返回
          </el-button>
        </span>
      </div>
      <div v-if="dialogStatus === 'synFile'">
        <el-table
            :data="patientFileList"
            v-loading="listLoading"
            style="width: 100%"
            highlight-current-row
        >
        <el-table-column :label="'文件名称'" width="110" align="center">
          <template v-slot:default="{row}">
            <span>{{ row.fileName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'文件类型'" width="140" align="center">
          <template v-slot:default="{row}">
            <span>{{ row.fileType | fileTypeFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'文件描述'">
          <template v-slot:default="{row}">
            <span>{{ row.fileDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'操作'" fixed="right">
          <el-button v-slot:default="{row}" v-if="row.isSyn === false" type="primary" @click="synOneFile(row)">
            同步文件
          </el-button>
          <el-button v-slot:default="{row}" v-if="row.isSyn === true" type="primary" disabled>
            已同步
          </el-button>
        </el-table-column>
        </el-table>
      </div>
      <div v-if="dialogStatus === 'meetingAppointment'">
        <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="right"
            label-width="110px"
            style="width: 100%; margin-left:10px;margin-top: 40px"
        >
          <el-form-item label="预约状态">
            <el-text v-if="appointment" class="mx-1">可预约</el-text>
            <el-text v-if="!appointment" class="mx-1">不可预约，有已预约的会议仍未结束</el-text>
          </el-form-item>
          <el-form-item v-if="appointment === true" label="预约时间">
            <el-date-picker
                v-model="appointmentTimeLimit"
                type="datetimerange"
                value-format="YYYY-MM-DD hh:mm:ss"
                range-separator="至"
                start-placeholder="预约开始日期"
                end-placeholder="预约结束日期"
            />
          </el-form-item>
        </el-form>
        <el-table
            :data="mdtMeetingList"
            v-loading="listLoading"
            style="width: 100%"
            highlight-current-row
            >
          <el-table-column :label="'会议开始时间'" width="140" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.startTime}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'会议结束时间'" width="140" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'会议记录'" width="140" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.meetingMinutes ? row.meetingMinutes : '无' }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'疗效反馈'" width="140" align="center">
            <template v-slot:default="{row}">
              <span>{{ row.treatmentFeedback ? row.treatmentFeedback : '无' }}</span>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button v-if="appointment" type="primary" @click="handleMeetingTimeAppointment">
            预约
          </el-button>
          <el-button @click="dialogVisible = false">
            返回
          </el-button>
        </span>
      </div>
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

.handle-button {
  margin-bottom: 5px;
  width: 40%
}
</style>
