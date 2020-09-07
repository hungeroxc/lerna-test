import Vue from 'vue'
import Component from 'vue-class-component'

import Draft from "@mono-shared-model/draft/draft";
import Order from "@mono-shared-model/order/order";
import { ORDER_STATUS } from '@mono-shared-model/order/statusTypes'

@Component({
  name: 'List',
})
export default class List extends Vue {

    draftList: Draft[] = []
    orderList: Order[] = []

    // 获取票据列表
    async getDraftList() {
      try {
        this.draftList = await Draft.getDraftList();
      } catch (error) {}
    }
    // 获取订单列表
    async getOrderList() {
      try {
        this.orderList = await Order.getOrderList();
      } catch (error) {}
    }
    // 下单一个票据
    orderTheDraft(index: number) {
      const targetDraft = this.draftList.splice(index, 1)[0];
      this.orderList.unshift(Draft.orderTheDraft(targetDraft));
    }
    // 改变订单状态
    changeOrderStatus(targetStatus: ORDER_STATUS, index: number) {
      const newList = Order.changeStatus(targetStatus, index, this.orderList);
      this.orderList = newList;
    }

    created() {
      this.getDraftList()
      this.getOrderList()
    }
}
