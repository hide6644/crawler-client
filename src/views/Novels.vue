<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isProfileLoaded">{{ name }}の</span>
          <span>小説一覧</span>
        </div>
        <novelSummaryList/>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import novelSummaryList from '@/components/NovelSummaryList.vue'

export default {
  components: {
    novelSummaryList
  },
  computed: {
    ...mapGetters(['isProfileLoaded']),
    ...mapState({
      name: state => state.user.profile.username
    })
  }
}
</script>
