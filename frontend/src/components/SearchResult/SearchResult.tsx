import React, { FC, useCallback } from "react";
import "./styles.scss";
import Item from "../Item";
import { IOrderItem, IReceipt, TOrderType } from "../../common/types";
import Order from "components/Order";

interface Props {
  orderList: IOrderItem[];
  results: string[];
  resultType: TOrderType;
  onSelected: (item: string) => void;
  newMenuItem: () => void;
  isOrderFull: boolean
}

const SearchResult: FC<Props> = ({
  orderList,
  results,
  resultType,
  onSelected,
  newMenuItem,
  isOrderFull,
}) => {
  const handleItemSelect = useCallback(
    (e: React.KeyboardEvent, item: string) => {
      if (e.key == "Enter" || e.key == "Space") {
        item ? onSelected(item) : newMenuItem;
      }
    },
    [resultType]
  );

  return (
    <section
      className="results-wrapper"
    >
      {isOrderFull
        ? (
          <Order orderList={orderList} />
        ) : (
          <>
            {results.map((item, index) => (
              <div
                key={index}
                className="results-wrapper--item"
                tabIndex={0}
                onClick={() => onSelected(item)}
                onKeyDown={(e) => handleItemSelect(e, item)}
              >
                <Item
                  type={resultType}
                  selected={item}
                />
              </div>
            ))}
            {resultType == "ingredient" && (
              <div
                className="results-wrapper--item"
                tabIndex={0}
                onClick={() => newMenuItem()}
                onKeyDown={(e) => handleItemSelect(e, undefined)}
              >
                <Item
                  type={"and"}
                  isWithColor={true}
                  isOnList={true}
                />
              </div>
            )}
            {!results.length && resultType != "ingredient" && (
              <div className="results-wrapper--no-results">No Results Found</div>
            )}
          </>
        )}

    </section>
  );
};
export default SearchResult;
