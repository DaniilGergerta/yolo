import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import "./styles.scss";
import SearchResult from "../../components/SearchResult";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IMenuItem, IOrderItem, TOrderType } from "../../common/types";
import { useAppDispatch } from "store";

export const Home = () => {
  const [isError, setError] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrderItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState(true);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [prices, setPrices] = useState<IMenuItem[] | null>(null);
  const [resultType, setResultType] = useState<TOrderType>("and");
  const [isOrderFull, setIsOrderFull] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleRemoveLastOrderItem = useCallback(() => {
    setOrderList((prevState): IOrderItem[] => {
      if (prevState.length > 1) {
        prevState[prevState.length - 1].type === "menu-item"
          ? setResultType("menu-item")
          : setResultType("ingredient");

        return prevState.slice(0, -1);
      }
      setResultType("menu-item");
      return [];
    });
  }, [orderList]);

  const handleRemoveAllOrders = useCallback(() => {
    setOrderList([]);
    setResultType("and");
  }, []);

  const handleItemSelected = useCallback(
    (item: string) => {
      switch (resultType) {
        case "menu-item":
          setOrderList((prevState): IOrderItem[] => [
            ...prevState.slice(0, -1),
            { ...prevState.slice(-1)[0], menuItem: item }
          ]);
          setResultType("ingredient");
          break;
        case "ingredient":
          setOrderList((prevState): IOrderItem[] => [
            ...prevState,
            {
              id: prevState.length,
              type: "ingredient",
              menuItem: lastElement(orderList).menuItem,
              ingredient: item
            }
          ]);
          break;
        case "and":
          setOrderList((prevState): IOrderItem[] => [
            ...prevState,
            { id: prevState.length, type: "menu-item" }
          ]);
          setResultType("menu-item");
          break;
      }
      setInput("");
    },
    [resultType, input]
  );

  const handleNewMenuItem = useCallback(() => {
    setOrderList((prevState): IOrderItem[] => [
      ...prevState,
      { id: prevState.length, type: "and" },
      { id: prevState.length + 1, type: "menu-item" }
    ]);
    setResultType("menu-item");
    setInput("");
  }, []);

  const handleGetReceipt = useCallback((finalOrder: IOrderItem[]) => {
    setSearchResult([]);
    setIsOrderFull(true);
  }, []);

  const handleRemoveOneOnClick = useCallback((id: number) => {
    setOrderList((prev) => {
      if (prev.length > 1) {
        return prev.filter((product) => product.id !== id);
      }
      setResultType("menu-item");
      return [];
    });
  }, []);

  const handleOnFocus = useCallback(
    (value: boolean) => {
      if (!isOrderFull) {
        setIsListOpen(value);
      }
    },
    [isOrderFull]
  );

  useEffect(() => {
    if (resultType === "menu-item") {
      fetchData<IMenuItem[]>("/menuitems", setError).then((data) => {
        setSearchResult(Object.keys(data));
        setPrices(Object.values(data));
      });
    }
    if (resultType === "ingredient") {
      fetchData<string[]>(`/ingredients/${lastElement(orderList).menuItem}`, setError).then(
        (data) => setSearchResult(data)
      );
    }
    if (resultType === "and") {
      fetchData<string[]>(`/`, setError).then((data) => setSearchResult(data));
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
            onRemoveOne={handleRemoveOneOnClick}
            onFocus={handleOnFocus}
            isOrderFull={isOrderFull}
            orderList={orderList}
            onChange={handleInputChange}
            removeAllOrders={handleRemoveAllOrders}
            removeLastOrderItem={handleRemoveLastOrderItem}
            onBuy={handleGetReceipt}
            value={input}
          />
          <SearchResult
            orderList={orderList}
            isOrderFull={isOrderFull}
            resultType={resultType}
            results={filterData(searchResult, input)}
            onSelected={handleItemSelected}
            newMenuItem={handleNewMenuItem}
            collapse={!isListOpen}
          />
        </section>
      )}
      <div className="home-wrapper__background" onClick={() => handleOnFocus(false)}></div>
    </div>
  );
};

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
