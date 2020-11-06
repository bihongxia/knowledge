<template>
  <el-container >
    <knowledge-bar @getList="getList" @dirSearch="dirSearch"></knowledge-bar>
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
    name: article,
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
