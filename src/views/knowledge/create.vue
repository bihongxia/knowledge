<template>
  <el-container >
    <el-aside width="210px">
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
      <el-header>
        <div class="h-title">新增文档</div>
      </el-header>
      <el-main>
        <el-form ref="form" :model="sizeForm" label-width="80px">
          <el-form-item label="主题">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="创建者">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择时间">
                <el-date-picker type="date" placeholder="选择时间" v-model="sizeForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者">
                <el-input v-model="sizeForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文档分类">
                <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="内容简要">
            <el-text v-model="sizeForm.name"></el-text>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
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
    background-color: rgb(238, 241, 246);
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
        search: '',
        sizeForm: {
          name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        }
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
