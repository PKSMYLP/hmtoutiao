<template>
  <div class="channel">
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="editBtn"
        @click="isEidt = !isEidt"
        >{{ isEidt ? '编辑' : '完成' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in getMyChannels"
        :key="item.id"
        :text="item.name"
        :class="['myChannel', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEidt && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannel"
        :key="item.id"
        icon="plus"
        :text="item.name"
        class="recommand"
        @click="$emit('addChannel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelApi } from '@/api'
export default {
  name: '',
  props: {
    getMyChannels: {
      type: Array,
      required: true
    }
  },
  components: {},
  data () {
    return {
      isEidt: 0,
      AllChannel: []
    }
  },
  computed: {
    recommendChannel () {
      return this.AllChannel.filter(
        (ele1) => !this.getMyChannels.find((ele2) => ele1.id === ele2.id)
      )
    }
  },
  watch: {},
  methods: {
    async getAllChannel () {
      const { data } = await getAllChannelApi()
      this.AllChannel = data.data.channels
    },
    changeActive (index, item) {
      if (this.isEidt) {
        if (item.name === '推荐') return
        this.$emit('delChannel', item.id)

        // 删除
      } else {
        // 关闭
        this.$parent.$parent.show = false
        this.$emit('changeAct', index)
      }
    }
  },
  created () {
    this.getAllChannel()
  },
  mounted () {}
}
</script>
<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.333rem;
  .editBtn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  .recommand {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 40px;
    }
  }
  :deep(.myChannel) {
    .van-grid-item__content {
      position: relative;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(45%, -50%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
