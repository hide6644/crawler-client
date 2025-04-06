<script setup>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, StarFilled, Star } from '@element-plus/icons-vue'
import { NOVEL_SEARCH, NOVEL_UPDATE_FAV } from '@/store/actions/novel/search'

const store = useStore()
const router = useRouter()
const { t } = useI18n()

const searchParameter = computed(() => store.getters.getSearchParameter)
const novelSummaryList = computed(() => store.getters.getNovelSummaryList)
const aggregateByKeywords = computed(() => store.getters.getAggregateByKeywords)

const state = reactive({
  title: searchParameter.value.title,
  writername: searchParameter.value.writername,
  description: searchParameter.value.description
})

function search() {
  const { title, writername, description } = state
  store.dispatch(NOVEL_SEARCH, { title, writername, description }).catch(error => {
    ElMessage({
      message: error,
      grouping: true,
      type: 'error'
    })
  })
}

function handleFavorite(novelId, favorite) {
  store.dispatch(NOVEL_UPDATE_FAV, { novelId, favorite }).catch(error => {
    ElMessage({
      message: error,
      grouping: true,
      type: 'error'
    })
  })
}

function handleDetails(novelId) {
  router.push('/novel/' + novelId)
}

function handleDelete(novel) {
  ElMessageBox.confirm(t('confirmDelete', [novel.title]), 'Warning', {
    type: 'warning'
  }).then(() => {
    ElMessage({
      message: t('deleted'),
      type: 'success'
    })
  }).catch(() => {
    ElMessage({
      message: t('canceled'),
      type: 'info'
    })
  })
}

search()
</script>

<template>
  <div class="novel-search">
    <el-card class="box-card box-card-wrapper">
      <el-row class="row-wrapper">
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            :placeholder="$t('title')"
            v-model="state.title"
            clearable
          />
        </el-col>
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            :placeholder="$t('writername')"
            v-model="state.writername"
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
            :placeholder="$t('description')"
            v-model="state.description"
          />
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col :span="12">
          <el-button @click="search" :icon="Search">{{ $t('search') }}</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="row-wrapper">
      <el-col :span="24">
        <el-card class="box-card">
          <span v-for="(value, name, index) in aggregateByKeywords" :key="index">
            <span v-if="index > 0">, </span>
            {{ name }}: {{ value }}
          </span>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="row-wrapper">
      <el-col :span="24">
        <el-card class="box-card">
          <div class="clearfix">
            <span>{{ $t('novels') }}</span>
          </div>
          <el-table
            style="width: 100%"
            :data="novelSummaryList"
            row-key="id"
            stripe
          >
            <el-table-column
              :label="$t('favorite')"
            >
              <template v-slot="scope">
                <el-button
                  :icon="StarFilled"
                  v-if="scope.row.novelInfoSummary.favorite"
                  @click="handleFavorite(scope.row.id, false)"
                ></el-button>
                <el-button
                  :icon="Star"
                  v-else
                  @click="handleFavorite(scope.row.id, true)"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              :label="$t('title')"
              sortable
            />
            <el-table-column
              prop="writername"
              :label="$t('writername')"
              sortable
            />
            <el-table-column
              prop="description"
              :label="$t('description')"
              sortable
            />
            <el-table-column
              :label="$t('operation')">
              <template v-slot="scope"
            >
                <el-button
                  @click="handleDetails(scope.row.id)"
                >{{ $t('details') }}</el-button>
                <el-button
                  type="danger"
                  @click="handleDelete(scope.row)"
                >{{ $t('delete') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
@use "../../styles/base";
</style>
