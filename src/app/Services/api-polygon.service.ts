import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStockDetailResponse } from '../interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class ApiPolygonService {
  private apiKey = '8nkipGR5ayMVs3Ax0tvUAuhhMxuWOa7z';
  private baseUrl = 'https://api.polygon.io/v2/aggs/ticker/';
  constructor(private http: HttpClient) { }
 

  getDetailStock(ticker: string, startDate: string, endDate: string): Observable<IStockDetailResponse> {
    const url = `${this.baseUrl}${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${this.apiKey}`;
    return this.http.get<IStockDetailResponse>(url);
  }
}