import { EOrderType } from "../enums";

export type TOrderType = keyof typeof EOrderType;

export interface IOrderItem {
  type: TOrderType;
  ingredient: string;
  price: number;
}
