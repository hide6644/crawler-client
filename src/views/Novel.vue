<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
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

  import axios from 'axios'

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
        const res = await axios.get('http://localhost:8181/novels')
        this.novels = res.data.novels
        console.info(this.novels)
      }
    }
  }
</script>

<style scoped>

</style>
