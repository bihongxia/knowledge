<template>
  <el-aside width="210px;">
    <el-autocomplete
      v-model="searchName"
      prefix-icon="el-icon-search"
      class="inline-input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
      @select="handleSelect"
    />
    <el-menu>
      <template slot="">
        <el-menu-item @click="getFileList(0)"><i class="el-icon-user" />我的文件</el-menu-item>
        <el-menu-item @click="getLatelyAll"><i class="el-icon-time" />最近浏览</el-menu-item>
      </template>
      <el-submenu index="">
        <template slot="title">文档分类</template>
        <template>
          <el-menu-item v-for="cate in cateList" :key="cate.id" @click="getFileList(cate.id)"><i class="el-icon-s-opportunity" />{{ cate.name }}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { getCateList, getHotTitles } from '@/api/knowledge'
import { Tools } from '@/views/utils/Tools'
import CURD from '@/minix/curd'

export default {
  name: 'KnowledgeBar',
  data() {
    return {
      searchName: '',
      cateList: [],
      docTitles: [],
      tools: Tools,
      curd: {
        getCateList: getCateList || function() {},
        getHotTitles: getHotTitles || function() {}
      },

      mixins: [CURD]
    }
  },
  // 数据获取
  created() {
    this.fetchCateData()
  },
  mounted() {
  },
  methods: {
    getLatelyAll() {
      this.$emit('getLatelyAll')
    },
    getFileList(cate_id) {
      this.$emit('getList', cate_id)
    },
    fetchCateData() {
      this.curd.getCateList()
        .then(response => {
          const result = response.data
          this.cateList = result
        })
        .catch(err => {
          this.tools.error(this, err.response.data)
        })
    },
    querySearchAsync(queryString, callback) {
      if (queryString && queryString.length >= 1) {
        let list = [{}]
        const params = { keywords: queryString, type: 1 }
        this.curd.getHotTitles(params)
          .then(response => {
            for (const i of response.data) {
              i.value = i.filename // 将想要展示的数据作为value
            }
            list = response.data
            // 调用 callback 返回建议列表的数据
            callback(list)
          })
      }
    },
    // 搜索
    handleSelect(item) {
      console.log(item.filename)
      this.$emit('dirSearch', item.filename)
    }
  }
}
</script>

<style scoped>
  .el-aside {
    color: #333;
    background-color: rgb(238, 241, 246);
    padding: 5px 10px;
  }
  .el-autocomplete{
    padding:5px 0;
  }
</style>
