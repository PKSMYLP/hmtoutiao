<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          round
          class="search-btn"
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 标题 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in getMyChannels" :key="item.id" :title="item.name">
        <ArticlList :id="item.id"></ArticlList>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <!-- 弹层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :getMyChannels="getMyChannels"
        @close="show = false"
        @changeAct="active = $event"
        @delChannel="delChannel"
        @addChannel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import ChannelPopup from './components/channelPopup.vue'
import ArticlList from './components/ArticlList.vue'
import {
  getMyChannel,
  delChannelApi,
  addChannelApi,
  setMYchannelToLocal,
  getMYchannelByLocal
} from '@/api'
export default {
  name: 'Home',
  components: {
    ArticlList,
    ChannelPopup
  },
  data () {
    return {
      active: 0,
      getMyChannels: [],
      show: false
    }
  },
  created () {
    this.initGetMyChannelApi()
    // this.getMyChannelApi()
  },
  computed: {
    // 判断是否登录
    isLogin () {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    // 初始化数据
    initGetMyChannelApi () {
      if (this.isLogin) {
        // 用户登录了
        // 请求数据库的
        this.getMyChannelApi()
      } else {
        // 用户未登录
        const getMyChannels = getMYchannelByLocal()
        if (getMyChannels) {
          // 如果本地缓存的有数据
          this.getMyChannels = getMyChannels
        } else {
          // 如果本地缓存的没有有数据
          this.getMyChannelApi()
        }
      }
    },

    async getMyChannelApi () {
      try {
        const {
          data: { data }
        } = await getMyChannel()
        this.getMyChannels = data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取失败，请刷新！')
      }
    },
    async delChannel (id) {
      // 删除我的频道
      this.$toast.loading({
        message: '正在删除中  ...',
        forbidClick: true
      })
      try {
        const newChannel = this.getMyChannels.filter((ele) => ele.id !== id)
        if (this.isLogin) {
          // 1 先删除服务器的
          await delChannelApi(id)
        } else {
          setMYchannelToLocal(newChannel)
        }

        // 2 再删除页面的
        this.getMyChannels = newChannel
        this.$toast.success('删除成功')
      } catch {
        this.$toast.fail('删除失败')
      }
    },
    async addChannel (channel) {
      // 添加我的频道
      this.$toast.loading({
        message: '正在添加中  ...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          // 数据库添加
          await addChannelApi(channel.id, this.getMyChannels.length)
        } else {
          setMYchannelToLocal([...this.getMyChannels, channel])
        }

        // 页面添加
        this.getMyChannels.push(channel)
        this.$toast.success('添加成功')
      } catch {
        this.$toast.fail('添加失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  .van-nav-bar {
    position: sticky;
    left: 0;
    top: 0;
    z-index: 2;
  }

  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  left: 0;
  top: 92px;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;
    position: sticky;
    top: 0;
    left: 0;
    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 666;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  padding-bottom: 100px;
  // 设置内容的固定宽度
  max-height: calc(100vh - 92px - 88px - 100px);
  // 设置内容的滚动条
  overflow: auto;
}
</style>
