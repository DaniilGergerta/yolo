import React, { FC, useCallback, useEffect } from "react";

import Item from "../Item";
import { useAppDispatch } from "../../store";
import { setProducts } from "../../store/reducers/products";
import type { IItem, IOrderItem, TOrderType } from "../../common/types";

import "./styles.scss";

interface Props {
  orderList: IOrderItem[];
  results: IItem[];
  resultType: TOrderType;
  onSelected: (item: IItem) => void;
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

  const handleItemSelect = useCallback(
    (e: React.KeyboardEvent, item: IItem) => {
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
              item.item.toLowerCase() !== "menu-item" ? "disabled" : ""
            }`}
            tabIndex={0}
            onClick={item.item.toLowerCase() === "menu-item" ? () => onSelected(item) : undefined}
            onKeyDown={(e) => handleItemSelect(e, item)}
          >
            <Item
              type={item.item.toLowerCase()}
              selected={undefined}
              isWithColor
              disabled={item.item.toLowerCase() !== "menu-item"}
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
            <Item type={resultType} selected={item.item} />
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
