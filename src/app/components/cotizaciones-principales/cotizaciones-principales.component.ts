// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { catchError, of } from 'rxjs';
// import { ApiPolygonService } from '../../Services/api-polygon.service';
// @Component({
//   selector: 'app-cotizaciones-principales',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './cotizaciones-principales.component.html',
//   styleUrl: './cotizaciones-principales.component.scss',
// })
// export class CotizacionesPrincipalesComponent implements OnInit {
//   // Cache para almacenar los últimos datos válidos
//   private stockCache: {
//     [symbol: string]: {
//       price: number;
//       timestamp: number;
//     };
//   } = {};
//   stocks: { [key: string]: number | null } = {};
//   symbols: string[] = [];
//   prices: number[] = [];
//   private readonly CACHE_DURATION = 60000; // 1 minuto en milisegundos
//   private requestCount = 0;
//   private readonly MAX_REQUESTS = 5;
//   private lastResetTime = Date.now();

//   constructor(
//     private http: HttpClient,
//     private apiPolygon: ApiPolygonService
//   ) {}

//   ngOnInit() {
//     this.getStockPrices(['KO', 'AAPL', 'MSFT']);
//   }

//   private canMakeRequest(): boolean {
//     const now = Date.now();
//     // Resetear el contador si ha pasado más de un minuto
//     if (now - this.lastResetTime >= 60000) {
//       this.requestCount = 0;
//       this.lastResetTime = now;
//       return true;
//     }
//     return this.requestCount < this.MAX_REQUESTS;
//   }

//   private getCachedPrice(symbol: string): number | null {
//     const cachedData = this.stockCache[symbol];
//     if (cachedData && Date.now() - cachedData.timestamp < this.CACHE_DURATION) {
//       return cachedData.price;
//     }
//     return null;
//   }

//   getStockPrices(symbols: string[]) {
//     symbols.forEach((symbol, index) => {
//       // Primero intentar obtener del cache
//       const cachedPrice = this.getCachedPrice(symbol);
//       if (cachedPrice !== null) {
//         this.symbols[index] = symbol;
//         this.prices[index] = cachedPrice;
//         console.log(`Using cached data for ${symbol}:`, cachedPrice);
//         return;
//       }

//       // Si no está en cache y podemos hacer request
//       if (this.canMakeRequest()) {
//         this.requestCount++;
//         this.apiPolygon
//           .getStockPreviousClose(symbol)
//           .pipe(
//             catchError((error) => {
//               console.error(`Error fetching data for ${symbol}`, error);
//               // Si hay error, intentar usar datos en cache aunque estén vencidos
//               const oldCachedData = this.stockCache[symbol];
//               if (oldCachedData) {
//                 return of({ results: [{ c: oldCachedData.price }] });
//               }
//               return of({ results: [{ c: null }] });
//             })
//           )
//           .subscribe((data) => {
//             const price = data.results[0].c;
//             this.symbols[index] = symbol;
//             this.prices[index] = price;

//             // Guardar en cache
//             this.stockCache[symbol] = {
//               price: price,
//               timestamp: Date.now(),
//             };

//             console.log(`Updated data for ${symbol}:`, price);
//             console.log('Cache:', this.stockCache);
//           });
//       } else {
//         // Si no podemos hacer más requests, usar el último dato conocido
//         const lastKnownPrice = this.stockCache[symbol]?.price ?? null;
//         this.symbols[index] = symbol;
//         this.prices[index] = lastKnownPrice;
//         console.log(
//           `Using last known data for ${symbol} due to rate limit:`,
//           lastKnownPrice
//         );
//       }
//     });
//   }

//   formatPrice(price: number | null): string {
//     return price !== null ? price.toFixed(2) : 'N/A';
//   }
// }

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiPolygonService } from '../../Services/api-polygon.service';

@Component({
  selector: 'app-cotizaciones-principales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotizaciones-principales.component.html',
  styleUrl: './cotizaciones-principales.component.scss',
})
export class CotizacionesPrincipalesComponent {
  stocks: { [key: string]: number } = {
    KO: 0,
    AAPL: 0,
    MSFT: 0,
  };

  updating = false;
  private readonly LOCAL_STORAGE_KEY = 'stocks';

  constructor(
    private http: HttpClient,
    private apiPolygon: ApiPolygonService
  ) {}

  loadStocks() {
    if (this.updating) return;

    this.updating = true;

    this.fetchStockPrices(['KO', 'AAPL', 'MSFT'])
      .catch((error) => {
        console.error('Error al actualizar los precios:', error);
      })
      .finally(() => {
        this.updating = false;
      });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  }

  private fetchStockPrices(symbols: string[]): Promise<void> {
    const requests = symbols.map((symbol) => {
      return this.apiPolygon
        .getStockPreviousClose(symbol)
        .pipe(
          catchError((error) => {
            console.error(`Error al obtener datos para ${symbol}:`, error);
            return of({ results: [{ c: 0 }] });
          })
        )
        .toPromise()
        .then((data) => {
          if (data?.results?.[0]?.c > 0) {
            this.stocks[symbol] = data.results[0].c;
          } else {
            console.warn(`Precio inválido para ${symbol}, se mantiene en 0.`);
          }
        });
    });

    return Promise.all(requests).then(() => {
      this.saveStockPrices();
    });
  }

  private saveStockPrices() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.stocks));
  }

  private loadStockPricesFromStorage() {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedData) {
      this.stocks = JSON.parse(storedData);
    }
  }
}
