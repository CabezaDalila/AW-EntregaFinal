import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DollarRate } from '../interfaces/dollar-rate.interface';

interface ApiDollarRate {
  casa: string;
  nombre: string;
  compra: string;
  venta: string;
  fechaActualizacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DollarRatesService {
  private apiUrl = 'https://dolarapi.com/v1/dolares';

  constructor(private http: HttpClient) {}

  getDollarRates(): Observable<DollarRate[]> {
    return this.http.get<ApiDollarRate[]>(this.apiUrl).pipe(
      map(rates => rates.map(rate => ({
        ...rate,
        compra: parseFloat(rate.compra),
        venta: parseFloat(rate.venta),
        fechaActualizacion: new Date(rate.fechaActualizacion)
      })))
    );
  }
}