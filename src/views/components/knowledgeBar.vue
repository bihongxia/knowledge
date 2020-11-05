<template>
  <el-aside width="210px;">
    <el-autocomplete
      v-model="searchName"
      prefix-icon="el-icon-search"
      class="inline-input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入内容"
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
          <el-menu-item v-for="cate in cateList" :key="cate.id" @click="getFileList(cate.id)"><i class="el-icon-s-opportunity"></i>{{cate.name}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
  import { getCateList,getHotTitles } from "@/api/knowledge";
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
          searchName:'',
          cateList: [],
          docTitles: [],
          tools: Tools,
          curd: {
            getCateList: getCateList || function () {},
            getHotTitles: getHotTitles || function () {},
          },

          mixins: [CURD],
        }
      },
      methods: {
        getFileList(cate_id){
          this.$emit("getList", cate_id);
        },
        fetchCateData() {
          this.curd.getCateList()
            .then(response => {
              let result = response.data;
              this.cateList = result;
            })
            .catch(err => {
              this.tools.error(this, err.response.data);
            })
        },
        querySearchAsync(queryString, callback) {
          if (queryString && queryString.length > 1 ){
            let list = [{}];
            let params = { keywords: queryString, type: 1 };
            this.curd.getHotTitles(params)
              .then(response => {
                for(let i of response.data){
                  i.value = i.filename;  //将想要展示的数据作为value
                }
                list = response.data;
                // 调用 callback 返回建议列表的数据
                callback(list);
              })
          }
        },
        //搜索
        handleSelect(item) {
          console.log(item.filename);
          this.$emit("dirSearch", item.filename);
        },
      },
      mounted() {
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
