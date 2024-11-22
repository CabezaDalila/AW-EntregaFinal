export interface IStockDetailResponse {
  adjusted: boolean;
  next_url: string;
  queryCount: number;
  request_id: string;
  results: IStock[];
  resultsCount: number;
  status: string;
  ticker: string;
}
export interface IStock {
  c: number;
  h: number;
  l: number;
  n: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}
