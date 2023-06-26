import { FC, useEffect, useState } from "react";
import { IOrderItem } from "../../common/types";
import "./styles.scss";

interface Props {
  prices: number[];
  orderList: IOrderItem[];
}

export const Reciept: FC<Props> = ({ prices, orderList }) => {
  const [recieptList, setRecieptList] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Calculate reciept
  }, []);
  return (
    <div className="reciept-wrapper">
      {recieptList.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
};

export default Reciept;
