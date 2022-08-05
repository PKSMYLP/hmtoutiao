<template>
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
  />
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <van-cell v-else :title="articleInfo.title" :label="label">
    <img
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="100"
      height="100"
      :src="item"
    />
  </van-cell>
</template>

<script>
export default {
  name: '',
  props: {
    articleInfo: {
      type: Object,
      // 对象和数组默认用函数返回 对象的{} 要包一层 ({}) 不然识别不了是对象还是返回值
      default: () => ({})
    }
  },
  components: {},
  data () {
    return {}
  },
  computed: {
    label () {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  },
  watch: {},
  methods: {},
  created () {},
  mounted () {}
}
</script>
<style scoped></style>
