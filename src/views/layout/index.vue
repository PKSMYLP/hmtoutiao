<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.to"
      >
        <template #icon>
          <span :class="`toutiao ${item.icon}`"></span>
        </template>
        <span>{{ item.text }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbarData: [
        {
          to: '/ ',
          icon: 'toutiao-shouye1',
          text: '首页'
        },
        {
          to: '/video',
          icon: 'toutiao-shipin',
          text: '视频'
        },
        {
          to: '/qa',
          icon: 'toutiao-wenda',
          text: '问答'
        },
        {
          to: '/my',
          icon: 'toutiao-wode',
          text: '我的'
        }
      ]
    }
  }
}
</script>

<style>
.van-tabbar-item {
  font-size: 30px;
}
.toutiao {
  font-size: 40px;
}
</style>
