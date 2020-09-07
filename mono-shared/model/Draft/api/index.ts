import http from '@mono-shared-utils/request'

export const getDraftList = (params = {}) => {
  return http.get('/getDraftList', params)
}
