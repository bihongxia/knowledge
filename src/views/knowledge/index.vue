<template>
  <el-container >
    <knowledge-bar></knowledge-bar>
    <el-container>
      <el-header style="height: 110px;">
        <div class="h-title">
          我的文件
        </div>
        <el-row class="todo-title">
            <el-col :span="1">
              <i class="el-icon-back char-margin" @back="goBack"></i>
            </el-col>
            <el-col :span="1">
              <i class="el-icon-right char-margin" @back="goBack"></i>
            </el-col>
            <el-col :span="1">
              <div class="char-margin divide">|</div>
            </el-col>
            <el-col :span="18">
              <div class="char-margin light-color" style="font-size: 14px;">我的文件</div>
            </el-col>
            <el-col :span="3">
              <el-dropdown trigger="click">
                <el-button size="small " type="primary" class="el-dropdown-link btn-margin">新建</el-button>
                <el-dropdown-menu slot="dropdown" >
                  <div @click="createFolder()"><el-dropdown-item><i class="el-icon-folder"></i>新建文件夹</el-dropdown-item></div>
                  <div  @click="createDoc()"><el-dropdown-item><i class="el-icon-document"></i>新建文档</el-dropdown-item></div>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column label="名称" width="140">
            <template slot-scope="scope">
              <i class="el-icon-folder" v-show="scope.row.file_type=='file_folder'"></i>
              <i class="el-icon-document" v-show="scope.row.file_type=='file'"></i>
              <span style="margin-left: 10px">{{ scope.row.file_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <i class="el-icon-success" v-if="scope.row.status=='1'"></i>
              <i class="el-icon-upload" v-else></i>
            </template>
          </el-table-column>
          <el-table-column label="最近更新">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updated_at }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="user" label="更新者">
          </el-table-column>
          <el-table-column prop="file_size" label="大小">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';

  export default {
    components: { knowledgeBar },
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
        this.$router.replace('/knowledge/create');
      }
    }
  };
</script>
<style scoped>
  .el-header {
    color: #333;
    border-bottom:2px solid #ccc;
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
