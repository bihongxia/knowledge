<template>
  <el-container >
    <knowledge-bar></knowledge-bar>
    <div class="container">
      <div class="left">
        <h2 class="title">{{article.title}}</h2>
        <div style="text-align: center">
          <span>作者：{{article.author}}</span>
          <span>创建时间：{{article.created_at}}</span>
        </div>
        <div v-html="article.content"></div>
      </div>
      <div class="right">
        <h4>文章附件  <i class="el-icon-link" size="mini" ></i></h4>
        <hr style="border:1px solid #f2f2f2">
        <div v-for="item in article.file_list" style="margin-top: 30px">
          <span style="margin-right:30px; display:inline-block;width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item.real_name}}</span>
          <span style="display: inline-block;margin-right: 30px;">{{item.size}}M</span>
          <a :href="item.path" :download="item.real_name" target="_blank" style="margin-right: 30px;"><i class="el-icon-download" size="mini" ></i></a>
          <i class="el-icon-view" size="mini" ></i>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';
  import CURD from '@/minix/curd';
  import { findArticle, download } from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools"

  export default {
    components: { knowledgeBar },
    mixins: [CURD],
    //数据获取
    created() {
      this.curd.findArticle(this.$route.params)
        .then(res => {
           this.article = res.data;
        })
    },
    data() {
      return {
        tools: Tools,
        article: [],
        curd: {
          findArticle: findArticle || function () {},
          download: download || function () {},
        },
      }
    },
    methods:{
      getList(cate_id, fid) {
        this.fetchData({cate_id : cate_id, fid: fid});
        this.form.cate_id = cate_id;
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
      download(file){
        this.curd.download({'file_name': file})
          .then(res => {
              return res;
          })
      }
    }
  };
</script>
<style scoped>
  .title{
    width: 100%;
    height:50px;
    line-height: 50px;
    text-align: center;
  }
  .left{
    float: left;
    width: 1000px;
    height: 100%;
    padding:20px 30px;
    background-color: #f6f7f9;
  }
  .right{
    padding:30px;
    overflow:hidden;
    border-radius: 30px;
    background: #fff;
    height:900px;
  }
  .container{
    width:100%;
    background: #f6f7f9
  }
</style>
