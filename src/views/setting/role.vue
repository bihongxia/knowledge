<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="text">
        <el-button
          type="primary"
          size="mini"
          @click="addUser"
        >添加角色</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="getList"
        >刷新列表</el-button>
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
        <!-- <el-table-column
          type="selection"
          align="center"
          label="#"
          width="65"
        />-->
        <!-- <el-table-column align="center" label="序号" width="65">
          <template
            slot-scope="scope"
          >{{ (scope.$index + 1 + (listQuery.page - 1) * listQuery.limit) }}</template>
        </el-table-column>-->
        <el-table-column
          align="center"
          label="序号"
          width="65"
        >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          label="角色名"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          label="展示名"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.displayName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          class-name="status-col"
          label="状态"
          width="110"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="248"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              size="mini"
              plain
              round
              @click="handlePrivileges(scope.row)"
            >分配权限</el-button>
            <el-button
              type="primary"
              size="mini"
              plain
              round
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
              plain
              round
              @click="deleteRow(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </el-card>
    <add-role
      :dialog-form-visible="dialogFormVisible"
      :edit-row="editRow"
      @childClose="childClose"
    />
    <Privileges
      :privileges-show="privilegesShow"
      :edit-row="editRow"
      @closePrivilegesDialog="closePrivilegesDialog"
    />
  </div>
</template>
<script>
import AddRole from './components/addRoleDialog'
import Privileges from './components/privilegesDialog'
import Pagination from '@/components/Pagination'
import { getRolelist, del } from '@/api/role'
import { showSuccessMessage } from '@/utils/message'

export default {
  name: 'Role',
  components: { AddRole, Privileges, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
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
      privilegesShow: false,
      total: 0,
      list: null,
      listQuery: {
        page: 1,
        limit: 10
      },
      listLoading: true,
      editRow: {
        name: '',
        displayName: '',
        status: '1'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addUser() {
      this.dialogFormVisible = true
      this.editRow = null
    },
    childClose(close) {
      this.dialogFormVisible = close
    },
    closePrivilegesDialog() {
      this.privilegesShow = false
    },
    getList() {
      this.listLoading = true
      getRolelist(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 分配权限
    handlePrivileges(row) {
      this.privilegesShow = true
      this.editRow = row
    },
    // 编辑角色
    edit(row) {
      this.dialogFormVisible = true
      this.editRow = row
    },
    // 删除角色
    deleteRow(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.listLoading = true
          del({ id: row.id }).then(response => {
            showSuccessMessage(response.msg)
            this.getList()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin: 0;
  padding: 0;
}
</style>
