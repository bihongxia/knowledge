<template>
  <el-container >
    <knowledge-bar @getList="getList" @dirSearch="dirSearch" @getLatelyAll="getLatelyAll"></knowledge-bar>
    <el-container>
      <el-header style="height: 110px;">
        <div class="h-title">
          我的文件
        </div>
        <el-row class="todo-title">
            <el-col :span="1">
              <i class="el-icon-back char-margin" @click="goBack"></i>
            </el-col>
            <el-col :span="1">
              <i class="el-icon-right char-margin" @click="goFoward"></i>
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
          <el-table-column label="名称">
            <template slot-scope="scope">
              <div  style="cursor: pointer" v-if="scope.row.is_dir==1" @click="getList(scope.row.category_id,scope.row.id)">
                <i class="el-icon-folder"></i>
                <span style="margin-left: 10px;">{{ scope.row.title }}</span>
              </div>
              <div  style="cursor: pointer" v-else>
                <router-link :to="'knowledge/article/'+scope.row.id">
                  <i class="el-icon-document"></i>
                  <span style="margin-left: 10px;">{{ scope.row.title }}</span>
                </router-link>
              </div>

            </template>
          </el-table-column>
          <el-table-column label="最近更新">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updated_user" label="更新者">
          </el-table-column>
          <el-table-column label="作者">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-show="!scope.row.is_dir">{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column label="复核人">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-show="!scope.row.is_dir">{{ scope.row.review_user }}</span>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="120" >
            <template slot-scope="scope" v-if="!scope.row.is_dir">
              <i class="el-icon-success" v-if="scope.row.status=='3'" ></i>
              <i class="el-icon-time" v-else  @click="check(scope.row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row class="page">
          <el-col :span="2" :offset="1">
          </el-col>
          <el-col :span="20">
            <el-pagination background
                           @current-change="pagination"
                           @size-change="sizeChange"
                           :current-page.sync="current_page"
                           :page-sizes="[10,20,25,50]"
                           layout="sizes,prev, pager, next"
                           :page-size.sync="pageSize"
                           :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog title="新建文件夹" :visible.sync="createDialogVisible" width="20%" :close-on-click-modal="false" @close="cancel();return true;">
      <el-form :model="form" label-width="80px">
        <el-row class="first-row">
          <el-col :span="21" class="first-column" >
            <el-form-item label="文件夹">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveFile()" size="">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';
  import CURD from '@/minix/curd';
  import { getList, getHotTitles, postFile, checkArticle, getLatelyAll} from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools"

  export default {
    name: 'knowledge_index',
    components: { knowledgeBar },
    mixins: [CURD],
    //数据获取
    created() {
      let type = this.$route.query.type ? this.$route.query.type : 1;
      let cate_id = this.$route.query.cate_id ? this.$route.query.cate_id : 0;
      let fid = this.$route.query.fid;
      let keywords = this.$route.query.keywords;
      //非最近浏览
      if(type==1){
        this.fetchData({cate_id : cate_id, fid: fid});
        this.form.cate_id = cate_id;
        //最近浏览
      }else if (type==0){
        this.curd.getLatelyAll().
        then(res => {
          this.tableData = res.data;
        }).catch(err => {
          this.tools.error(this, err.response.data);
        })
      }else if(type ==2) {
        //向后台发送请求获取数据；
        let params = { keywords: keywords };
        this.curd.getHotTitles(params)
          .then(response => {
            //成功执行内容
            this.tableData = response.data;
          })
      }
        // this.fetchData({cate_id : 0});
    },
    data() {
      return {
        tableData: [],
        createDialogVisible: false,
        curd: {
          getList: getList || function () {},
          getHotTitles: getHotTitles || function () {},
          addFile: postFile || function () {},
          checkArticle: checkArticle || function () {},
          getLatelyAll: getLatelyAll || function () {},
        },
        tools: Tools,
        form: {
          type : 1,
          cate_id : 0,
          name : '',
        }
      }
    },
    watch: {
      $route: {
        handler(){
          let type = this.$route.query.type ? this.$route.query.type : 1;
          let cate_id = this.$route.query.cate_id ? this.$route.query.cate_id : 0;
          let fid = this.$route.query.fid;
          let keywords = this.$route.query.keywords;

          //非最近浏览
          if(type==1){
            this.fetchData({cate_id : cate_id, fid: fid});
            this.form.cate_id = cate_id;
            //最近浏览
          }else if (type==0){
            this.curd.getLatelyAll().
            then(res => {
              this.tableData = res.data;
            }).catch(err => {
              this.tools.error(this, err.response.data);
            })
          }else if(type ==2) {
            //向后台发送请求获取数据；
            let params = { keywords: keywords };
            this.curd.getHotTitles(params)
              .then(response => {
                //成功执行内容
                this.tableData = response.data;
              })
          }
        }
      }
    },
    methods:{
      getList(cate_id, fid) {
        this.$router.push({
          path:'/knowledge',
          query: {
            cate_id: cate_id,
            fid: fid,
            type:1
          }
        })
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
      getLatelyAll(){
        this.$router.push({
          path:'/knowledge',
          query: {
            type:0
          }
        })
      },

      goBack(){
        this.$router.back();
      },
      goFoward(){
        this.$router.go(1);
      },
      cancel(){
        this.createDialogVisible = false;
      },

      createFolder(){
        this.createDialogVisible = true;
      },
      saveFile(){
        this.createDialogVisible = false;
        this.curd.addFile(this.form)
          .then(response => {
            this.tools.success(this, "文件夹添加成功");
            this.fetchData({cate_id : this.form.cate_id});
          })
          .catch(err => {
            this.tools.error(this, err.response.data);
          });
      },
      createDoc(){
        //this.$router.replace('/knowledge/create');
        this.$router.push({
          path:'/knowledge/create',
          query: {
            aid: this.$route.query.fid
          }
        })
      },
      //复核
      check(id) {
        this.curd.checkArticle({'id': id})
          .then(response => {
            this.tools.success(this, "复核成功");
            this.fetchData({cate_id : this.form.cate_id});
        })
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
