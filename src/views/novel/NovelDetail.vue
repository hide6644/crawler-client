<script setup>
import moment from 'moment'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { NOVEL_REQUEST } from '@/store/actions/novel/detail'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const novelSummary = computed(() => store.getters.getNovelSummary)

function modifiedDateFormat(row) {
  return moment(row.novelChapterInfoSummary.modifiedDate).format(t('dateFormat'))
}

function detail() {
  store.dispatch(NOVEL_REQUEST, route.params.id).catch(error => {
    ElMessage({
      message: error,
      grouping: true,
      type: 'error'
    })
  })
}

function back() {
  router.push('/novel')
}

detail()
</script>

<template>
  <el-row>
    <el-col :span="18">
      <el-card class="box-card">
        <el-form
          ref="form"
          v-if="novelSummary"
          label-width="120px"
        >
          <el-form-item :label="$t('url')">
            <el-input
              v-model="novelSummary.url"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('title')">
            <el-input
              v-model="novelSummary.title"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('writername')">
            <el-input
              v-model="novelSummary.writername"
              clearable
            />
          </el-form-item>
          <el-form-item :label="$t('description')">
            <el-input
              type="textarea"
              v-model="novelSummary.description"
              clearable
            />
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item :label="$t('checkedDate')">
                <el-date-picker
                  type="datetime"
                  v-model="novelSummary.novelInfoSummary.checkedDate"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item :label="$t('modifiedDate')">
                <el-date-picker
                  type="datetime"
                  v-model="novelSummary.novelInfoSummary.modifiedDate"
                  clearable
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item>
                <el-checkbox
                  v-model="novelSummary.novelInfoSummary.finished"
                >{{ $t("finished") }}</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card>
                <div
                  class="clearfix"
                >
                  <span>{{ $t('novelChapter') }}</span>
                </div>
                <el-table
                  style="width: 100%"
                  :data="novelSummary.novelChapterSummary"
                  row-key="id"
                  stripe
                >
                  <el-table-column
                    prop="title"
                    :label="$t('title')"
                    sortable
                  />
                  <el-table-column
                    prop="novelChapterInfoSummary.modifiedDate"
                    :label="$t('modifiedDate')"
                    :formatter="modifiedDateFormat"
                    sortable
                  />
                </el-table>
              </el-card>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            justify="end"
            style="margin-top: 10px"
          >
            <el-col :span="3">
              <el-button @click="back">{{ $t('back') }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
