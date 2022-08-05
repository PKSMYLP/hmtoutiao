<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <!-- eslint-disable -->
      <!-- 关闭eslint -->
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        :immediate-check="false"
        offset="0"
        :finished="finished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleApi } from '@/api'
import ArticleItem from '@/components/ArticleItem'
export default {
  props: {
    id: {
      // type 可以采用数组 任选一种
      type: [String, Number],
      // 必要的
      required: true
    }
  },
  data () {
    return {
      list: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  components: {
    ArticleItem
  },
  created () {
    // 页面初始化发送请求
    this.getFirstPageArticle()
  },
  methods: {
    // 请求第一页
    async getFirstPageArticle () {
      try {
        const { data } = await getArticleApi(this.id, +new Date())
        console.log(data)
        this.list = data.data.results
        // 保存上一页的事件戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch {
        this.$toast.fail('请刷新重试')
      }
    },
    // 请求下一页
    async loadNextPageArticle () {
      try {
        const { data } = await getArticleApi(this.id, this.pre_timestamp)
        // 判断是否加载完成
        if (data.data.pre_timestamp === null) {
          this.finished = true
        }
        // 添加数据
        if (this.refreshing) {
          this.list.unshift(...data.data.results)
        } else {
          this.list.push(...data.data.results)
        }
        // 更新事件戳
        this.pre_timestamp = data.data.pre_timestamp
        // 修改loading值 继续下一次

        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
