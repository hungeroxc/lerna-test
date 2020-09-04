import { getList } from './api'

class Draft {
  // 下单票据
  static orderTheBill = (index) => {

  }
  // 获取票据列表
  static getDraftList = async () => {
    try {
      const res = await getList()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

export default Draft
