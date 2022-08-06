<template>
  <div class="update-avator">
    <img :src="photo" class="img" ref="image" />

    <footer>
      <span @click="$parent.$parent.isShow = false">取消</span>
      <span @click="updateImg">完成</span>
    </footer>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { updateImgApi } from '@/api'

export default {
  props: {
    photo: {
      type: String,
      required: true
    }
  },
  methods: {
    init () {
      this.myCropper = new Cropper(this.$refs.image, {
        viewMode: 1,
        dragMode: 'none',
        initialAspectRatio: 1,
        aspectRatio: 1,
        preview: '.before',
        background: false,
        autoCropArea: 0.6,
        zoomOnWheel: false
      })
    },
    updateImg () {
      // 1 获取裁剪的图片对象
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        // 2 发送请求
        const { data } = await updateImgApi(blob)
        console.log(data)
        // 3 更改父组件的头像
        this.$emit('updateImg', data.data.photo)
        // 4 关闭弹层
        this.$parent.$parent.isShow = false
      })
    }
  },
  mounted () {
    // 每次只挂载一次
    this.init()
  }
}
</script>

<style scoped lang="less">
.update-avator {
  height: 100%;
  position: relative;

  .img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50%;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 40px;
  }
}
</style>
