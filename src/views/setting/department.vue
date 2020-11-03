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
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { Message } from 'element-ui'

export default {
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
      list: null,
      listLoading: true,
      formInline: {
        user: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
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
    delete(row) {
      console.log(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item {
  margin: 0;
  padding: 0;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #c0f0a7 !important;
}
</style>
