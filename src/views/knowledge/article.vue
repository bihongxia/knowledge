<template>
  <el-container>
    <knowledge-bar @getList="getList" @dirSearch="dirSearch" @getLatelyAll="getLatelyAll" />
    <div class="container">
      <div class="left">
        <h2 class="title">{{ article.title }}</h2>
        <div style="text-align: center;">
          <span class="text">作者：{{ article.author }}</span>
          <span class="text">发布时间：{{ article.created_at }}</span>
        </div>
        <div class="line" />
        <div v-html="article.content" />
      </div>
      <div class="right">
        <h4>文章附件  <i class="el-icon-link" size="mini" /></h4>
        <hr style="border:1px solid #f2f2f2">
        <div v-for="item in article.file_list" style="margin-top: 30px; font-size:15px;">
          <span style="margin-right:20px; display:inline-block;width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; font-weight: bold;">{{ item.real_name }}</span>
          <span style="display: inline-block;margin-right: 20px; color: red; ">{{ item.size }}</span>
          <a :href="item.path" :download="item.real_name" target="_blank" style="margin-right: 20px;"><el-button icon="el-icon-download" size="mini" round type="primary" /></a>
          <el-button type="danger" class="el-icon-view" size="mini" round />
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import knowledgeBar from '@/views/components/knowledgeBar'
import CURD from '@/minix/curd'
import pdf from 'vue-pdf'
import { findArticle, download, getList, getLatelyAll, getHotTitles } from '@/api/knowledge'
import { Tools } from '@/views/utils/Tools'

export default {
  components: { knowledgeBar, pdf },
  mixins: [CURD],
  data() {
    return {
      tools: Tools,
      article: [],
      tableData: [],
      curd: {
        findArticle: findArticle || function() {},
        download: download || function() {},
        getLatelyAll: getLatelyAll || function() {},
        getHotTitles: getHotTitles || function() {}
      }
    }
  },
  // 数据获取
  created() {
    this.curd.findArticle(this.$route.params)
      .then(res => {
        this.article = res.data
      })
  },
  // watch: {
  //   $route: {
  //     handler(){
  //       let type = this.$route.query.type ? this.$route.query.type : 1;
  //       let cate_id = this.$route.query.cate_id ? this.$route.query.cate_id : 0;
  //       let fid = this.$route.query.fid;
  //       let keywords = this.$route.query.keywords;
  //       //非最近浏览
  //       if(type==1){
  //         this.fetchData({cate_id : cate_id, fid: fid});
  //         this.form.cate_id = cate_id;
  //         //最近浏览
  //       }else if (type==0){
  //         this.curd.getLatelyAll().
  //         then(res => {
  //           this.tableData = res.data;
  //         }).catch(err => {
  //           this.tools.error(this, err.response.data);
  //         })
  //       }else if(type ==2) {
  //         //向后台发送请求获取数据；
  //         let params = { keywords: keywords };
  //         this.curd.getHotTitles(params)
  //           .then(response => {
  //             //成功执行内容
  //             this.tableData = response.data;
  //           })
  //       }
  //     }
  //   }
  // },
  methods: {
    getList(cate_id, fid) {
      this.$router.push({
        path: '/knowledge',
        query: {
          cate_id: cate_id,
          fid: fid,
          type: 1
        }
      })
    },
    dirSearch(filename) {
      this.$router.push({
        path: '/knowledge',
        query: {
          keywords: filename,
          type: 2
        }
      })
    },
    getLatelyAll() {
      this.$router.push({
        path: '/knowledge',
        query: {
          type: 0
        }
      })
    },
    download(file) {
      this.curd.download({ 'file_name': file })
        .then(res => {
          return res
        })
    }
  }
}
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
    width: 70%;
    height: 100%;
    padding:20px 30px;
    background-color: #f6f7f9;
    border-right: 1px solid #d3dce6;
  }
  .right{
    width:30%;
    padding:30px;
    float: left;
    background: #fff;
  }
  .container{
    width:100%;
    background: #f6f7f9
  }
  .line{
    height:20px;
    border-top: 1px solid #ccc;
    margin-top:20px;
  }
  .text{
    padding:15px;
    color: #99a9bf;
    font-size: 14px;
  }
</style>
