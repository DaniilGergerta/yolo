import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import "./styles.scss";
import SearchResult from "../../components/SearchResult";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { IMenuItem, IOrderItem, TOrderType } from "../../common/types";

const initOrderList: IOrderItem = {
  id: 0,
  type: "menu-item"
};

const Home = () => {
  const [isError, setError] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrderItem[]>([initOrderList]);
  const [input, setInput] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState(true);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [prices, setPrices] = useState<IMenuItem[] | null>(null);
  const [resultType, setResultType] = useState<TOrderType>("menu-item");
  const [isOrderFull, setIsOrderFull] = useState(false);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleRemoveLastOrderItem = useCallback(() => {
    setOrderList((prevState): IOrderItem[] => {
      if (prevState.length > 1) {
        prevState[prevState.length - 1].type === 'menu-item'
          ? setResultType("menu-item")
          : setResultType("ingredient")

        return prevState.slice(0, -1);
      }
      setResultType("menu-item")
      return [initOrderList];
    });
  }, [orderList]);

  const handleRemoveAllOrders = useCallback(() => {
    setOrderList([initOrderList]);
    setResultType("menu-item");
  }, []);

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
    console.log(orderList);
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

  const handleGetReceipt = useCallback((finalOrder: IOrderItem[]) => {
    setIsOrderFull(true)
    console.log(finalOrder);
  }, []);

  const handleRemoveOneOnClick = useCallback((id: number) => {
    setOrderList(prev => {
      if (prev.length > 1) {
        return prev.filter(product => product.id !== id)
      }

      setResultType("menu-item")
      return [initOrderList];
    });
  }, [])

  const handleOnFocus = useCallback((value: boolean) => {
    setIsListOpen(value)
  }, [])

  useEffect(() => {
    if (resultType === "menu-item") {
      fetchData<IMenuItem[]>("/menuitems", setError).then((data) => {
        console.log(Object.values(data));
        setSearchResult(Object.keys(data))
        setPrices(Object.values(data));
      });
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
          {isListOpen && (
            <SearchResult
              orderList={orderList}
              isOrderFull={isOrderFull}
              resultType={resultType}
              results={filterData(searchResult, input)}
              onSelected={handleItemSelected}
              newMenuItem={handleNewMenuItem}
            />
          )}
        </section>
      )}
      <div
        className="home-wrapper__background"
        onClick={() => handleOnFocus(false)}
      >
      </div>
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
