import { useState } from "react";
import { tableStyle } from "./OrderTable.style";
import { Order } from "@types";

interface OrderTableProps {
  orders: Order[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((orderId) => orderId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllChange = (isChecked: boolean) => {
    if (isChecked) {
      const allOrderIds = orders.map((order) => order.deliveryId);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const isAllSelected = selectedOrders.length === orders.length;

  return (
    <table css={tableStyle}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => handleSelectAllChange(e.target.checked)}
            />
          </th>
          <th>접수 날짜</th>
          <th>주문 번호</th>
          <th>상품명</th>
          <th>보내는 분</th>
          <th>보내는 분 전화번호</th>
          <th>받는 분</th>
          <th>받는 분 전화번호</th>
          <th>받는 분 주소</th>
          <th>출발 날짜</th>
          <th>결제 내역</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.deliveryId}>
            <td>
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.deliveryId)}
                onChange={() => handleCheckboxChange(order.deliveryId)}
              />
            </td>
            <td>{order.orderReceivedDate}</td>
            <td>{order.orderNumber}</td>
            <td>{...order.productList}</td>
            <td>{order.senderName}</td>
            <td>{order.senderPhone}</td>
            <td>{order.recipientName}</td>
            <td>{order.recipientPhone}</td>
            <td>{order.recipientAddress}</td>
            <td>{order.deliveryDate}</td>
            <td>{order.deliveryStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;