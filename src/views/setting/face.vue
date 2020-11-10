<template>
  <el-container>
    <el-header>
      <div class="h-title">添加人脸</div>
    </el-header>
    <el-main>
      <el-form>
        <el-form-item label="请选择人脸照片">
          <el-button type="primary" icon="el-icon-upload" size="small" @click="toggleShow">请选择人脸照片</el-button>
          <my-upload v-model="show" field="img" :width="100" :height="100" img-format="jpg" :size="size" @crop-success="cropSuccess" />
          <img :src="image">
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  import myUpload from 'vue-image-crop-upload';
  import {  uploadImage } from '@/api/user'

  export default {
      name: "face",
    components: {myUpload},
    data(){
          return{
            size: '',
            show: false,  //剪切框显示和隐藏的flag
            image: "",  //用于存储剪切完图片的base64Data和显示回调图片
          }
      },
      methods: {
        // 控制剪切框的显示和隐藏
        toggleShow() {
          this.show = !this.show
        },
        // 剪切成功后的回调函数
        cropSuccess(imgDataUrl) {
          // imgDataUrl其实就是图片的base64data码
          this.image = imgDataUrl;
          let fd = new FormData();
          fd.append('image',imgDataUrl);//传文件
          uploadImage(fd)
            .then(response => {
              this.$router.back();
            })
        },
      }
    }
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
</style>
