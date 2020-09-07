<template>
  <div class="hello">
    <div class="draft-list-wrapper">
      <el-table :data="draftList" border height="500" style="width: 100%">
        <el-table-column prop="id" label="票据id"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="draftNum" label="票据号"></el-table-column>
        <el-table-column prop="dealDate" label="到期日期"></el-table-column>
        <el-table-column prop="acceptor" label="承兑人名称"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="orderTheDraft(scope.$index)"
              type="text"
              size="small"
              >下单</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="order-list-wrapper">
      <el-table :data="orderList" border height="500" style="width: 100%">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="draftId" label="票据id"></el-table-column>
        <el-table-column prop="buyCompany" label="买方公司"></el-table-column>
        <el-table-column prop="saleCompany" label="卖方公司"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-button type="warning" size="small">待确认</el-button>
              <el-button
                @click="changeOrderStatus(2, scope.$index)"
                type="text"
                size="small"
                >下一步</el-button
              >
              <el-button
                @click="changeOrderStatus(4, scope.$index)"
                type="text"
                size="small"
                >取消</el-button
              >
            </div>
            <div v-if="scope.row.status === 2">
              <el-button type="success" size="small">已付款</el-button>
              <el-button
                @click="changeOrderStatus(3, scope.$index)"
                type="text"
                size="small"
                >下一步</el-button
              >
              <el-button
                @click="changeOrderStatus(4, scope.$index)"
                type="text"
                size="small"
                >取消</el-button
              >
            </div>
            <div v-if="scope.row.status === 3">
              <el-button type="primary" size="small">已确认</el-button>
            </div>
            <div v-if="scope.row.status === 4">
              <el-button type="info" size="small">已取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
  import main from './main';
  export default main;
</script>

<style >
@import "./style.css";
</style> -->
