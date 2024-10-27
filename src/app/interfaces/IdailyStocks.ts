import { IStock } from "./stock";

export interface IDailyStocksResponse {
    "adjusted": boolean;
    "queryCount": number;
    "results": IStockWithName[];
}
interface IStockWithName extends IStock {
    "T": string;
}
