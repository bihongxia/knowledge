<template>
  <el-upload
    class="upload-demo"
    action="string"
    :before-upload="beforeUploadFile"
    :http-request="handleChange"
    :limit="3"
    :on-remove="handleRemove"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传pdf/word文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
  import { uploadFile,fileDelete } from "@/api/knowledge"
  export default {
      name: "attachUpload",
      props: {
          fileList: Array,
      },
      data(){
        return{
          curd:{
            uploadFile: uploadFile || function () {},
            fileDelete: fileDelete || function () {}
          },
        }
      },
      methods: {
        beforeUploadFile(file) {
          let type = file.name.substring(file.name.lastIndexOf('.')+1);
          // if(type != 'sheet' || type != 'pdf' || type != 'word' || type != 'ppt'){
          //   this.$message.warning("上传文件格式不正确")
          // }
          if(file.size/1024/1024>10){
            this.$message.warning("文件大小不得超过10M");
          }
        },
        handleChange(param){
          let fd = new FormData();
          fd.append('file',param.file);//传文件
          this.curd.uploadFile(fd)
            .then(response => {
              this.fileList.push(
                {
                  name:response.data.storage.split('/').reverse()[0],
                  url:response.data.url
                }
              );
            })
        },
        handleRemove(targetFile) {
          //console.log(file, this.fileList);
          this.fileList.filter(function (file) {
            return file.url == targetFile.url;
          })
          // let fileNames = file.response.data.split("/");
          // this.curd.fileDelete(fileNames[fileNames.length - 1]).then(res => {
          //   if (res.data.code == "0000") {
          //     this.fileList.splice(file, 1);
          //   }
          // });
        },

      }
    }
</script>

<style scoped>

</style>
