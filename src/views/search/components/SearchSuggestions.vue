<template>
  <div>
    <van-cell v-for="(item, index) in highLight" :key="index" icon="search">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 按需导出 需要加括号
import { getSearchSuggestionApi } from '@/api'
import { debounce } from 'lodash'
// 正则
// 静态正则 字面量 /a/ig  i不区分大小写 g全局匹配
// 动态正则 new RegExp(a,'ig')  a动态匹配的字符 'ig' 全局不分大小写匹配
// 关于字符串的replace
// 第一个参数是正则
// 第二个参数可以使函数，函数的返回值是要替换的字符串
// match: 正则匹配上的字符
//   'aaspjaAjksa'.replace(/a/ig,function(match){return `<span>${match}</span>`})
export default {
  name: '',
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      suggestions: []
    }
  },
  computed: {
    // map 映射   对原数组的每一项进行操作 并返回新数组
    // 搜索的关键词高亮
    highLight () {
      // 定义动态正则
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((item) =>
        item.replace(reg, (match) => `<span style="color:red">${match}</span>`)
      )
    }
  },
  watch: {
    // 通常是先渲染页面结构再监听
    // keywords需要立即监听一开始就监听
    keywords: {
      // 开启立即监听
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 单一原则 一个函数执行一个功能
    // lodash的防抖 debounce(function(){},time)
    getSearchSuggestion: debounce(async function () {
      // async 要放在await所在函数声明的开头
      // 设置防抖 1 设置延迟 2 干掉上一次定时器
      // clearTimeout(this.id)
      // this.id = setTimeout(async () => {
      //   try {
      //     const res = await getSearchSuggestionApi(this.keywords)
      //     console.log(res)
      //     this.suggestions = res.data.data.options
      //     this.$toast.success('加载成功')
      //   } catch (error) {
      //     this.$toast.fail('加载失败')
      //   }
      // }, 1000)
      try {
        const res = await getSearchSuggestionApi(this.keywords)
        console.log(res)
        // 过滤 filter(Boolean) 去除假值 相当于 str=>Boolean(str)
        this.suggestions = res.data.data.options.filter(Boolean)
        this.$toast.success('加载成功')
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    }, 1000)
  },
  created () {},
  mounted () {}
}
</script>
<style scoped></style>
