import http from '@mono-shared-utils/request'

export const getOrderList = (params = {}) => {
  return http.get('/getOrderList', params)
}