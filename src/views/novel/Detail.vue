<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix"
        >
          <el-input
            placeholder="タイトル"
            v-model="getNovelSummary.title"
            clearable
          />
        </div>
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
    }
  }
}
</script>
