<template>
  <div class="login">
    <h2>Sign up</h2>
    <div class="input-form-wrapper">
      <el-input
        type="text"
        placeholder="Username"
        v-model="username"
      />
    </div>
    <div class="input-form-wrapper">
      <el-input
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </div>
    <el-button @click="signup">Signup</el-button>
    <p>Do you have an account?
      <router-link to="/login">Login now!!</router-link>
    </p>
  </div>
</template>

<script>
import {USER_SIGNUP} from '@/store/actions/user'

export default {
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signup: function () {
      const { username, password } = this
      this.$store.dispatch(USER_SIGNUP, { username, password }).then(() => {
        this.$router.push('/')
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
