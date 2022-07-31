<template>
  <div>
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">登录后</div>
      <div class="logout" v-else>未登录</div>
    </header>
    <!-- 中间 -->
    <main>收藏/历史</main>
    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin () {
      // !!   第一个先取反  第二个在转成布尔值
      // 通过是否有token判断
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout () {
      // 清除token 传空对象
      this.$store.commit('CHANGE', {})
    }
  }
}
</script>

<style></style>
