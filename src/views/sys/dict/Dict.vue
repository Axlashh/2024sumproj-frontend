gti<template>
  <div class="common-layout">
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
          <el-input
              placeholder="字典值"
              style="width:15%;margin-bottom:20px;margin-left: 30%"
              v-model="listQuery.value">
              clearable
          </el-input>

          <el-select
              v-model="listQuery.type"
              clearable
              placeholder="类型"
              style="width: 15%;margin-bottom:20px;margin-left: 30px"
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
              style="width:15%;margin-bottom:20px;margin-left: 2.5%"
              @click.native.prevent="handleSearch"
          >
            {{ '搜索' }}
          </el-button>

          <el-button
              :loading="loading"
              type="primary"
              style="width:15%;margin-bottom:20px;margin-left: 2.5%"
              @click="handleCreate"
          >
            {{ '添加' }}
          </el-button>
        </div>


        <el-table :data="dictionaryList" style="width: 100%" stripe height="250">
          <el-table-column :label="'序号'" fixed prop="id" align="center" width="50">
            <template v-slot:default="scope">
              <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value" label="值" width="400" />
          <el-table-column prop="type" label="类型"/>
          <el-table-column prop="code" label="字典码" width="300"/>
          <el-table-column prop="order_num" label="排序" width="180"/>
          <el-table-column fixed="right" label="7" width="200">
            <template v-slot:default="{row,$index}">
              <el-button type="primary" size="small" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button type="primary" size="small" @click="handleEdit">
                Edit
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
            v-show="total>1"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
        />

        <el-dialog :title="textMap[dialogStatus]" v-model="dialogVisible">
          <div v-if="dialogStatus === 'addDict'">
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="right"
                label-width="110px"
                style="width: 100%; margin-left:40px;margin-top: 40px"
            >
              <el-form-item :label="'字典码'" prop="code">
                <el-input
                    v-model="temp.code"
                    style="width: 60%"
                    placeholder="字典码"/>
              </el-form-item>
              <el-form-item :label="'字典值'" prop="value">
                <el-input
                    v-model="temp.value"
                    style="width: 60%"
                    placeholder="字典值"/>
              </el-form-item>
              <el-form-item :label="'类型'" prop="type">
                <el-input
                    v-model="temp.type"
                    style="width: 60%"
                    placeholder="类型"/>
              </el-form-item>
              <el-form-item :label="'排序'" prop="orderNum">
                <el-input
                    v-model="temp.orderNum"
                    style="width: 60%"
                    placeholder="排序"/>
              </el-form-item>
              <el-form-item :label="'备注'" prop="remark">
                <el-input
                    v-model="temp.remark"
                    style="width: 60%"
                    placeholder="备注"/>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleCommit">
            提交
          </el-button>
          <el-button @click="dialogVisible = false">
            返回
          </el-button>
        </span>
          </div>
        </el-dialog>

      </el-main>
    </el-container>
  </div>
</template>

<script>
import Dict from './index.js'
export default Dict

</script>
