<template>
  <div>正在登录</div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      console.log(this.$route.query.userCode)
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>
