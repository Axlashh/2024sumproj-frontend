gti<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main>

        <div>
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


        <el-table :data="roleList" style="width: 100%" stripe height="250">
          <el-table-column :label="'序号'" fixed prop="id" align="center" width="50">
            <template v-slot:default="scope">
              <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="排序" width="180"/>
          <el-table-column prop="remark" label="备注"/>
          <el-table-column fixed="right" label="操作" width="200">
            <template v-slot:default="{row,$index}">
              <el-button type="primary" size="small" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button type="primary" size="small" @click="handleEdit(row)">
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
          <div v-if="dialogStatus === 'editRole'">
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="right"
                label-width="110px"
                style="width: 100%; margin-left:40px;margin-top: 40px"
            >
              <el-form-item :label="'角色名'" prop="roleName">
                <el-input
                    v-model="temp.roleName"
                    style="width: 60%"
                    placeholder="角色名"/>
              </el-form-item>
              <el-form-item :label="'备注'" prop="remark">
                <el-input
                    v-model="temp.remark"
                    style="width: 60%"
                    placeholder="备注"/>
              </el-form-item>
              <el-form-item :label="'菜单列表'" prop="menuList">
                <el-tree
                    ref="tree"
                    :data="menuListTree"
                    node-key="menuId"
                    :expand-on-click-node="false"
                    :check-on-click-node="true"
                    :props="{id:'menuId', label:'name', children:'children'}"
                    :highlight-current="true"
                    :show-checkbox="true"
                    :check-strictly="false"
                    :default-checked-keys="checkedMenuIds"
                    @check="handleCheckChange" />
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
import Role from './index.js'
export default Role

</script>
