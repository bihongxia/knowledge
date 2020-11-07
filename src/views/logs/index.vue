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
          <el-form-item label="内容">
            <el-input
              v-model="formInline.data"
              placeholder="内容"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
            >查询</el-button>
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
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180"
        />
        <el-table-column
          prop="admin_name"
          label="操作人"
          width="180"
        />
        <el-table-column
          prop="created_at"
          label="操作时间"
          width="180"
        />
        <el-table-column
          prop="data"
          label="操作内容"
          width="180"
        />
        <el-table-column
          prop="route"
          label="操作路由"
          width="180"
        />
        <el-table-column
          prop="request_data"
          label="请求参数"
          width="180"
          height="50"
        />
        <el-table-column
          prop="request_type"
          label="请求类型"
          width="180"
        />
      </el-table>
      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      /> -->
    </el-card>
  </div></template>

<script>
import { getLogsList } from '@/api/logs'
// import Pagination from '@/components/Pagination'

export default {
  name: 'Logs',
  // components: Pagination,
  data() {
    return {
      formInline: {
        data: ''
      },
      dialogFormVisible: false,
      listLoading: true,
      list: null,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  onSearch() {
    console.log(this.dialogFormVisible)
  },
  created() {
    this.getList()
    console.log(this.data)
  },
  methods: {
    getList() {
      this.listLoading = true
      getLogsList(this.listQuery).then(response => {
        // console.log(response)
        this.list = response.data.list
        // this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
