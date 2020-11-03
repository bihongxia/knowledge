<template>
  <el-dialog
    title="分配权限"
    :visible.sync="dialogVisiable"
    @closed="onCancel()"
  >
    <el-main
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.8)"
      element-loading-text="刷新路由，加载中"
    >
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="checkedData"
        :default-checked-keys="checkedData"
        :props="defaultProps"
      />
    </el-main>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="success"
        size="mini"
        @click="onSubmitRoutes"
      >提交</el-button>
      <el-button
        size="mini"
        @click="resetChecked"
      >清空</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { privileges } from '@/api/route_vue'
import { privilegesVue } from '@/api/role'
export default {
  props: {
    privilegesShow: {
      type: Boolean
    },
    editRow: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      dialogVisiable: this.privilegesShow,
      data: [],
      checkedData: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    privilegesShow(evl, o) {
      this.dialogVisiable = evl
    },
    editRow(evl) {
      evl ? this.getTreeData() : ''
    }
  },
  mounted() {
    // this.getTreeData()
  },
  methods: {
    getTreeData() {
      this.loading = true
      privileges({ role: this.editRow.id })
        .then(response => {
          this.loading = false
          this.data = response.data.list
          this.checkedData = response.data.checked
        })
        .catch(() => {
          console.log('添加失败')
          this.loading = false
        })
    },
    onCancel() {
      this.dialogVisiable = false
      this.$emit('closePrivilegesDialog', false)
    },
    onSubmitRoutes() {
      this.loading = true
      const data = {
        route: this.$refs.tree
          .getHalfCheckedKeys()
          .concat(this.$refs.tree.getCheckedKeys()),
        role: this.editRow.id
      }
      if (!this.editRow.id) return
      privilegesVue(data)
        .then(response => {
          this.loading = false
          this.onCancel()
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        })
        .catch(() => {
          console.log('添加失败')
          this.loading = false
        })
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
<style scoped>
.dialog-footer {
  text-align: left;
}
.el-main {
  padding: 0px;
  overflow: hidden;
}
</style>
