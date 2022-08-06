import request from '@/utils/request'

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

export const getCode = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'DELETE'
  })
// 获取用户资料
export const getUserInfoApi = () =>
  request({
    url: '/v1_0/user/profile'
  })

// 上传头像
export const updateImgApi = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
