export interface Items {
  code: string;
  name: string;
  image: string;
  qty: number;
  price: number;
  categories: string;
  transactions?: number;
}

export interface Transactions {
  item: string; // The item's code
  qty: number;
  cust_name?: string;
  cust_phone?: string;
  cust_address?: string;
  type: "Sell" | "Restock";
  timestamp?: Date;
}
