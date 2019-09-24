<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>小説</span>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { NOVEL_REQUEST } from '@/store/actions/novel/detail'

export default {
  created: function () {
    this.detail()
  },
  methods: {
    detail: function () {
      this.$store.dispatch(NOVEL_REQUEST, this.$route.params.id).catch(error => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    }
  }
}
</script>
