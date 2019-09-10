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
            :data="novels"
            row-key="id"
          >
            <el-table-column
              label="お気に入り"
            >
              <template slot-scope="scope">
                <i class="el-icon-star-on" v-if="scope.row.novelInfoSummary.favorite"></i>
                <i class="el-icon-star-off" v-else></i>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="タイトル"
            />
            <el-table-column
              prop="writername"
              label="作者"
            />
            <el-table-column
              prop="description"
              label="解説"
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
import { repositoryFactory } from '@/repositories/repository-factory'

const novelRepository = repositoryFactory.get('novel')

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
      description: '',
      novels: []
    }
  },
  computed: {
    ...mapGetters(['isProfileLoaded']),
    ...mapState({
      username: state => state.user.profile.username
    })
  },
  created: async function () {
    await this.searchNovels()
  },
  methods: {
    search: async function () {
      let param = searchParameter.init()
          .add('title', this.title)
          .add('writername', this.writername)
          .add('description', this.description)
          .get()
      await this.searchNovels(param)
    },
    searchNovels: async function (param) {
      const res = await novelRepository.get(param)
      this.novels = res.data.novels
      console.info(this.novels)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/base";
</style>
