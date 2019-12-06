<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ passes }"
  >
    <el-form
      ref="form"
      class="login"
    >
      <h2>Sign up</h2>
      <ValidationProvider
        name="username"
        rules="required|max:16"
        v-slot="{ errors }"
      >
        <el-form-item
          :error="errors[0]"
          class="input-form-wrapper"
        >
          <el-input
            type="text"
            placeholder="Username"
            v-model="username"
          />
        </el-form-item>
      </ValidationProvider>
      <ValidationProvider
        name="password"
        rules="required|max:16"
        v-slot="{ errors }"
      >
        <el-form-item
          :error="errors[0]"
          class="input-form-wrapper"
        >
          <el-input
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </el-form-item>
      </ValidationProvider>
      <el-button
        type="primary"
        @click="passes(signup)"
      >Signup</el-button>
      <p>Do you have an account?
        <router-link to="/login">Login now!!</router-link>
      </p>
    </el-form>
  </ValidationObserver>
</template>

<script>
import { USER_SIGNUP } from '@/store/actions/user'
import { ValidationProvider, ValidationObserver } from "vee-validate"

export default {
  data: function () {
    return {
      username: '',
      password: '',
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
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
