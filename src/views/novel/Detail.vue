<template>
  <el-row>
    <el-col :span="18">
      <el-card class="box-card">
        <el-form
          ref="form"
          label-width="120px"
        >
          <el-form-item label="URL">
            <el-input
              v-model="getNovelSummary.url"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('title')">
            <el-input
              v-model="getNovelSummary.title"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('writername')">
            <el-input
              v-model="getNovelSummary.writername"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('description')">
            <el-input
              type="textarea"
              v-model="getNovelSummary.description"
              clearable
            />
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('checkedDate')">
                <el-date-picker
                  type="datetime"
                  v-model="getNovelSummary.novelInfoSummary.checkedDate"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item :label="$t('modifiedDate')">
                <el-date-picker
                  type="datetime"
                  v-model="getNovelSummary.novelInfoSummary.modifiedDate"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item>
                <el-checkbox
                  v-model="getNovelSummary.novelInfoSummary.finished"
                >{{ $t("finished") }}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-wrapper">
            <el-col :span="24">
              <el-card class="box-card">
                <div
                  slot="header"
                  class="clearfix"
                >
                  <span>{{ $t('novelChapter') }}</span>
                </div>
                <el-table
                  style="width: 100%"
                  :data="getNovelSummary.getNovelChapterSummary"
                  row-key="id"
                  stripe
                >
                  <el-table-column
                    prop="title"
                    :label="$t('title')"
                    sortable
                  />

                </el-table>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="end"
          >
            <el-col :span="3">
              <el-button @click="back">Back</el-button>
            </el-col>
          </el-row>
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
