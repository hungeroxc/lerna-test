import { getDraftList } from "./api";
import * as ApiResponse from './types/api-response/draftList'
import { AjaxResponse } from '@mono-shared-utils/request/types/ajax'
import Order from '@mono-shared-model/order/order'

interface ConstructorOptions {
  id: number,
  price: number,
  draftNum: string,
  acceptor: string,
  dealDate: string,
}

class Draft {

  // 票据id
  protected id: number
  // 价格
  protected readonly price: number
  // 票据号码
  protected readonly draftNum: string
  // 承兑人名称
  protected readonly acceptor: string
  // 到期日期
  protected readonly dealDate: string
  // 票据id
  protected draftId: number | undefined = undefined


  getId (): number {
    return this.id
  }
  getPrice (): number {
    return this.price
  }
  getDraftNum (): string {
    return this.draftNum
  }
  getAcceptor (): string {
    return this.acceptor
  }
  getDealDate (): string {
    return this.dealDate
  }

  constructor(options: ConstructorOptions) {
    this.id = options.id
    this.price = options.price
    this.draftNum = options.draftNum
    this.acceptor = options.acceptor
    this.dealDate = options.dealDate
  }

  static createByApiData(apiData: ApiResponse.DraftListItem) {
    return new Draft({
      id: apiData.id,
      price: apiData.price,
      draftNum: apiData.draftNum,
      acceptor: apiData.acceptor,
      dealDate: apiData.dealDate
    })
  }

  static async getDraftList() {
    const resp: AjaxResponse<ApiResponse.DraftListItem[]> = await getDraftList()
    if (!resp.data) throw new Error('[ServerResponseError]缺少 data 字段')
    return resp.data.map((apiData: ApiResponse.DraftListItem) => {
      return Draft.createByApiData(apiData)
    })
  }

  static orderTheDraft(targetDraft: Draft): Order {
    const tempOrderItem: Order = Order.createByApiData({
      draftId: targetDraft.getId(),
      id: Number(Math.random().toFixed(0)),
      buyCompany: "公司A",
      saleCompany: "公司B",
      status: 1,
    })
    return tempOrderItem;
  }

}

export default Draft
