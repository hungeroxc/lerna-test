import http from '@mono-shared-utils/request'

export const getList = (params = {}) => {
  return http.get('/getDraftList', params)
}
