<template>
  <el-row>
    <el-col :span="16">
      <el-card class="box-card">
        <el-form ref="form" label-width="120px">
          <el-form-item label="URL">
            <el-input
              v-model="getNovelSummary.url"
              clearable
            />
          </el-form-item>
          <el-form-item label="タイトル">
            <el-input
              v-model="getNovelSummary.title"
              clearable
            />
          </el-form-item>
          <el-form-item label="作者名">
            <el-input
              v-model="getNovelSummary.writername"
              clearable
            />
          </el-form-item>
          <el-form-item label="解説">
            <el-input
              type="textarea"
              v-model="getNovelSummary.description"
              clearable
            />
          </el-form-item>
          <el-form-item label="本文">
            <el-input
              type="textarea"
              v-model="getNovelSummary.body"
              clearable
            />
          </el-form-item>
          <el-form-item label="完結">
            <el-checkbox
              v-model="getNovelSummary.novelInfoSummary.finished"
            >済み</el-checkbox>
          </el-form-item>
          <el-button @click="back">Back</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { NOVEL_REQUEST } from '@/store/actions/novel/detail'

export default {
  computed: {
    ...mapGetters(['getNovelSummary'])
  },
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
    },
    back: function () {
      this.$router.push('/novel')
    }
  }
}
</script>
