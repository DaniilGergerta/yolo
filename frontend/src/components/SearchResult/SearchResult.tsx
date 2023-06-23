import React, { FC, useCallback } from "react";
import "./styles.scss";
import Item from "../Item";
import { TOrderType } from "../../common/types";

interface Props {
  results: string[];
  resultType: TOrderType;
  onSelected: (item: string) => void;
  newMenuItem: () => void;
}

const SearchResult: FC<Props> = ({ results, resultType, onSelected, newMenuItem }) => {
  const handleItemSelect = useCallback(
    (e: React.KeyboardEvent, item: string) => {
      if (e.key == "Enter" || e.key == "Space") {
        item ? onSelected(item) : newMenuItem;
      }
    },
    [resultType]
  );

  return (
    <section className="results-wrapper">
      {results.map((item, i) => (
        <div
          key={i}
          className="results-wrapper--item"
          tabIndex={0}
          onClick={() => onSelected(item)}
          onKeyDown={(e) => handleItemSelect(e, item)}
        >
          {item}
        </div>
      ))}
      {resultType == "ingredient" && (
        <div
          className="results-wrapper--item"
          tabIndex={0}
          onClick={() => newMenuItem()}
          onKeyDown={(e) => handleItemSelect(e, undefined)}
        >
          <Item type={"and"} />
        </div>
      )}
      {!results.length && resultType != "ingredient" && (
        <div className="results-wrapper--no-results">No Results Found</div>
      )}
    </section>
  );
};
export default SearchResult;
