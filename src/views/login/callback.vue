<template>
  <div>正在登录</div>
</template>
<script>
import { wxLogin } from '@/api/user'
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
    this.wxLogin()
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
    },
    wxLogin() {
      console.log(this.$route.query)
      wxLogin({ userCode: this.$route.query }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>
