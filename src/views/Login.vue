<template>
  <div class="login">
    <h2>Sign in</h2>
    <div class="input-form-wrapper">
      <el-input type="text" placeholder="Username" v-model="username"/>
    </div>
    <div class="input-form-wrapper">
      <el-input type="password" placeholder="Password" v-model="password"/>
    </div>
    <el-button @click="login">Signin</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:8181/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        const token = res.data.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        this.$store.commit('setLogin', true)
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
