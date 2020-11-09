<template>
  <div v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在登录" />
</template>
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      loginForm: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  created() {
    this.wxLogin()
  },
  methods: {
    getInfo() {
      console.log(this.$route.query.userCode)
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        console.log(111)
        // this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    wxLogin() {
      this.fullscreenLoading = true
      this.$store.dispatch('user/wxLogin', this.$route.query.userCode).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.fullscreenLoading = false
      }).catch(() => {
        this.fullscreenLoading = false
      })
    }
  }
}
</script>
