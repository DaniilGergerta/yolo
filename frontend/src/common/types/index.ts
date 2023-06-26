export interface IOrderItem {
  id: number;
  type: TOrderType;
  menuItem?: string;
  ingredient?: string;
  price: number;
}

export interface IMenuItem {
  [key: string]: number;
}

export interface IItem {
  item: string;
  price: number;
}

export interface IReceipt {
  id: number;
  name: string;
  price: number;
}

export type TOrderType = "menu-item" | "ingredient" | "and";
