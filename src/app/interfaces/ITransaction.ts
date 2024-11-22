export interface Transaction {
  id: string;
  ticker: string;
  type: 'buy' | 'sell';
  amount: number;
  details: {
    shares: number;
    price: number;
  };
}
