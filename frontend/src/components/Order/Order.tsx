import { IOrderItem, IReceipt } from "common/types";
import { FC, useEffect, useState } from "react";

interface Props {
  orderList: IOrderItem[];
}

const Order: FC<Props> = ({ orderList }) => {
  const initialPrice = 10;
  const [receipt, setReceipt] = useState<IReceipt[] | null>(null);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const getOrder = () => {
      const receipt:IReceipt[] = [];
      orderList.forEach(orderItem =>
        orderItem.type === 'menu-item' ? receipt.push({
          id: receipt.length + 1,
          name: orderItem.menuItem,
          price: initialPrice,
        })
          : orderItem.type === 'ingredient' ? receipt[receipt.map(order => order.name === orderItem.menuItem && order.name).lastIndexOf(orderItem.menuItem)].price += initialPrice
            : null
      )
      console.log(receipt);
      const total = receipt.reduce((acc, receiptItem) => acc + receiptItem.price, initialPrice);
      setTotal(total);
      setReceipt(receipt);
    }

    getOrder();
  }, [])
  return (
    <div className="order">
      <p className="order__text--bold">Order:</p>
      {receipt && receipt.map(order => (
        <p key={order.id}>{`${order.name} - ${order.price}NIS`}</p>
      ))}
      <p className="order__text--bold">{`Total: ${total}NIS`}</p>
    </div>
  );
}

export default Order;
