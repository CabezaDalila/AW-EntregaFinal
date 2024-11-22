import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { DollarRate } from '../interfaces/IdollarRate';

interface ApiDollarRate {
  casa: string;
  nombre: string;
  compra: string;
  venta: string;
  fechaActualizacion: string;
}

@Injectable({
  providedIn: 'root',
})
export class DollarRatesService {
  private apiUrl = 'https://dolarapi.com/v1/dolares';

  constructor(private http: HttpClient) {}

  getDollarRates(): Observable<DollarRate[]> {
    const mainRates = this.http.get<ApiDollarRate[]>(this.apiUrl);
    const cclRate = this.http.get<ApiDollarRate>(
      `${this.apiUrl}/contadoconliqui`
    );

    return forkJoin({
      main: mainRates,
      ccl: cclRate,
    }).pipe(
      map(({ main, ccl }) => {
        const allRates = [...main, ccl];
        return allRates.map((rate) => this.transformApiRate(rate));
      })
    );
  }

  private transformApiRate(apiRate: ApiDollarRate): DollarRate {
    return {
      casa: apiRate.casa,
      nombre: apiRate.nombre,
      compra: parseFloat(apiRate.compra),
      venta: parseFloat(apiRate.venta),
      fechaActualizacion: new Date(apiRate.fechaActualizacion),
      variacion: undefined, // Se puede calcular más tarde si es necesario
    };
  }
}
