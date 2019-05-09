<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/novel">Novel</router-link> |
      <a href="#" @click="logout">Logout</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
  /* eslint-disable no-console */

  import axios from 'axios'

  export default {
    methods: {
      logout() {
        axios.defaults.headers.common['Authorization'] = ''
        this.$store.state.isLogin = false
        this.$router.push({path: '/'})
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
