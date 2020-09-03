import { getOrderList } from './api'

class Order {
  static getOrderList = async () => {
    try {
      const res = await getOrderList()
      return res
    } catch (error) {
      console.log(error)
    }
  }
}

export default Order