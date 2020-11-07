<template>
  <el-container >
    <knowledge-bar></knowledge-bar>
    <el-container>
      <div>
        
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';
  import CURD from '@/minix/curd';
  import { findArticle } from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools"

  export default {
    components: { knowledgeBar },
    mixins: [CURD],
    //数据获取
    created() {
      this.curd.findArticle()
        .then(res => {
           this.article = res.data;
        })
    },
    data() {
      return {
        article: [],
        curd: {
          findArticle: findArticle || function () {},
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
