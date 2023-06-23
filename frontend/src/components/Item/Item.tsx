import "./styles.scss";
import DotCircle from "../../assets/svgs/DotCircle";
import { FC } from "react";
import { TOrderType } from "../../common/types";

interface Props {
  type: TOrderType;
  selected?: string;
  showIcon?: boolean;
}

const Item: FC<Props> = ({ type, selected, showIcon = true }) => {
  return (
    <div className={`item-wrapper ${type}`}>
      <span className="item-wrapper__text">
        {selected ? `${type.substring(0, 1)} / ${selected}` : type}
      </span>
      {showIcon && <DotCircle />}
    </div>
  );
};
export default Item;
