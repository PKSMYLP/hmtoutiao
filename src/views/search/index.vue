<template>
  <div>
    <!-- 搜索框 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3695f4"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>
    <!-- 搜索历史/搜索词联想/搜索结果-->
    <!-- <search-history></search-history>
    <search-suggestions></search-suggestions>
    <search-result></search-result> -->
    <!-- 动态组件 通过is判断显示哪个组件 多个通过计算属性componentName的值进行条件显示  -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
// 引入组件
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestions from './components/SearchSuggestions.vue'
import SearchResult from './components/SearchResult.vue'

export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestions,
    SearchResult
  },
  data () {
    return {
      keywords: '',
      isSearchResult: false
    }
  },
  computed: {
    componentName () {
      // 一开始没有输入显示SearchHistory
      if (this.keywords === '') {
        return SearchHistory
      }
      if (this.isSearchResult) {
        // 输入并回车确定显示SearchResult

        return SearchResult
      }
      // 输入显示SearchSuggestions
      return SearchSuggestions
    }
  },
  watch: {},
  methods: {
    // 搜索
    onSearch () {
      // 确定搜索时触发
      this.isSearchResult = true
    },
    // 解决回车之后在输入显示结果
    onSearchFocus () {
      // 当this.isSearchResult变化，计算属性会重新计算
      // 不管有没有回车，输入时都会触发focus事件
      this.isSearchResult = false
    }
  },
  created () {},
  mounted () {}
}
</script>
<style scoped lang="less">
.search {
  // 属性选择器 [attr=''value''] 是属性值 完全匹配选择器
  [role='button'] {
    color: #fff;
  }
}
</style>
