<template>
  <Form
    as="el-form"
    :validation-schema="schema"
    @submit="onSubmit"
  >
    <h2>Sign up</h2>
    <Field
      name="username"
      v-slot="{ value, field, errorMessage }"
    >
      <el-form-item
        :error="errorMessage"
        class="input-form-wrapper"
      >
        <el-input
          type="text"
          placeholder="Username"
          v-bind="field"
          :model-value="value"
        />
      </el-form-item>
    </Field>
    <Field
      name="password"
      v-slot="{ value, field, errorMessage }"
    >
      <el-form-item
        :error="errorMessage"
        class="input-form-wrapper"
      >
        <el-input
          type="password"
          placeholder="Password"
          v-bind="field"
          :model-value="value"
        />
      </el-form-item>
    </Field>
    <Field
      name="email"
      v-slot="{ value, field, errorMessage }"
    >
      <el-form-item
        :error="errorMessage"
        class="input-form-wrapper"
      >
        <el-input
          type="text"
          placeholder="E-Mail"
          v-bind="field"
          :model-value="value"
        />
      </el-form-item>
    </Field>
    <el-button
      type="primary"
      native-type="submit"
    >Signup</el-button>
    <p>Do you have an account?
      <router-link to="/login">Login now!!</router-link>
    </p>
  </Form>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Field, Form } from "vee-validate";
import { ElMessage } from 'element-plus'
import { USER_SIGNUP } from '@/store/actions/user'

const store = useStore()
const router = useRouter()

const schema = {
  username: 'required|max:16',
  password: 'required|max:16',
  email: 'required|max:64|email'
}

function onSubmit(values) {
  const { username, password, email } = values
  store.dispatch(USER_SIGNUP, { username, password, email }).then(() => {
    router.push('/')
  }).catch(error => {
    ElMessage({
      message: error,
      grouping: true,
      type: 'error'
    })
  })
}
</script>

<style scoped lang="scss">
.input-form-wrapper {
  margin: 20px auto;
  width: 320px;
}
</style>
