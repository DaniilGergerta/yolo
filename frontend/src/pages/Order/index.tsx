import { FC, memo, useEffect, useState } from "react";
import { useAppSelector } from "store";
import { Navigate } from "react-router-dom";
import { getOrder } from "common/utils";
import type { IReceipt } from "common/types";

import "./styles.scss";

const Order: FC = () => {
  const { products: orderList } = useAppSelector((store) => store.products);
  const [receipt, setReceipt] = useState<IReceipt[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const { total, receipt } = getOrder(orderList);

    setTotal(total);
    setReceipt(receipt);
  }, []);

  return orderList.length ? (
    <section className="order-wrapper">
      <div className="order">
        <p className="order__text--bold">Order:</p>
        {receipt &&
          receipt.map((order) => <p key={order.id}>{`${order.name} - ${order.price}NIS`}</p>)}
        <p className="order__text--bold">{`Total: ${total}NIS`}</p>
      </div>
    </section>
  ) : (
    <Navigate to="/home" replace />
  );
};

export default memo(Order);
