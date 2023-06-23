import "./styles.scss";
import DotCircle from "../../assets/svgs/DotCircle";
import { FC } from "react";

interface Props {
  variant: "menu-item" | "ingredient" | "and";
  selected?: string;
}

const Item: FC<Props> = ({ variant, selected }) => {
  return (
    <div className={`item-wrapper ${variant}`}>
      <span className="item-wrapper__text">{variant}</span>
      {selected ? selected : <DotCircle />}
    </div>
  );
};
export default Item;
