import "./styles.scss";
import { ChangeEventHandler, FC, KeyboardEvent, useCallback } from "react";
import CloseIcon from "../../assets/svgs/CloseIcon";
import { IOrderItem } from "../../common/types";
import Item from "../Item";

interface Props {
  orderList: IOrderItem[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  removeLastOrderItem: () => void;
}

const SearchBar: FC<Props> = ({ orderList, onChange, removeLastOrderItem }) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key == "Backspace" && orderList.length > 1) {
      removeLastOrderItem();
    }
  }, []);

  return (
    <div className="searchbar-wrapper">
      <section className="searchbar-wrapper__container">
        <div className="searchbar-wrapper__container--orderlist">
          {orderList.map((orderItem) => (
            <Item
              key={orderItem.id}
              type={orderItem.type}
              selected={orderItem.ingredient ?? orderItem.menuItem}
              showIcon={!!orderItem.menuItem}
            />
          ))}
        </div>
        <div className="searchbar-wrapper__container--search-container">
          <input type="text" onChange={onChange} onKeyDown={handleKeyDown} />
          <button className="searchbar-wrapper__container--search-container--button">
            <CloseIcon />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
