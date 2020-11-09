<template>
  <div class="login-container">
    <div id="wx_qrcode" />
  </div>
</template>
<script>
export default {
  name: 'Login',
  mounted() {
    window.WwLogin({
      id: 'wx_qrcode', // 登录页面显示二维码的容器id
      appid: 'ww8e61cad8a0be3152', // 企业微信的CorpID，在企业微信管理端查看
      agentid: '1000023', // 授权方的网页应用id，在具体的网页应用中查看
      redirect_uri: encodeURIComponent('http://cs.91renxin.com/auth/login/callback'), // 重定向的地址，需要进行encode
      state: 'vue'
      // href: '', // 自定义样式链接，只支持https协议的资源地址
    })
  }
}
</script>
<style scoped>
        body {
            background-color: rgb(237, 241, 245);
            padding: 100px 0px 0px;
        }
        #wx_qrcode {
            height: 378px;
            width: 378px;
            margin: 0 auto;
            text-align: center;
            background: #ffffff;
            padding: 36px 0 38px;
            border-radius: 4px;
            border: 1px solid #E7E9EB;
            box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.03);
        }
</style>
