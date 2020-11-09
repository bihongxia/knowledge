<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
      <el-tree
        ref="tree"
        v-loading="loading"
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        element-loading-text="加载中"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="success"
              size="mini"
              round
              plain
              @click="() => append(data)"
            >
              添加部门
            </el-button>
            <el-button
              type="primary"
              size="mini"
              round
              plain
              @click="assign(data)"
            >
              分配角色
            </el-button>
            <el-button
              type="danger"
              size="mini"
              round
              plain
              disabled
            >
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </el-card>
    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-select v-model="value" placeholder="请选择角色">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-table
              ref="multipleTable"
              v-loading="listLoading"
              :data="tableData"
              border
              tooltip-effect="dark"
              style="width: 100%"
              element-loading-text="获取部门成员"
            >
              <el-table-column
                type="selection"
                width="55"
              />
              <el-table-column
                prop="name"
                label="姓名"
              />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let id = 1000
import { list, getUsers } from '@/api/department'
import { getRolelist } from '@/api/role'
export default {
  data() {
    return {
      filterText: '',
      loading: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      newName: '',
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      options: [{
        value: '选项1',
        label: '管理员'
      }, {
        value: '选项2',
        label: '普通用户'
      }],
      value: '',
      tableData: [],
      multipleSelection: [],
      listLoading: false

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getDepartment()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getDepartment() {
      this.loading = true
      list({ params: 1 }).then((response) => {
        this.treeData = response.data
        this.loading = false
      }).catch(() => {
        console.log('添加失败')
        this.loading = false
      })
    },
    append(data) {
      this.$prompt('请输入部门名称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\u4e00-\u9fa5]/g,
        inputErrorMessage: '部门名称不正确'
      }).then(({ value }) => {
        const newChild = { id: id++, name: value, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    assign(data) {
      this.dialogFormVisible = true
      this.listLoading = true
      getUsers(data).then(response => {
        this.listLoading = false
        this.tableData = response.data
      })
    },
    getRoles() {
      getRolelist({ limit: 1000 }).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    Role(data) {
      this.$prompt('选择角色', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\u4e00-\u9fa5]/g,
        inputErrorMessage: '部门名称不正确'
      }).then(({ value }) => {
        const newChild = { id: id++, name: value, children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    }
  }
}
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-button{
    padding: 5px 12px ;
  }
</style>
