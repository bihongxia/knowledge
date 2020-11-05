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
        :filter-node-method="filterNode"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        element-loading-text="加载中"
      />
    </el-card>
  </div>
</template>
<script>
import { list } from '@/api/department'
export default {

  data() {
    return {
      filterText: '',
      loading: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
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
    }
  }
}
</script>
