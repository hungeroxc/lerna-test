
<template>
  <div class="hello">
    <div class="bill-list-wrapper">
      <el-table
        :data="draftList"
        border
        height="500"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="票据id">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="billNum"
          label="票据号">
        </el-table-column>
        <el-table-column
          prop="dealDate"
          label="到期日期">
        </el-table-column>
        <el-table-column
          prop="acceptor"
          label="承兑人名称">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="orderTheBill(scope.$index)" type="text" size="small">下单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="order-list-wrapper">
      <el-table
        :data="orderList"
        border
        height="500"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id">
        </el-table-column>
        <el-table-column
          prop="billId"
          label="票据id">
        </el-table-column>
        <el-table-column
          prop="buyCompany"
          label="买方公司">
        </el-table-column>
        <el-table-column
          prop="saleCompany"
          label="卖方公司">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-button   type="warning" size="small">待确认</el-button>
              <el-button @click="changeStatus(2, scope.$index)" type="text" size="small">下一步</el-button>
              <el-button @click="changeStatus(4, scope.$index)" type="text" size="small">取消</el-button>
            </div>
            <div v-if="scope.row.status === 2">
              <el-button   type="success" size="small">已付款</el-button>
              <el-button @click="changeStatus(3, scope.$index)" type="text" size="small">下一步</el-button>
              <el-button @click="changeStatus(4, scope.$index)" type="text" size="small">取消</el-button>
            </div>
            <div v-if="scope.row.status === 3">
              <el-button type="primary" size="small">已确认</el-button>
            </div>
            <div v-if="scope.row.status === 4">
              <el-button   type="info" size="small">已取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Draft from '@mono-shared-model/draft/draft'
import Order from '@mono-shared-model/order/order'

export default {
  name: 'HelloWorld',

  data() {
    return {
      draftList: [],
      orderList: []
    }
  },

  methods: {
    // 获取票据列表
    async getDraftList() {
      try {
        const res = await Draft.getDraftList()
        this.draftList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取订单列表
    async getOrderList() {
      try {
        const res = await Order.getOrderList()
        this.orderList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    // 下单一个票据
    orderTheBill(index) {
      const target = this.draftList.splice(index, 1)[0]
      target.billId = target.id
      delete target.id
      Object.assign(target, {
        id: Number((Math.random()).toFixed(0)),
        buyCompany: '公司A',
        saleCompany: '公司B',
        status: 1
      })
      this.orderList.unshift(target)
    },
    changeStatus(targetStatus, index) {
      const newList = Order.changeStatus(targetStatus, index, this.orderList)
      this.orderList = newList
    }
  },

  created() {
    this.getDraftList()
    this.getOrderList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .bill-list-wrapper,.order-list-wrapper {
    margin-bottom: 20px;
    flex: 1;
    width: 1000px;
  }
</style>
