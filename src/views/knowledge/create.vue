<template>
  <el-container >
    <knowledge-bar @getList="getList" @dirSearch="dirSearch" @getLatelyAll="getLatelyAll"></knowledge-bar>
    <el-container>
      <el-header>
        <div class="h-title">新增文档</div>
      </el-header>
      <el-main>
        <el-form ref="form" :model="createForm" label-width="80px">
          <el-form-item label="主题">
            <el-input v-model="createForm.title"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="5">
              <el-form-item label="作者">
                <el-input v-model="createForm.create_user"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="createForm.created_at"
                  type="datetime"
                  placeholder="发布时间"
                  default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="文档分类">
                <el-select v-model="createForm.cate_id" placeholder="请选择文档分类" :disabled="this.$route.query.cate_id!=0">
                  <el-option v-for="cate in cates" :label="cate.name" :value="cate.id" :key="cate.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          </el-row>
          <el-form-item label="内容简要">
            <el-input type="textarea" v-model="createForm.desc"></el-input>
            <div>
              <tinymce v-model="createForm.content" :height="300" />
            </div>
          </el-form-item>
          <el-form-item label="文档附件">
            <attach-upload :fileList="createForm.fileList"></attach-upload>
          </el-form-item>
          <el-form-item label="标题图片">
            <el-button type="primary" icon="el-icon-upload"  @click="toggleShow" size="small">请上传标题图片</el-button>
            <my-upload field="img" @crop-success="cropSuccess" v-model="show" :width="100" :height="100" img-format="jpg" :size="size"></my-upload>
            <img :src="createForm._src">
          </el-form-item>
          <el-form-item label="权限设置">
            <el-button type="primary" plain @click="authDialog = true">权限</el-button>
          </el-form-item>

          <el-dialog
            title="提示"
            :visible.sync="authDialog"
            width="30%"
            :before-close="handleClose">
            <el-form-item label="访问权限">
              <el-radio v-model="createForm.permissions.visit" label="1" border size="medium">共享</el-radio>
              <el-radio v-model="createForm.permissions.visit" label="2" border size="medium">私密</el-radio>
              <div>
                <el-select
                  v-show="createForm.permissions.visit == '2'"
                  v-model="createForm.permissions.names"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入允许访问的人员名字"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="读写权限">
              <el-radio v-model="createForm.permissions.todo" label="1" border size="medium">浏览</el-radio>
              <el-radio v-model="createForm.permissions.todo" label="2" border size="medium">下载</el-radio>
            </el-form-item>
            <span slot="footer" class="dialog-footer">
              <el-button @click="authDialog = false">取 消</el-button>
              <el-button type="primary" @click="authDialog = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Tinymce from '@/components/Tinymce';
  import 'babel-polyfill';
  import myUpload from 'vue-image-crop-upload';
  import knowledgeBar from '@/views/components/knowledgeBar';
  import attachUpload from '@/views/components/attachUpload';
  import { Tools } from "@/views/utils/Tools";
  import CURD from '@/minix/curd';
  import { getList, getCateList, getLatelyAll, fileDelete, postArticle, getAuth, uploadFile, getHotTitles } from "@/api/knowledge"

  export default {
    components: { Tinymce, myUpload, knowledgeBar, attachUpload },
    //数据获取
    created() {
      //获取分类
      this.curd.getCateList()
        .then(response => {
          this.cates = response.data;
        })
        this.curd.getAuth()
        .then(response => {
          let states = [];
          let list = [];
          for(let i in response.data){
            let item = response.data[i].userid;
            states[i] = response.data[i].userid;
            list[i] = {value: `value:${item}`, label: `name:${item}`}
          }
          this.states = states;
          this.list = list;
        })
      console.log(this.createForm.cate_id);
    },
    data() {
      return {
        tools: Tools,
        mixins: [CURD],
        curd:{
          getCateList: getCateList || function () {},
          fileDelete: fileDelete || function () {},
          postArticle: postArticle || function () {},
          getAuth: getAuth || function () {},
          getList: getList || function () {},
          getLatelyAll: getLatelyAll || function () {},
          uploadFile: uploadFile || function () {},
          getHotTitles: getHotTitles || function () {},
        },
        departments: [], //部门
        cates: [], //文档分类
        tableData: [],
        search: '',
        //上传附件相关
        createForm: {
          type: 2,
          title:'',
          create_user: '',
          created_at: '',
          cate_id: this.$route.query.cate_id != 0 ? Number(this.$route.query.cate_id) : '',
          pid: this.$route.query.aid,
          desc: '',
          content:'',
          fileList: [],
          avatar: '',
          _src: "",  //用于存储剪切完图片的base64Data和显示回调图片
          permissions:{
            visit : '1',
            todo: '1',
            names: ''
          },
        },
        authDialog: false,
        options: [],
        value: [],
        list: [],
        loading: false,
        size: '',
        show: false,  //剪切框显示和隐藏的flag
        states: []
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
        this.$router.push({
          path:'/knowledge',
          query: {
            keywords: filename,
            type:2
          }
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
      //控制剪切框的显示和隐藏
      toggleShow() {
        this.show = !this.show;
      },
      //剪切成功后的回调函数
      cropSuccess(imgDataUrl) {
        //  imgDataUrl其实就是图片的base64data码
        this.createForm._src = imgDataUrl;
        let fd = new FormData();
        fd.append('file',imgDataUrl);//传文件
        this.curd.uploadFile(fd)
          .then(response => {
            this.createForm.avatar =  response.data.fid
          })
        console.log(imgDataUrl)//这里打印出来的是base64格式的资源
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      onSubmit(){
        this.curd.postArticle(this.createForm)
          .then(response => {
            this.tools.success(this, "文件添加成功");
            this.$router.back();
          })
          .catch(err => {
            this.tools.error(this, err.response.data);
          });
      }
    },


  };
</script>

<style>
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
</style>
