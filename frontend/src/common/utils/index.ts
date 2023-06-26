import type { IReceipt, IOrderItem, IItem } from "common/types";
import type { Dispatch, SetStateAction } from "react";

export const fetchData = async <T>(
  endpoint: string,
  errorCallback: Dispatch<SetStateAction<boolean>>
): Promise<T> => {
  try {
    const response = await fetch("http://localhost:4000" + endpoint);
    if (response.ok) {
      return await response.json();
    }
    throw new Error();
  } catch (e) {
    errorCallback(true);
  }
};

export const filterData = (searchResult: IItem[], input: string): IItem[] =>
  searchResult.reduce(
    (acc, item) => (item.item.toLowerCase().includes(input.toLowerCase()) ? [...acc, item] : acc),
    []
  );

export const lastElement = <T>(array: T[]): T => array[array.length - 1];

export const getOrder = (orderList: IOrderItem[]): { total: number; receipt: IReceipt[] } => {
  const receipt: IReceipt[] = [];

  orderList.forEach((orderItem) =>
    orderItem.type === "menu-item"
      ? receipt.push({
          id: receipt.length + 1,
          name: orderItem.menuItem,
          price: orderItem.price
        })
      : orderItem.type === "ingredient"
      ? (receipt[
          receipt
            .map((order) => order.name === orderItem.menuItem && order.name)
            .lastIndexOf(orderItem.menuItem)
        ].price += orderItem.price)
      : null
  );

  return {
    total: receipt.reduce((acc, receiptItem) => acc + Number(receiptItem?.price), 0),
    receipt
  };
};
