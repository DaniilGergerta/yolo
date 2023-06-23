export interface IOrderItem {
  id: number;
  type: TOrderType;
  menuItem?: string;
  ingredient?: string;
}

export type TOrderType = "menu-item" | "ingredient" | "and";
