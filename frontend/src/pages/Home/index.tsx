import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FC, ChangeEvent } from "react";
import type { IItem, IMenuItem, IOrderItem, TOrderType } from "../../common/types";

import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import SearchResult from "../../components/SearchResult";
import { lastElement, fetchData, filterData } from "../../common/utils";

import "./styles.scss";

const Home: FC = () => {
  const navigate = useNavigate();
  const [isError, setError] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<IOrderItem[]>([]);
  const [input, setInput] = useState<string>("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<IItem[]>([]);
  const [resultType, setResultType] = useState<TOrderType>("and");

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
    setResultType(undefined);
  }, []);

  const handleItemSelected = useCallback(
    (item: IItem) => {
      switch (resultType) {
        case "menu-item":
          setOrderList((prevState): IOrderItem[] => [
            ...prevState.slice(0, -1),
            { ...prevState.slice(-1)[0], menuItem: item.item, price: item.price }
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
              ingredient: item.item,
              price: 0
            }
          ]);
          break;
        case "and":
          setOrderList((prevState): IOrderItem[] => [
            ...prevState,
            { id: prevState.length, type: "menu-item", price: 0 }
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
      { id: prevState.length, type: "and", price: 0 },
      { id: prevState.length + 1, type: "menu-item", price: 0 }
    ]);

    setResultType("menu-item");
    setInput("");
  }, []);

  const handleGetReceipt = useCallback(() => {
    setSearchResult([]);
    setResultType(undefined);
    navigate("/receipt");
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

  const handleBackgroundFocus = useCallback((value: boolean) => {
    setIsListOpen(value);
  }, []);

  const handleFocusCancel = useCallback(() => {
    handleBackgroundFocus(false);
  }, []);

  useEffect(() => {
    switch (resultType) {
      case "menu-item":
        fetchData<IMenuItem>("/menuitems", setError).then((data) => {
          console.log(data);
          setSearchResult(
            Object.entries(data).reduce((acc, [item, price]) => [...acc, { item, price }], [])
          );
        });
        break;
      case "ingredient":
        fetchData<string[]>(`/ingredients/${lastElement(orderList).menuItem}`, setError).then(
          (data) => setSearchResult(data.reduce((acc, item) => [...acc, { item, price: 0 }], []))
        );
        break;
      case "and":
        fetchData<string[]>(`/`, setError).then((data) =>
          setSearchResult(data.reduce((acc, item) => [...acc, { item, price: 0 }], []))
        );
        break;
    }
  }, [resultType]);

  return (
    <div className="home-wrapper">
      {isError ? (
        <>{/* TODO: Add Error Modal */}</>
      ) : (
        <section className="home-wrapper__container">
          <Nameplate />
          <SearchBar
            onRemoveOne={handleRemoveOneOnClick}
            onFocus={handleBackgroundFocus}
            orderList={orderList}
            onChange={handleInputChange}
            removeAllOrders={handleRemoveAllOrders}
            removeLastOrderItem={handleRemoveLastOrderItem}
            resultType={resultType}
            onBuy={handleGetReceipt}
            value={input}
          />
          {!!resultType && (
            <SearchResult
              orderList={orderList}
              resultType={resultType}
              results={filterData(searchResult, input)}
              onSelected={handleItemSelected}
              newMenuItem={handleNewMenuItem}
              collapse={!isListOpen}
            />
          )}
          <div className="home-wrapper__background" onClick={handleFocusCancel}></div>
        </section>
      )}
    </div>
  );
};

export default memo(Home);
