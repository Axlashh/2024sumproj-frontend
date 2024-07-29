gti<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-main>

        <div>
          <el-input
              placeholder="菜单名"
              style="width: 10%; margin-bottom: 20px; margin-left: 20%"
              v-model="listQuery.name"
              clearable
          />
          <el-input
              placeholder="菜单路径"
              style="width: 10%; margin-bottom: 20px; margin-left: 30px"
              v-model="listQuery.url"
              clearable
          />
          <el-select
              v-model="listQuery.type"
              clearable
              placeholder="类型"
              style="width: 10%; margin-bottom: 20px; margin-left: 30px"
          >
            <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
          <el-select
              v-model="listQuery.parentName"
              clearable
              placeholder="父菜单名称"
              style="width: 10%; margin-bottom: 20px; margin-left: 30px"
          >
            <el-option
                v-for="item in menuList"
                :key="item.menuId"
                :label="item.name"
                :value="item.menuId"
            />
          </el-select>

          <el-button
              :loading="loading"
              type="primary"
              style="width:10%;margin-bottom:20px;margin-left: 2.5%"
              @click.native.prevent="handleSearch"
          >
            {{ '搜索' }}
          </el-button>

          <el-button
              :loading="loading"
              type="primary"
              style="width:10%;margin-bottom:20px;margin-left: 2.5%"
              @click="handleCreate"
          >
            {{ '添加' }}
          </el-button>
        </div>

        <el-table :data="menuList" style="width: 100%" stripe height="250">
          <el-table-column :label="'序号'" fixed prop="menuId" align="center" width="50">
            <template v-slot:default="scope">
              <span>{{ (pageIndex - 1) * pageSize + scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="菜单名" width="300" />
          <el-table-column prop="parentName" label="父菜单名" width="300" />
          <el-table-column prop="url" label="菜单路径" />
          <el-table-column prop="perms" label="授权" width="300" />
          <el-table-column
              prop="type"
              label="类型"
              width="100"
          >
            <template v-slot:default="{ row }">
              <span>{{ typeLabel(row.type) }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template v-slot:default="{ row }">
              <el-button type="primary" size="small" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button type="primary" size="small" @click="handleEdit(row)">
                编辑
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
          <div v-if="dialogStatus === 'addMenu' || dialogStatus === 'editRow'">
            <el-form
                ref="dataForm"
                :rules="rules"
                :model="temp"
                label-position="right"
                label-width="110px"
                style="width: 100%; margin-left:40px;margin-top: 40px"
            >
              <el-form-item :label="'菜单ID'" prop="menuId">
                <el-input
                    v-model="temp.menuId"
                    placeholder="菜单ID"
                    style="width: 70%;"
                />
              </el-form-item>

              <el-form-item :label="'父菜单'" prop="parentId">
                <el-select
                    v-model="temp.parentId"
                    placeholder="父菜单"
                    style="width: 70%;"
                >
                  <el-option
                      v-for="item in menuList"
                      :key="item.menuId"
                      :label="item.name"
                      :value="item.menuId"
                  />
                </el-select>
              </el-form-item>

              <el-form-item :label="'菜单名'" prop="name">
                <el-input
                    v-model="temp.name"
                    placeholder="菜单名"
                    style="width: 70%;"
                />
              </el-form-item>

              <el-form-item :label="'菜单路径'" prop="url">
                <el-input
                    v-model="temp.url"
                    placeholder="菜单路径"
                    style="width: 70%;"
                />
              </el-form-item>

              <el-form-item :label="'授权'" prop="perms">
                <el-input
                    v-model="temp.perms"
                    placeholder="授权"
                    style="width: 70%;"
                />
              </el-form-item>

              <el-form-item :label="'类型'" prop="type">
                <el-select
                    v-model="temp.type"
                    placeholder="选择类型"
                    style="width: 70%;"
                >
                  <el-option
                      v-for="item in typeList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleCommit" v-if="dialogStatus === 'addMenu'">
                提交
              </el-button>
              <el-button type="primary" @click="handleUpdate" v-if="dialogStatus === 'editRow'">
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
import Menu from './index.js'
export default Menu

</script>
