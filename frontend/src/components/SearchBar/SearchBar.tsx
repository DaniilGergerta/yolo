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
import { IOrderItem } from "../../common/types";
import Item from "../Item";

interface Props {
  orderList: IOrderItem[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  removeLastOrderItem: () => void;
  value: string;
}

const SearchBar: FC<Props> = ({ orderList, onChange, removeLastOrderItem, value }) => {
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
          <input type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} value={value} />
          <button className="searchbar-wrapper__container--search-container--button">
            <CloseIcon />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
