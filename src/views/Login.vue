<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { AUTH_REQUEST } from '@/store/actions/auth'

const store = useStore()
const router = useRouter()
const route = useRoute()

const state = reactive({
  username: '',
  password: ''
})

function login() {
  const { username, password } = state
  store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
    router.push(route.query.redirect || '/')
  }).catch(error => {
    ElMessage({
      message: error,
      grouping: true,
      type: 'error'
    })
  })
}
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <div class="input-form-wrapper">
      <el-input
        type="text"
        placeholder="Username"
        v-model="state.username"
      />
    </div>
    <div class="input-form-wrapper">
      <el-input
        type="password"
        placeholder="Password"
        v-model="state.password"
      />
    </div>
    <el-button @click="login">Login</el-button>
    <p>You don't have an account?
      <router-link to="/signup">Create account now!!</router-link>
    </p>
  </div>
</template>

<style scoped lang="scss">
.input-form-wrapper {
  margin: 20px auto;
  width: 320px;
}
</style>
