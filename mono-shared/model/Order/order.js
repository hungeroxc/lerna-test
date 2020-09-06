import { getOrderList } from "./api";

// 测试，测试changelog

class Order {
  // 改变订单状态
  static changeStatus(targetStatus, index, originalList) {
    const list = JSON.parse(JSON.stringify(originalList));
    list[index].status = targetStatus;
    return list;
  }
  // 获取订单列表
  static async getOrderList() {
    try {
      const res = await getOrderList();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Order;
