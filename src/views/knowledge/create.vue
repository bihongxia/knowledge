<template>
  <el-container >
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
    <el-container>
      <el-header style="height: 110px;">
        <div class="h-title">
          我的文件
        </div>
      </el-header>
      <el-main>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
  .el-header {
    color: #333;
    border-bottom:2px solid #ccc;
  }
  .el-aside {
    color: #333;
    padding: 5px 10px;
  }
  .el-input{
    padding:5px 0;
  }
  .h-title{
    height:60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    font-weight: bold;
  }
  .char-margin{
    margin: 14px;
  }
  .btn-margin{
    margin: 8px;
  }
  .divide{
    color: #ccc;
    text-align: center;
  }
  .light-color{
    color: #acacac;
  }
</style>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      const tableData = [
        {
          file_name: '文件夹',
          file_type: 'file_folder',
          status: '1',
          updated_at: '2020-10-20',
          user: '毕宏霞',
          file_size: '3M',
        },
        {
          file_name: '文档',
          file_type: 'file',
          status: '0',
          updated_at: '2020-10-20',
          user: '毕宏霞',
          file_size: '3M',
        }
      ];
      return {
        tableData: tableData,
        search: ''
      }
    },
    methods:{
      goBack(){

      },
      goFoward(){

      },
      createFolder(){
        this.tableData.unshift({
          file_name: '',
          file_type: 'file_folder',
          status: '0',
          updated_at: '刚刚',
          user: '毕宏霞',
          file_size: '--',
        });
      },
      createDoc(){

      }
    }
  };
</script>
