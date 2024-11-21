import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { catchError, of } from 'rxjs';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  lastUpdate: Date;
}

@Component({
  selector: 'app-cotizaciones-principales',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cotizaciones-principales.component.html',
  styleUrls: ['./cotizaciones-principales.component.scss']
})
export class CotizacionesPrincipalesComponent implements OnInit {
  stocks: StockData[] = [
    { symbol: 'AAPL', price: 0, change: 0, changePercent: 0, volume: 0, lastUpdate: new Date() },
    { symbol: 'MSFT', price: 0, change: 0, changePercent: 0, volume: 0, lastUpdate: new Date() },
    { symbol: 'GOOGL', price: 0, change: 0, changePercent: 0, volume: 0, lastUpdate: new Date() },
    { symbol: 'AMZN', price: 0, change: 0, changePercent: 0, volume: 0, lastUpdate: new Date() }
  ];
  
  updating: boolean = false;
  error: string | null = null;
  private readonly LOCAL_STORAGE_KEY = 'stocksData';

  constructor(private apiPolygon: ApiPolygonService) {}

  ngOnInit() {
    this.loadStocksFromStorage();
    // Carga inicial
    this.loadStocks();
  }

  loadStocks() {
    if (this.updating) return;

    this.updating = true;
    this.error = null;

    const promises = this.stocks.map(stock => {
      return this.apiPolygon.getStockPreviousClose(stock.symbol)
        .pipe(
          catchError(error => {
            console.error(`Error fetching ${stock.symbol}:`, error);
            return of(null);
          })
        )
        .toPromise()
        .then(data => {
          if (data?.results?.[0]) {
            const result = data.results[0];
            const previousPrice = stock.price;
            stock.price = result.c;
            stock.volume = result.v;
            stock.change = result.c - result.o;
            stock.changePercent = ((result.c - result.o) / result.o) * 100;
            stock.lastUpdate = new Date();
          }
        });
    });

    Promise.all(promises)
      .then(() => {
        this.saveStocksToStorage();
      })
      .catch(error => {
        this.error = 'Error al actualizar las cotizaciones';
        console.error('Error updating stocks:', error);
      })
      .finally(() => {
        this.updating = false;
      });
  }

  private loadStocksFromStorage() {
    const savedData = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.stocks = parsedData.map((stock: any) => ({
        ...stock,
        lastUpdate: new Date(stock.lastUpdate)
      }));
    }
  }

  private saveStocksToStorage() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.stocks));
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  }

  formatPercent(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value / 100);
  }

  formatVolume(volume: number): string {
    if (volume >= 1000000) {
      return (volume / 1000000).toFixed(1) + 'M';
    } else if (volume >= 1000) {
      return (volume / 1000).toFixed(1) + 'K';
    }
    return volume.toString();
  }

  getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'hace menos de un minuto';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    
    const days = Math.floor(hours / 24);
    return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
  }
}