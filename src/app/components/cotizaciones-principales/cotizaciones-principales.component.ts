import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiPolygonService } from '../../Services/api-polygon.service';

interface StockData {
  price: number;
  previousPrice: number;
  volume: number;
  lastUpdate: Date;
}

@Component({
  selector: 'app-cotizaciones-principales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotizaciones-principales.component.html',
  styleUrls: ['./cotizaciones-principales.component.scss'],
})
export class CotizacionesPrincipalesComponent implements OnInit {
  stocks: { [key: string]: number } = {
    AAPL: 0,
    MSFT: 0,
    KO: 0,
  };

  stocksData: { [key: string]: StockData } = {
    AAPL: { price: 0, previousPrice: 0, volume: 0, lastUpdate: new Date() },
    MSFT: { price: 0, previousPrice: 0, volume: 0, lastUpdate: new Date() },
    KO: { price: 0, previousPrice: 0, volume: 0, lastUpdate: new Date() },
  };

  companyNames: { [key: string]: string } = {
    AAPL: 'Apple Inc.',
    MSFT: 'Microsoft Corporation',
    KO: 'Coca-Cola Company',
  };

  updating = false;
  selectedStock: string | null = null;
  private readonly LOCAL_STORAGE_KEY = 'stocks_data';

  constructor(
    private http: HttpClient,
    private apiPolygon: ApiPolygonService
  ) {}

  ngOnInit() {
    this.loadStockPricesFromStorage();
    this.loadStocks();
  }

  loadStocks() {
    if (this.updating) return;
    this.updating = true;

    this.fetchStockPrices(Object.keys(this.stocks))
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
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  }

  formatPercentage(value: number): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  }

  formatVolume(volume: number): string {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  }

  getCompanyName(symbol: string): string {
    return this.companyNames[symbol] || symbol;
  }

  getPriceChange(symbol: string): number {
    const data = this.stocksData[symbol];
    if (!data.previousPrice) return 0;
    return ((data.price - data.previousPrice) / data.previousPrice) * 100;
  }

  getPriceChangeClass(change: number): string {
    return change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600';
  }

  getVolume(symbol: string): number {
    return this.stocksData[symbol].volume;
  }

  getLastUpdate(symbol: string): Date {
    return this.stocksData[symbol].lastUpdate;
  }

  private fetchStockPrices(symbols: string[]): Promise<void> {
    const requests = symbols.map((symbol) => {
      return this.apiPolygon
        .getStockPreviousClose(symbol)
        .pipe(
          catchError((error) => {
            console.error(`Error al obtener datos para ${symbol}:`, error);
            return of({ results: [{ c: 0, v: 0 }] });
          })
        )
        .toPromise()
        .then((data) => {
          if (data?.results?.[0]) {
            const currentPrice = data.results[0].c;
            this.stocksData[symbol] = {
              price: currentPrice,
              previousPrice: this.stocksData[symbol].price || currentPrice,
              volume: data.results[0].v || 0,
              lastUpdate: new Date()
            };
            this.stocks[symbol] = currentPrice;
          }
        });
    });

    return Promise.all(requests).then(() => {
      this.saveStockPrices();
    });
  }

  private saveStockPrices() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify({
      stocks: this.stocks,
      stocksData: this.stocksData
    }));
  }

  private loadStockPricesFromStorage() {
    const storedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (storedData) {
      const data = JSON.parse(storedData);
      this.stocks = data.stocks;
      this.stocksData = data.stocksData;
      // Convertir las fechas almacenadas en string a objetos Date
      Object.keys(this.stocksData).forEach(symbol => {
        this.stocksData[symbol].lastUpdate = new Date(this.stocksData[symbol].lastUpdate);
      });
    }
  }
}