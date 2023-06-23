import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import "./styles.scss";
import SearchResult from "../../components/SearchResult";
import { useEffect, useState } from "react";
import { IOrderItem } from "../../common/types";

const Home = () => {
  const [isError, setError] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrderItem[]>([]);
  const [searchResult, setSearchResult] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/");

        if (response.ok) {
          const data = await response.json();
        }
      } catch (e) {
        setError(true);
      }
    };
    void fetchData();
  }, []);

  return (
    <div className="home-wrapper">
      {isError ? (
        <></>
      ) : (
        <section className="home-wrapper__container">
          <Nameplate />
          <SearchBar orderList={[]} />
          <SearchResult results={[]} />
        </section>
      )}
    </div>
  );
};

export default Home;
