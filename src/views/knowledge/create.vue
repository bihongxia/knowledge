<template>
  <el-container >
    <knowledge-bar></knowledge-bar>
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
            <el-col :span="12">
              <el-form-item label="创建者">
                <el-input v-model="createForm.create_user"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择时间">
                <el-date-picker
                  v-model="createForm.created_at"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作者">
                <el-input v-model="createForm.create_user"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门">
                <el-select v-model="createForm.department_id" placeholder="请选择部门">
                  <el-option v-for="department in departments" label="department.name" value="department.id" :key="department.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="文档分类">
                <el-select v-model="createForm.cate_id" placeholder="请选择文档分类">
                  <el-option v-for="cate in cates" label="cate.name" value="cate.id" :key="cate.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="内容简要">
            <el-input type="textarea" v-model="createForm.desc"></el-input>
            <div>
              <tinymce v-model="createForm.content" :height="300" />
            </div>
          </el-form-item>
          <el-form-item label="文档附件">
            <el-upload
              class="upload-demo"
              accept="pdf,word,excel"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-upload="beforeUploadFile"
              multiple
              :limit="3"
              :auto-upload="true"
              :file-list="createForm.fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传pdf/word文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题图片">
            <el-button type="primary" icon="el-icon-upload"  @click="toggleShow" size="small">请上传标题图片</el-button>
            <my-upload field="img" @crop-success="cropSuccess" v-model="createForm.image" :width="100" :height="100" img-format="jpg" :size="size" v-show="createForm.show"></my-upload>
            <img :src="avatar">
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
              <el-radio v-model="createForm.radio3" label="1" border size="medium">共享</el-radio>
              <el-radio v-model="createForm.radio3" label="2" border size="medium">私密</el-radio>
              <div>
                <el-select
                  v-show="createForm.radio3 == '2'"
                  v-model="value"
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
              <el-radio v-model="createForm.radio4" label="1" border size="medium">浏览</el-radio>
              <el-radio v-model="createForm.radio4" label="2" border size="medium">下载</el-radio>
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
  import { Tools } from "@/views/utils/Tools";
  import { getCateAndDepat,fileDelete } from "@/api/knowledge"

  export default {
    components: { Tinymce, myUpload,knowledgeBar },
    created(){
      //获取部门、分类
      this.curd.getCateAndDepat()
        .then(response => {
          let result = response.data;
          this.departments = result.departments;
          this.cates = result.cates;
        })
        .catch(err => {
          this.tools.error(this, err.response.data);
        })
    },
    data() {
      return {
        curd:{
          getCateAndDepat: getCateAndDepat || function () {},
          fileDelete: fileDelete || function () {}
        },
        departments: [], //部门
        cates: [], //文档分类
        tableData: [],
        search: '',
        //上传附件相关
        createForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          content:'',
          avatar: "",  //用于存储剪切完图片的base64Data和显示回调图片
          show: false,  //剪切框显示和隐藏的flag
          fileList: [], //文件上传列表
          radio3: '1',
          radio4: '1',
          selectAuth: [],
        },
        authDialog: false,
        options: [],
        value: [],
        list: [],
        loading: false,
        size: '',
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]
      }
    },
    methods:{
      goBack(){

      },
      goFoward(){

      },
      createDoc(){

      },
      //控制剪切框的显示和隐藏
      toggleShow() {
        this.createForm.show = !this.createForm.show;
      },
      //剪切成功后的回调函数
      cropSuccess(imgDataUrl) {
        //  imgDataUrl其实就是图片的base64data码
        this.avatar = imgDataUrl;
        console.log(imgDataUrl)//这里打印出来的是base64格式的资源
      },
      //----附件上传的钩子从这里开始----
      handleRemove(file) {
        let fileNames = file.response.data.split("/");
        this.curd.fileDelete(fileNames[fileNames.length - 1]).then(res => {
          if (res.data.code == "0000") {
            this.fileList.splice(file, 1);
          }
        });
      },
      beforeUploadFile(file) {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
          this.$message.error('上传文件大小不能超过10MB!')
          return false
        }
        // if (!isText && !isTextComputer) {
        //   this.$message.error('上传文件类型必须为excel!')
        //   return false
        // }
      },
      handleSuccess(file){
        this.createForm.fileList.push({});
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
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `label:${item}` };
      });
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
