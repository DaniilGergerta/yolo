export interface IOrderItem {
  id: number;
  type: TOrderType;
  menuItem?: string;
  ingredient?: string;
}

export interface IMenuItem {
  [key: string]: number;
}

export interface IReceipt {
  id: number;
  name: string;
  price: number;
}

export type TOrderType = "menu-item" | "ingredient" | "and";
