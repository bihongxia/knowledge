<template>
  <el-aside width="210px;">
    <el-autocomplete
      prefix-icon="el-icon-search"
      class="inline-input"
      v-model="searchForm"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <el-menu>
      <template slot="">
        <el-menu-item @click="getFileList(0)"><i class="el-icon-user"></i>我的文件</el-menu-item>
        <el-menu-item @click="getFileList(-1)"><i class="el-icon-time"></i>最近浏览</el-menu-item>
      </template>
      <el-submenu index="">
        <template slot="title">文档分类</template>
        <template>
          <el-menu-item v-for="cate in cateList" @click="getFileList(cate.id)"><i class="el-icon-s-opportunity"></i>{{cate.name}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  import { getCateList } from "@/api/knowledge";
  import { Tools } from "@/views/utils/Tools";
  import CURD from '@/minix/curd';

  export default {
      name: "knowledgeBar",
      //数据获取
      created() {
        this.fetchCateData();
      },
      data() {
        return {
          cateList: [],
          searchForm: '',
          docTitles: [],
          tools: Tools,
          getCateList: getCateList || function () {},
          mixins: [CURD],
        }
      },
      methods: {
        getFileList(cate_id){
          this.$emit("getList", cate_id);
        },
        fetchCateData() {
          this.getCateList()
            .then(response => {
              let result = response.data;
              this.cateList = result;
            })
            .catch(err => {
              this.tools.error(this, err.response.data);
            })
        },
        querySearch(queryString, cb) {
          var docTitles = this.docTitles;
          var results = queryString ? docTitles.filter(this.createFilter(queryString)) : docTitles;
          // 调用 callback 返回建议列表的数据
          cb(results);
        },
        createFilter(queryString) {
          return (docTitles) => {
            return (docTitles.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          };
        },
        loadAll() {
          return [
            { "value": "三全鲜食（北新泾店）", "id": "1" },
            { "value": "Hot honey 首尔炸鸡（仙霞路）", "id": "2" },
            { "value": "新旺角茶餐厅", "id": "3" },
            { "value": "泷千家(天山西路店)", "id": "4" },
            { "value": "胖仙女纸杯蛋糕（上海凌空店）", "id": "5" },
            { "value": "贡茶", "id": "6" },
            { "value": "豪大大香鸡排超级奶爸", "id": "7" },
            { "value": "茶芝兰（奶茶，手抓饼）", "id": "8" },
            { "value": "十二泷町", "id": "9" },
            { "value": "星移浓缩咖啡", "id": "10" },
          ];
        },
        //搜索
        handleSelect(item) {
          this.$emit("getFile", item.id);
        }
      },
      mounted() {
        this.docTitles = this.loadAll();
      }
    }
</script>

<style scoped>
  .el-aside {
    color: #333;
    background-color: rgb(238, 241, 246);
    padding: 5px 10px;
  }
  .el-autocomplete{
    padding:5px 0;
  }
</style>
