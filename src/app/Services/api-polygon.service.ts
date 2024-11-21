import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDailyStocksResponse } from '../interfaces/IdailyStocks';
import { IStockDetailResponse } from '../interfaces/stock';
@Injectable({
  providedIn: 'root',
})
export class ApiPolygonService {
  private apiKey = '8nkipGR5ayMVs3Ax0tvUAuhhMxuWOa7z';
  private baseUrl = 'https://api.polygon.io/v2/aggs/ticker/';
  constructor(private http: HttpClient) {}
  private dailyStocks?: IDailyStocksResponse;
  getDetailStock(
    ticker: string,
    startDate: string,
    endDate: string
  ): Observable<IStockDetailResponse> {
    const url = `${this.baseUrl}${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${this.apiKey}`;
    return this.http.get<IStockDetailResponse>(url);
  }

  getDailyStocks(date: string): Observable<IDailyStocksResponse> {
    if (!this.dailyStocks) {
      const url = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date}?apiKey=${this.apiKey}`;
      const $request = this.http.get<IDailyStocksResponse>(url)
      $request.subscribe(response => {
        this.dailyStocks = response;
      })
      return $request;
    }
    return of(this.dailyStocks);
  }
  getStockPreviousClose(ticker: string): Observable<any> {
    const url = `${this.baseUrl}${ticker}/prev?apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}
