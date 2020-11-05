<template>
  <el-container >
    <knowledge-bar @getList="getList" @dirSearch="dirSearch"></knowledge-bar>
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
        <el-table :data="tableData" v-loading="loading">
          <el-table-column label="名称" width="140">
            <template slot-scope="scope">
              <div  style="cursor: pointer" @click="getList(scope.row.cate_id,scope.row.id)" v-if="scope.row.is_dir">
                <i class="el-icon-folder" v-show="scope.row.is_dir" ></i>
                <span style="margin-left: 10px;">{{ scope.row.filename }}</span>
              </div>
              <div  style="cursor: pointer" @click="findDoc(scope.row.id)" v-else>
                <i class="el-icon-document" v-show="scope.row"></i>
                <span style="margin-left: 10px;">{{ scope.row.filename }}</span>
              </div>

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
          <el-table-column prop="updated_user" label="更新者">
          </el-table-column>
          <el-table-column prop="create_user" label="作者">
          </el-table-column>
          <el-table-column prop="review_user" label="复核人">
          </el-table-column>
          <el-table-column prop="size" label="大小">
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row class="page">
          <el-col :span="2" :offset="1">
          </el-col>
          <el-col :span="20">
            <el-pagination background @current-change="pagination" @size-change="sizeChange" :current-page.sync="current_page" :page-sizes="[10,20,25,50]" layout="total,sizes,prev, pager, next" :page-size.sync="pageSize" :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';
  import CURD from '@/minix/curd';
  import { getList,getHotTitles } from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools"

  export default {
    name: 'knowledge_index',
    components: { knowledgeBar },
    mixins: [CURD],
    //数据获取
    created() {
      this.fetchData({cate_id : 0});
    },
    data() {
      return {
        tableData: [],
        curd: {
          getList: getList || function () {},
          getHotTitles: getHotTitles || function () {},
        }
      }
    },
    methods:{
      getList(cate_id, fid) {
        this.fetchData({cate_id : cate_id, fid: fid});
      },
      dirSearch(filename){
        //向后台发送请求获取数据；
        let params = { keywords: filename };
        this.curd.getHotTitles(params)
          .then(response => {
            //成功执行内容
            this.tableData = response.data;
          })
      },
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
      },

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
