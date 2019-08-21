<template>
  <el-table
      :data="novels"
      style="width: 100%">
    <el-table-column
        prop="title"
        label="タイトル"/>
    <el-table-column
        prop="writername"
        label="作者"/>
    <el-table-column
        prop="description"
        label="解説"/>
  </el-table>
</template>

<script>
/* eslint-disable no-console */

import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

export default {
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
      const res = await novelRepository.get()
      this.novels = res.data.novels
      console.info(this.novels)
    }
  }
}
</script>
