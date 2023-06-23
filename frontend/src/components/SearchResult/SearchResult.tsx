import { FC, KeyboardEvent, useCallback } from "react";
import "./styles.scss";
import Item from "../Item";
import { TOrderType } from "../../common/types";

interface Props {
  results: string[];
  resultType: TOrderType;
  onSelected: (item: string) => void;
  onNewMenuItem: () => void;
}

const SearchResult: FC<Props> = ({ results, resultType, onSelected, onNewMenuItem }) => {
  const keyDownHandler = useCallback(
    (e: KeyboardEvent, item: string) => {
      if (e.key == "Enter" || e.key == "Space") {
        onSelected(item);
      }
    },
    [resultType]
  );

  return (
    <section className="results-wrapper">
      {resultType == "and"
        ? results.map((item: string) => (
            <div
              key={item}
              className="results-wrapper--item"
              tabIndex={0}
              onClick={() => onSelected(item)}
              onKeyDown={(e) => keyDownHandler(e, item)}
            >
              <Item type={item.toLowerCase() as TOrderType} />
            </div>
          ))
        : results.map((item, i) => (
            <div
              key={item}
              className="results-wrapper--item"
              tabIndex={i}
              onClick={() => onSelected(item)}
              onKeyDown={(e) => keyDownHandler(e, item)}
            >
              {item}
            </div>
          ))}
      {resultType == "ingredient" && (
        <div
          className="results-wrapper--item"
          tabIndex={0}
          onClick={() => onNewMenuItem()}
          onKeyDown={(e) => keyDownHandler(e, "and")}
        >
          <Item type={"and"} />
        </div>
      )}
      {!results.length && <div className="results-wrapper--no-results">No Results Found</div>}
    </section>
  );
};
export default SearchResult;
