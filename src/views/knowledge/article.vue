<template>
  <el-container >
    <knowledge-bar @getList="getList" @dirSearch="dirSearch"></knowledge-bar>
    <el-container>

    </el-container>
  </el-container>
</template>

<script>
  import knowledgeBar from '@/views/components/knowledgeBar';
  import CURD from '@/minix/curd';
  import { getList,getHotTitles, postFile, checkArticle } from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools"

  export default {
    name: article,
    components: { knowledgeBar },
    mixins: [CURD],
    //数据获取
    created() {
      this.fetchData({cate_id : 0});
    },
    data() {
      return {
        tableData: [],
        createDialogVisible: false,
        curd: {
          findArticle: findArticle || function () {},
        },
      }
    },
    methods:{

      cancel(){
        this.createDialogVisible = false;
      },
      //查看文章
      findDoc(id) {
        this.curd.findArticle()
          .then(res => {

          })
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
