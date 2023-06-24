import "./styles.scss";
import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState
} from "react";
import CloseIcon from "../../assets/svgs/CloseIcon";
import { IOrderItem, TOrderType } from "../../common/types";
import Item from "../Item";

interface Props {
  orderList: IOrderItem[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  removeAllOrders: () => void;
  removeLastOrderItem: () => void;
  value: string;
  onBuy: () => void;
  resultType: TOrderType | undefined;
  onFocus: (value: boolean) => void;
  onRemoveOne: (id: number) => void;
}

const SearchBar: FC<Props> = ({
  orderList,
  onChange,
  removeAllOrders,
  removeLastOrderItem,
  value,
  onBuy,
  resultType,
  onFocus,
  onRemoveOne
}) => {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace" && input.length === 0) {
        removeLastOrderItem();
      }
    },
    [input]
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
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={value}
              />
              {orderList[0] && orderList[0].menuItem && (
                <button
                  className="searchbar-wrapper__container--search-container--button--text"
                  onClick={() => onBuy()}
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
          <p className="searchbar-wrapper__container--text">Reciept</p>
        )}
      </section>
    </div>
  );
};

export default SearchBar;
