<template>
  <el-aside width="210px;">
    <el-input v-model="search" placeholder="搜索" prefix-icon="el-icon-search"></el-input>
    <el-menu>
      <template slot="">
        <el-menu-item index=""><i class="el-icon-time"></i>最近浏览</el-menu-item>
        <el-menu-item index=""><i class="el-icon-user"></i>我的文件</el-menu-item>
      </template>
      <el-submenu index="">
        <template slot="title">共享空间</template>
        <template>
          <el-menu-item index=""><i class="el-icon-s-opportunity"></i>选项1</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
    export default {
      name: "knowledgeBar",
      data() {
        return {
          search: ''
        }
      },
    }
</script>

<style scoped>
  .el-aside {
    color: #333;
    background-color: rgb(238, 241, 246);
    padding: 5px 10px;
  }
  .el-input{
    padding:5px 0;
  }
</style>
