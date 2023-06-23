import { FC, ReactNode } from "react";
import "./styles.scss";

interface Props {
  results: ReactNode[];
}

const SearchResult: FC<Props> = ({ results }) => {
  return (
    <section className="results-wrapper">
      {results.map((item, i) => (
        <div key={i} className="results-wrapper--item">
          {item}
        </div>
      ))}
    </section>
  );
};
export default SearchResult;
