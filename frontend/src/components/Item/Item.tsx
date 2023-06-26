import { FC, memo } from "react";
import DotCircle from "../../common/svgs/CloseIcon.svg";
import type { TOrderType } from "../../common/types";

import "./styles.scss";

interface Props {
  type: TOrderType | string;
  selected?: string;
  showIcon?: boolean;
  isWithColor?: boolean;
  id?: number;
  isOnList?: boolean;
  onRemoveOne?: (id: number) => void;
  disabled?: boolean;
}

const Item: FC<Props> = ({
  type,
  selected,
  showIcon = true,
  isOnList = false,
  isWithColor,
  id,
  onRemoveOne,
  disabled
}) => {
  return (
    <div className={`item-wrapper ${isWithColor && type}`} aria-disabled={disabled}>
      <span className="item-wrapper__text">
        {selected && type && isWithColor
          ? `${type.substring(0, 1)} / ${selected}`
          : selected
          ? `${selected}`
          : type}
      </span>
      {showIcon && type === "and" && isWithColor && !isOnList && (
        <div onClick={() => onRemoveOne(id)} className="item-wrapper__btn" aria-disabled={disabled}>
          <DotCircle />
        </div>
      )}
    </div>
  );
};

export default memo(Item);
