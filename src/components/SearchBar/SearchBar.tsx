import "./styles.scss";
import { FC, PropsWithChildren } from "react";
import CloseIcon from "../../assets/svgs/CloseIcon";
import Item from "../Item";

interface Props {
  result?: string[];
}

const SearchBar: FC<PropsWithChildren<Props>> = () => {
  return (
    <div className="searchbar-wrapper">
      <section className="searchbar-wrapper__input">
        <input type="search" />
        <button className="searchbar-wrapper__input--button">
          <CloseIcon />
        </button>
      </section>
      <section className="searchbar-wrapper__results">
        <div className="searchbar-wrapper__results--item">
          <Item variant="menu-item" />
        </div>
        <div className="searchbar-wrapper__results--item">
          <Item variant="ingredient" />
        </div>
        <div className="searchbar-wrapper__results--item">
          <Item variant="and" />
        </div>
      </section>
    </div>
  );
};
export default SearchBar;
