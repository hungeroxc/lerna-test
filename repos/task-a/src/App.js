import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { cloneDeep } from "lodash";

import Draft from "@mono-shared-model/draft/draft";
import Order from "@mono-shared-model/order/order";
import "./App.css";

// 该注释用于测试Commitizen

function App() {
  // 票据列表数据
  const [draftList, setDraftList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const getDraftList = async () => {
    try {
      const res = await Draft.getDraftList();
      setDraftList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderList = async () => {
    try {
      const res = await Order.getOrderList();
      setOrderList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 下单票据
  const orderTheDraft = (index) => {
    const tempDraftList = cloneDeep(draftList);
    const targetDraft = tempDraftList.splice(index, 1)[0];
    setDraftList(tempDraftList);

    const tempOrderList = cloneDeep(orderList);
    tempOrderList.unshift(Draft.orderTheDraft(targetDraft));
    setOrderList(tempOrderList);
  };

  // 改变订单状态
  const changeOrderStatus = (targetStatus, index) => {
    const newList = Order.changeStatus(targetStatus, index, orderList);
    setOrderList(newList);
  };

  // 条件渲染按钮
  const renderOrderListBtn = (record, index) => {
    return (
      <>
        {record.status === 1 && (
          <div>
            <Button size="small" type="warning">
              待确认
            </Button>
            <Button
              onClick={() => changeOrderStatus(2, index)}
              size="small"
              type="link"
            >
              下一步
            </Button>
            <Button
              danger
              onClick={() => changeOrderStatus(4, index)}
              size="small"
              type="link"
            >
              取消
            </Button>
          </div>
        )}
        {record.status === 2 && (
          <div>
            <Button size="small" type="success">
              已付款
            </Button>
            <Button
              onClick={() => changeOrderStatus(3, index)}
              size="small"
              type="link"
            >
              下一步
            </Button>
            <Button
              danger
              onClick={() => changeOrderStatus(4, index)}
              size="small"
              type="link"
            >
              取消
            </Button>
          </div>
        )}
        {record.status === 3 && (
          <Button disabled size="small" type="primary">
            已确认
          </Button>
        )}
        {record.status === 4 && (
          <Button disabled size="small" type="info">
            已取消
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    getDraftList();
    getOrderList();
  }, []);

  const draftTableColumns = [
    {
      title: "票据id",
      dataIndex: "id",
    },
    {
      title: "价格",
      dataIndex: "price",
    },
    {
      title: "票据号",
      dataIndex: "draftNum",
    },
    {
      title: "到期日期",
      dataIndex: "dealDate",
    },
    {
      title: "承兑人名称",
      dataIndex: "acceptor",
    },
    {
      title: "操作",
      render: (_, record, index) => {
        return (
          <Button
            onClick={() => orderTheDraft(index)}
            type="primary"
            size="small"
          >
            下单
          </Button>
        );
      },
    },
  ];

  const orderTableColumns = [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "票据id",
      dataIndex: "draftId",
    },
    {
      title: "买方公司",
      dataIndex: "buyCompany",
    },
    {
      title: "卖方公司",
      dataIndex: "saleCompany",
    },
    {
      title: "操作",
      render: (_, record, index) => renderOrderListBtn(record, index),
    },
  ];

  return (
    <div className="hello">
      <div className="draft-list-wrapper">
        <Table
          bordered
          rowKey="id"
          pagination={false}
          dataSource={draftList}
          columns={draftTableColumns}
        />
      </div>
      <div className="order-list-wrapper">
        <Table
          bordered
          rowKey="id"
          pagination={false}
          dataSource={orderList}
          columns={orderTableColumns}
        />
      </div>
    </div>
  );
}

export default App;
