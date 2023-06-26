import React, { FC, useCallback, useEffect } from "react";
import Item from "../Item";
import { IOrderItem, TOrderType } from "../../common/types";
import { useAppDispatch, useAppSelector } from "store";
import { setProducts } from "store/reducers/products";
import "./styles.scss";

interface Props {
  orderList: IOrderItem[];
  results: string[];
  resultType: TOrderType;
  onSelected: (item: string) => void;
  newMenuItem: () => void;
  collapse: boolean;
}

const SearchResult: FC<Props> = ({
  orderList,
  results,
  resultType,
  onSelected,
  newMenuItem,
  collapse
}) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((s) => s.products);

  const handleItemSelect = useCallback(
    (e: React.KeyboardEvent, item: string) => {
      if (e.key == "Enter" || e.key == "Space") {
        item ? onSelected(item) : newMenuItem;
      }
    },
    [resultType]
  );

  useEffect(() => {
    dispatch(setProducts(orderList));
  }, [orderList]);

  return (
    <section className={`results-wrapper ${collapse ? "collapse" : ""}`}>
      {results.map((item, index) =>
        resultType === "and" ? (
          <div
            key={index}
            className={`results-wrapper--item ${
              item.toLowerCase() !== "menu-item" ? "disabled" : ""
            }`}
            tabIndex={0}
            onClick={item.toLowerCase() === "menu-item" ? () => onSelected(item) : undefined}
            onKeyDown={(e) => handleItemSelect(e, item)}
          >
            <Item
              type={item.toLowerCase()}
              selected={undefined}
              isWithColor
              disabled={item.toLowerCase() !== "menu-item"}
              showIcon={false}
            />
          </div>
        ) : (
          <div
            key={index}
            className="results-wrapper--item"
            tabIndex={0}
            onClick={() => onSelected(item)}
            onKeyDown={(e) => handleItemSelect(e, item)}
          >
            <Item type={resultType} selected={item} />
          </div>
        )
      )}
      {resultType == "ingredient" && (
        <div
          className="results-wrapper--item"
          tabIndex={0}
          onClick={() => newMenuItem()}
          onKeyDown={(e) => handleItemSelect(e, undefined)}
        >
          <Item type={"and"} isWithColor={true} isOnList={true} />
        </div>
      )}
      {!results.length && resultType != "ingredient" && (
        <div className="results-wrapper--no-results">No Results Found</div>
      )}
    </section>
  );
};
export default SearchResult;
