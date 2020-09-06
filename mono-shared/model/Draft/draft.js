import { getList } from "./api";

// 测试，我就加个注释

// 测试，生成changelog

class Draft {
  // 下单票据
  static orderTheDraft(targetDraft) {
    targetDraft.draftId = targetDraft.id;
    delete targetDraft.id;
    Object.assign(targetDraft, {
      id: Number(Math.random().toFixed(0)),
      buyCompany: "公司A",
      saleCompany: "公司B",
      status: 1,
    });
    return targetDraft;
  }
  // 获取票据列表
  static async getDraftList() {
    try {
      const res = await getList();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Draft;
