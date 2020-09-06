import http from '@mono-shared-utils/request'

export const getList = (params = {}) => {
  return http.get('/example/1599114369859', params)
}
