<template>
  <div class="novel-search">
    <el-card class="box-card box-card-wrapper">
      <el-row class="row-wrapper">
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            placeholder="タイトル"
            v-model="title"
            clearable
          />
        </el-col>
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            placeholder="作者"
            v-model="writername"
            clearable
          />
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col
          class="col-wrapper"
          :span="12"
        >
          <el-input
            type="textarea"
            placeholder="解説"
            v-model="description"
          />
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col :span="12">
          <el-button @click="search">Search</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="row-wrapper">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="isProfileLoaded">{{ username }}の</span>
            <span>小説一覧</span>
          </div>
          <NovelSummaryList/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NovelSummaryList from '@/components/NovelSummaryList.vue'

export default {
  data () {
    return {
      title: '',
      writername: '',
      description: ''
    }
  },
  components: {
    NovelSummaryList
  },
  computed: {
    ...mapGetters(['isProfileLoaded']),
    ...mapState({
      username: state => state.user.profile.username
    })
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base";
</style>
