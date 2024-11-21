import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDailyStocksResponse } from '../interfaces/IdailyStocks';
import { IStockDetailResponse } from '../interfaces/stock';
@Injectable({
  providedIn: 'root',
})
export class ApiPolygonService {
  private apiKey = '8nkipGR5ayMVs3Ax0tvUAuhhMxuWOa7z';
  private baseUrl = 'https://api.polygon.io/v2/aggs/ticker/';
  constructor(private http: HttpClient) {}

  getDetailStock(
    ticker: string,
    startDate: string,
    endDate: string
  ): Observable<IStockDetailResponse> {
    const url = `${this.baseUrl}${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${this.apiKey}`;
    return this.http.get<IStockDetailResponse>(url);
  }

  getDailyStocks(date: string): Observable<IDailyStocksResponse> {
    const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?apiKey=${this.apiKey}`;
    return this.http.get<IDailyStocksResponse>(url);
  }

  getStockPreviousClose(ticker: string): Observable<any> {
    const url = `${this.baseUrl}${ticker}/prev?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
