import request from '@/utils/request'
import storage from '@/utils/storage'
// 我的
export const getMyChannel = () =>
  request({
    url: '/v1_0/user/channels'
  })
// 推荐
export const getAllChannelApi = () =>
  request({
    url: '/v1_0/channels'
  })
// 删除
export const delChannelApi = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
// 添加
export const addChannelApi = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })

const HMTTCHANNEL = 'HMTTCHANNEL'

export const setMYchannelToLocal = (MyChannels) => {
  storage.set(HMTTCHANNEL, MyChannels)
}

export const getMYchannelByLocal = () => {
  storage.get(HMTTCHANNEL)
}
