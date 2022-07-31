<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />
    <!-- 表单/账号密码 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <i class="toutiao toutiao-shouji1"></i>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <template #button>
          <van-button
            round
            size="mini"
            class="btn"
            v-if="isShow"
            @click="fn"
            native-type="button"
            >获取验证码</van-button
          >
          <van-count-down
            :time="6 * 1000"
            format=" ss 秒"
            v-else
            @finish="isShow = 1"
          />
        </template>
      </van-field>
      <div style="margin: 0.427rem">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login, getCode } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShow: 1
    }
  },
  methods: {
    // 封装加载中
    loading () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: 1
      })
    },
    async onSubmit () {
      try {
        this.loading()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)

        this.$store.commit('CHANGE', token)
        // 跳转profile
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分失败
        console.log(error)
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },

    fn () {
      // 1 验证手机号 ref给表单绑定form
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          // 2 发送请求
          await getCode(this.mobile)
          this.$toast.success('发送成功')
          // 3 显示倒计时
          this.isShow = 0
        } catch (error) {
          const status = error.response.status

          let message = '手机号格式不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.toutiao {
  font-size: 40px;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
// button 的样式  &代表父亲的类名
:deep(.btn) {
  &.van-button--mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background-color: #ededed;
  }
}
</style>
