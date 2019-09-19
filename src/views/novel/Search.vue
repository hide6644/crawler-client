<template>
  <div class="novel-search">
    <el-card class="box-card box-card-wrapper">
      <el-row class="row-wrapper">
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            placeholder="タイトル"
            v-model="title"
            clearable
          />
        </el-col>
        <el-col
          class="col-wrapper"
          :span="6"
        >
          <el-input
            placeholder="作者"
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
            placeholder="解説"
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
          <div slot="header" class="clearfix">
            <span v-if="isProfileLoaded">{{ username }}の</span>
            <span>小説一覧</span>
          </div>
          <el-table
            style="width: 100%"
            :data="getNovelSummary"
            row-key="id"
          >
            <el-table-column
              label="お気に入り"
            >
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-star-on"
                  v-if="scope.row.novelInfoSummary.favorite"
                  @click="favorite(scope.row.id, false)"
                ></el-button>
                <el-button
                  icon="el-icon-star-off"
                  v-else
                  @click="favorite(scope.row.id, true)"
                ></el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="タイトル"
              sortable
            />
            <el-table-column
              prop="writername"
              label="作者"
              sortable
            />
            <el-table-column
              prop="description"
              label="解説"
              sortable
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable no-console */

import { mapGetters, mapState } from 'vuex'
import { NOVEL_SEARCH, NOVEL_UPDATE_FAV } from '@/store/actions/novel'

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
    ...mapGetters(['isProfileLoaded', 'getNovelSummary']),
    ...mapState({
      username: state => state.user.profile.username
    })
  },
  created: function () {
    this.searchNovels()
  },
  methods: {
    search: function () {
      const { title, writername, description } = this
      const param = searchParameter.init()
          .add('title', title)
          .add('writername', writername)
          .add('description', description)
          .get()
      this.searchNovels(param)
    },
    searchNovels: function (param) {
      this.$store.dispatch(NOVEL_SEARCH, param).catch(error => {
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    favorite: function (novelId, favorite) {
      console.info(novelId)
      console.info(favorite)
      this.$store.dispatch(NOVEL_UPDATE_FAV, { novelId, favorite }).then(() => {
        // TODO 画面表示に反映
      }).catch(error => {
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

<style scoped lang="scss">
@import "../../styles/base";
</style>
