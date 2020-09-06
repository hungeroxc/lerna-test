import {
  getList
} from './api'

class Draft {
  // 下单票据
  static orderTheBill = targetDraft => {
    targetDraft.billId = targetDraft.id;
    delete targetDraft.id;
    Object.assign(targetDraft, {
      id: Number(Math.random().toFixed(0)),
      buyCompany: "公司A",
      saleCompany: "公司B",
      status: 1,
    });
    return targetDraft
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