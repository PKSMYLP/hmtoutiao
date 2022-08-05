import request from '@/utils/request'

export const getSearchSuggestionApi = (q) =>
  request({
    url: '/v1_0/suggestion',
    // 请求参数query 放在params  请求参数body 放在data
    params: { q }
  })
