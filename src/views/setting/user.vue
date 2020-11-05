<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="text">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="mini"
        >
          <el-form-item label="用户名">
            <el-input
              v-model="formInline.user"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSearch"
            >查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="addUser"
            >添加用户</el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getList"
            >刷新列表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        tooltip-effect="dark"
        :data="list"
        element-loading-text="Loading"
        border
        highlight-current-row
        size="mini"
      >
        <el-table-column
          type="selection"
          align="center"
          label="#"
          width="65"
        />
        <!-- <el-table-column
          align="center"
          label="序号"
          width="65"
        >
          <template slot-scope="scope">
            {{ scope.$index+1+(listQuery.page-1)*listQuery.limit }}
          </template>
        </el-table-column>-->
        <el-table-column
          width="120"
          label="登录名"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.email"
              class="el-icon-message"
            />
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="状态"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status===1?'启用':'禁用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="注册时间"
          align="center"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.createdAt"
              class="el-icon-time"
            />
            {{ scope.row.createdAt }}
          </template>
        </el-table-column>
        <el-table-column
          label="最后登录时间"
          align="center"
        >
          <template slot-scope="scope">
            <i
              v-if="scope.row.lastLoginAt"
              class="el-icon-time"
            />
            {{ scope.row.lastLoginAt }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="148"
        >
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              plain
              round
              @click="deleteRow(scope.row)"
            >删除</el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              round
              @click="edit(scope.row)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>
    <add-user
      :edit-row="editRow"
      :dialog-form-visible="dialogFormVisible"
      @childClose="childClose"
    />
  </div>
</template>
<script>
import AddUser from './components/addUserDialog'
import Pagination from '@/components/Pagination'
import { getUserlist, del } from '@/api/user'
import { Message } from 'element-ui'

export default {
  name: 'User',
  components: { AddUser, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      formInline: {
        user: ''
      },
      dialogFormVisible: false,
      listLoading: true,
      total: 0,
      list: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      editRow: {
        name: '',
        roles: []
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSearch() {
      console.log(this.dialogFormVisible)
    },
    addUser() {
      this.dialogFormVisible = true
      this.editRow = null
    },
    // 编辑角色
    edit(row) {
      this.dialogFormVisible = true
      this.editRow = row
    },
    // 删除角色
    deleteRow(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          del({ uuid: row.uuid })
            .then(response => {
              Message({
                type: 'success',
                message: response.msg
              })
              this.getList()
            })
            .catch(() => {
              this.listLoading = false
            })
        })
        .catch(() => {})
    },
    childClose(close) {
      this.dialogFormVisible = close
    },
    getList() {
      this.listLoading = true
      getUserlist(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    delete(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin: 3;
  padding: 0;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #c0f0a7 !important;
}
</style>
