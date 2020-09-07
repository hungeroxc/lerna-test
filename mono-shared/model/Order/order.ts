import { getOrderList } from "./api";
import { AjaxResponse } from '@mono-shared-utils/request/types/ajax'
import * as ApiResponse from './types/api-response/orderList'
import { ORDER_STATUS } from './statusTypes'

interface ConstructorOptions {
  id: number,
  draftId: number,
  status: ORDER_STATUS,
  buyCompany: string,
  saleCompany: string,
}

class Order {

  // 订单id
  protected id: number
  // 票据id
  protected readonly draftId: number
  // 票据号码
  protected readonly status: ORDER_STATUS
  // 承兑人名称
  protected readonly buyCompany: string
  // 到期日期
  protected readonly saleCompany: string

  getId (): number {
    return this.id
  }
  getDraftId (): number {
    return this.draftId
  }
  getStatus (): ORDER_STATUS {
    return this.status
  }
  getBuyCompany (): string {
    return this.buyCompany
  }
  getSaleCompany (): string {
    return this.saleCompany
  }

  constructor(options: ConstructorOptions) {
    this.id = options.id
    this.draftId = options.draftId
    this.status = options.status
    this.buyCompany = options.buyCompany
    this.saleCompany = options.saleCompany
  }

  static createByApiData(apiData: ApiResponse.OrderListItem) {
    return new Order({
      id: apiData.id,
      draftId: apiData.draftId,
      status: apiData.status,
      buyCompany: apiData.buyCompany,
      saleCompany: apiData.saleCompany
    })
  }

  // 改变订单状态
  static changeStatus(targetStatus: ORDER_STATUS, index: number, originalList: Order[]) {
    const list = JSON.parse(JSON.stringify(originalList));
    list[index].status = targetStatus;
    return list;
  }
  // 获取订单列表
  static async getOrderList() {
    const resp: AjaxResponse<ApiResponse.OrderListItem[]> = await getOrderList()
    if (!resp.data) throw new Error('[ServerResponseError]缺少 data 字段')
    return resp.data.map((apiData: ApiResponse.OrderListItem) => {
      return Order.createByApiData(apiData)
    })
  }
}

export default Order
