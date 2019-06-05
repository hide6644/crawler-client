<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isProfileLoaded">{{name}}の</span>
          <span>小説一覧</span>
        </div>
        <el-table
            :data="novels"
            style="width: 100%">
          <el-table-column
              prop="title"
              label="タイトル" />
          <el-table-column
              prop="writername"
              label="作者" />
          <el-table-column
              prop="description"
              label="解説" />
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters, mapState } from 'vuex'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'

const NovelsRepository = RepositoryFactory.get('novels')

export default {
  name: "Novel",
  data () {
    return {
      novels: []
    }
  },
  created: async function () {
    await this.refresh()
  },
  methods: {
    refresh: async function () {
      const res = await NovelsRepository.get()
      this.novels = res.data.novels
      console.info(this.novels)
    }
  },
  computed: {
    ...mapGetters(['isProfileLoaded']),
    ...mapState({
      name: state => state.user.profile.username
    })
  }
}
</script>
