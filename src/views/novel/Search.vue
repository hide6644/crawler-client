<template>
  <div class="novelSearch">
    <el-row>
      <el-col :span="6">
        <el-input placeholder="タイトル" v-model="title" clearable></el-input>
      </el-col>
      <el-col :span="6">
        <el-input placeholder="作者" v-model="writername" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-input type="textarea" placeholder="解説" v-model="description"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span v-if="isProfileLoaded">{{ name }}の</span>
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
      name: state => state.user.profile.username
    })
  }
}
</script>
