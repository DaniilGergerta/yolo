import "./styles.scss";
import DotCircle from "../../assets/svgs/DotCircle";
import { FC } from "react";

interface Props {
  variant: "menu-item" | "ingredient" | "and";
}

const Item: FC<Props> = ({ variant }) => {
  return (
    <div className={`item-wrapper ${variant}`}>
      <span className="item-wrapper__text">{variant}</span>
      <DotCircle />
    </div>
  );
};
export default Item;
