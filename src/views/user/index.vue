<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人资料 -->
    <!-- input file 上传文件  它的属性 hidden : 隐藏input file accept :显示accept里file指定的文件后缀名 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".png,.jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <!-- 弹层 -->
    <van-popup
      class="popup"
      v-model="isShow"
      closeable
      :style="{ width: '100%', height: '100%' }"
    >
      <UpdataImg
        :photo="photo"
        v-if="isShow"
        @updateImg="userInfo.photo = $event"
      ></UpdataImg>
    </van-popup>

    <van-cell title="昵称" is-link :value="userInfo.name" />
    <van-cell title="性别" is-link :value="userInfo.gender" />
    <van-cell title="生日" is-link :value="userInfo.birthday" />
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import { resolveToBase64 } from '@/utils'
import UpdataImg from './components/UpdataImg.vue'

export default {
  name: '',
  components: { UpdataImg },
  data () {
    return {
      isShow: false,
      userInfo: {},
      photo: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserInfo () {
      const res = await getUserInfoApi()
      console.log(res)
      this.userInfo = res.data.data
    },
    // 选择图片
    async selectPhoto (e) {
      // 1 获取用户选择的图片
      // 默认有 e  当前元素
      // e.target 触发事件的元素
      // e.target.files 伪数组 存储用户选择的文件对象
      const file = e.target.files[0]
      // 2 将 file 文件对象转成  src可识别的 url
      //  window.URL.createObjectURL(file) 将file 转成 url
      // const url = window.URL.createObjectURL(file)
      // 3 传递 url
      // this.photo = url
      // 4 清空 value 用户可以选择同一张图片
      // this.isShow = true
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   // 这个回调函数是异步所以要放一起
      //   this.photo = e.target.result
      //   e.target.value = ''
      //   this.isShow = true
      // }
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShow = true
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {}
}
</script>
<style scoped lang="less">
:deep(.navbar) {
  background-color: #3396fc;
  .van-icon,
  .van-nav-bar__title {
    color: #fff;
  }
}
.popup {
  background-color: #000;
}
</style>
