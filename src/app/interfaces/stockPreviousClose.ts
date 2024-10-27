export interface StockPreviousClose {
  adjusted: boolean;
  queryCount: number;
  request_id: string;
  results: Result[];
  resultsCount: number;
  status: string;
  ticker: string;
}

export interface Result {
  T: string;
  c: number;
  h: number;
  l: number;
  o: number;
  t: number;
  v: number;
  vw: number;
}
