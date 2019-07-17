<template>
  <div class="login">
    <h2>Login</h2>
    <div class="input-form-wrapper">
      <el-input type="text" placeholder="Username" v-model="username"/>
    </div>
    <div class="input-form-wrapper">
      <el-input type="password" placeholder="Password" v-model="password"/>
    </div>
    <el-button @click="login">Login</el-button>
    <p>You don't have an account?
      <router-link to="/signup">Create account now!!</router-link>
    </p>
  </div>
</template>

<script>
import {AUTH_REQUEST} from '@/store/actions/auth'

export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login: function () {
      const { username, password } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push(this.$route.query.redirect || '/')
      }).catch(error => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.input-form-wrapper {
  margin: 20px auto;
  width: 320px;
}
</style>
