<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isProfileLoaded">{{ username }}の</span>
          <span>小説</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isProfileLoaded']),
    ...mapState({
      username: state => state.user.profile.username
    })
  }
}
</script>
