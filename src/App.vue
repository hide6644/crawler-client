<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-if="!isAuthenticated && !authLoading">
        | <router-link to="/login">Login</router-link>
        | <router-link to="/signup">Signup</router-link>
      </span>
      <span v-if="isAuthenticated">
        | <router-link to="/novel">Novel</router-link>
        | <a href="#" @click="logout">Logout</a>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState({
      authLoading: state => state.auth.status === 'loading'
    })
  },
  created: function () {
    this.locale = 'ja'
  },
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
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
