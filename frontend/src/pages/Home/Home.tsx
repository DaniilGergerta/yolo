import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import "./styles.scss";
import SearchResult from "../../components/SearchResult";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IOrderItem, TOrderType } from "../../common/types";

const initOrderList: IOrderItem = {
  id: 0,
  type: "menu-item"
};

const Home = () => {
  const [isError, setError] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrderItem[]>([initOrderList]);
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [resultType, setResultType] = useState<TOrderType>("menu-item");

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleRemoveLastOrderItem = useCallback(() => {
    setOrderList((prevState): IOrderItem[] => {
      if (prevState.length > 1) {
        return prevState.slice(0, -1);
      }
      return [initOrderList];
    });
  }, [orderList]);

  const handleItemSelected = useCallback(
    (item: string) => {
      setInput("");
      if (resultType === "menu-item") {
        setOrderList((prevState): IOrderItem[] => [
          ...prevState.slice(0, -1),
          {
            ...prevState.slice(-1)[0],
            menuItem: item
          }
        ]);
        setResultType("ingredient");
      }
      if (resultType === "ingredient") {
        setOrderList((prevState): IOrderItem[] => [
          ...prevState,
          {
            id: prevState.length,
            type: "ingredient",
            menuItem: lastElement(orderList).menuItem,
            ingredient: item
          }
        ]);
      }
    },
    [resultType, input]
  );

  const handleNewMenuItem = useCallback(() => {
    setInput("");
    setOrderList((prevState): IOrderItem[] => [
      ...prevState,
      {
        id: prevState.length,
        type: "and"
      },
      {
        id: prevState.length + 1,
        type: "menu-item"
      }
    ]);
    setResultType("menu-item");
  }, []);

  useEffect(() => {
    if (resultType === "menu-item") {
      fetchData<string[]>("/menuitems", setError).then((data) => setSearchResult(data));
    }
    if (resultType === "ingredient") {
      fetchData<string[]>(`/ingredients/${lastElement(orderList).menuItem}`, setError).then(
        (data) => setSearchResult(data)
      );
    }
  }, [resultType]);

  return (
    <div className="home-wrapper">
      {isError ? (
        <></>
      ) : (
        <section className="home-wrapper__container">
          <Nameplate />
          <SearchBar
            orderList={orderList}
            onChange={handleInputChange}
            removeLastOrderItem={handleRemoveLastOrderItem}
            value={input}
          />
          <SearchResult
            resultType={resultType}
            results={filterData(searchResult, input)}
            onSelected={handleItemSelected}
            newMenuItem={handleNewMenuItem}
          />
        </section>
      )}
    </div>
  );
};

export default Home;

const fetchData = async <T,>(
  endpoint: string,
  errorCallback: Dispatch<SetStateAction<boolean>>
): Promise<T> => {
  try {
    const response = await fetch("http://localhost:5000" + endpoint);
    if (response.ok) {
      return await response.json();
    }
    throw new Error();
  } catch (e) {
    errorCallback(true);
  }
};

const filterData = (searchResult: string[], input: string): string[] =>
  searchResult.filter((key) => key.toLowerCase().includes(input.toLowerCase()));

const lastElement = <T,>(array: T[]): T => array[array.length - 1];
