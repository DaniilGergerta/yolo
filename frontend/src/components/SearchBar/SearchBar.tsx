import "./styles.scss";
import { FC, ReactNode } from "react";
import CloseIcon from "../../assets/svgs/CloseIcon";

interface Props {
  orderList: ReactNode[];
}

const SearchBar: FC<Props> = ({ orderList }) => {
  return (
    <div className="searchbar-wrapper">
      <section className="searchbar-wrapper__container">
        <div className="searchbar-wrapper__container--query">{orderList}</div>
        <div className="searchbar-wrapper__container--search-container">
          <input type="text" />
          <button className="searchbar-wrapper__container--search-container--button">
            <CloseIcon />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SearchBar;
