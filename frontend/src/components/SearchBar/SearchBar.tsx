import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, ChangeEventHandler, FC, KeyboardEvent } from "react";
import type { IOrderItem, TOrderType } from "../../common/types";

import CloseIcon from "../../common/svgs/CloseIcon.svg";
import Item from "../Item";

import "./styles.scss";

interface Props {
  value: string;
  orderList: IOrderItem[];
  resultType: TOrderType | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  removeAllOrders: () => void;
  removeLastOrderItem: () => void;
  onBuy: () => void;
  onFocus: (value: boolean) => void;
  onRemoveOne: (id: number) => void;
}

const SearchBar: FC<Props> = ({
  value,
  orderList,
  resultType,
  onChange,
  removeAllOrders,
  removeLastOrderItem,
  onBuy,
  onFocus,
  onRemoveOne
}) => {
  const [input, setInput] = useState<string>("");

  const handleBuy = useCallback(() => {
    onBuy();
  }, [onBuy]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace" && input.length === 0) {
        removeLastOrderItem();
      } else if (e.key === "Enter") {
        handleBuy();
      }
    },
    [input, handleBuy]
  );

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange(e);
  }, []);

  useEffect(() => {
    setInput(value);
  }, [value]);

  return (
    <div className="searchbar-wrapper" onFocus={() => onFocus(true)} autoFocus>
      <section className="searchbar-wrapper__container">
        {resultType ? (
          <>
            <div className="searchbar-wrapper__container--orderlist">
              {orderList.map((orderItem) => (
                <Item
                  key={orderItem.id}
                  id={orderItem.id}
                  type={orderItem.type}
                  selected={orderItem.ingredient ?? orderItem.menuItem}
                  showIcon={!!orderItem.menuItem}
                  isWithColor={true}
                  onRemoveOne={onRemoveOne}
                />
              ))}
            </div>
            <div className="searchbar-wrapper__container--search-container">
              <input
                type="text"
                placeholder="Choose what you like"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={value}
              />
              {orderList[0] && orderList[0].menuItem && (
                <button
                  className="searchbar-wrapper__container--search-container--button--text"
                  onClick={handleBuy}
                >
                  buy
                </button>
              )}
              <button
                className="searchbar-wrapper__container--search-container--button"
                onClick={removeAllOrders}
              >
                <CloseIcon />
              </button>
            </div>
          </>
        ) : (
          <p className="searchbar-wrapper__container--text">{"Reciept"}</p>
        )}
      </section>
    </div>
  );
};

export default SearchBar;
