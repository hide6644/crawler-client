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
            v-model="title"
            clearable
          />
        </el-col>
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            :placeholder="$t('writername')"
            v-model="writername"
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
            v-model="description"
          />
        </el-col>
      </el-row>
      <el-row class="row-wrapper">
        <el-col :span="12">
          <el-button @click="search">Search</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="row-wrapper">
      <el-col :span="24">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ $t('novels') }}</span>
          </div>
          <el-table
            style="width: 100%"
            :data="getNovelSummaryList"
            row-key="id"
            stripe
          >
            <el-table-column
              :label="$t('favorite')"
            >
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-star-on"
                  v-if="scope.row.novelInfoSummary.favorite"
                  @click="handleFavorite(scope.row.id, false)"
                ></el-button>
                <el-button
                  icon="el-icon-star-off"
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
              <template slot-scope="scope"
            >
                <el-button
                  size="mini"
                  @click="handleDetails(scope.row.id)"
                >{{ $t('details') }}</el-button>
                <el-button
                  size="mini"
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

<script>
import { mapGetters, mapState } from 'vuex'
import { NOVEL_SEARCH, NOVEL_UPDATE_FAV } from '@/store/actions/novel/search'

const searchParameter = {
  data: function () {
    return {
      param: ''
    }
  },
  init: function () {
    this.param = ''
    return this
  },
  add: function (key, val) {
    if (val != '') {
      if (this.param != '') {
        this.param = this.param + ','
      }
      this.param = this.param + key + ':' + val
    }
    return this
  },
  get: function () {
    return this.param
  }
}

export default {
  data: function () {
    return {
      title: '',
      writername: '',
      description: ''
    }
  },
  computed: {
    getSearchParameter: function () {
      const { title, writername, description } = this
      return searchParameter.init()
          .add('title', title)
          .add('writername', writername)
          .add('description', description)
          .get()
    },
    ...mapGetters(['isProfileLoaded', 'getNovelSummaryList']),
    ...mapState({
      username: state => state.user.profile.username
    })
  },
  created: function () {
    this.search()
  },
  methods: {
    search: function () {
      this.$store.dispatch(NOVEL_SEARCH, this.getSearchParameter).catch(error => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    handleFavorite: function (novelId, favorite) {
      this.$store.dispatch(NOVEL_UPDATE_FAV, { novelId, favorite }).catch(error => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    handleDetails: function (novelId) {
      this.$router.push('/novel/' + novelId)
    },
    handleDelete: function (novel) {
      this.$confirm(this.$t('confirmDelete', [novel.title]), 'Warning', {
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: this.$t('deleted')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('canceled')
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base";
</style>
