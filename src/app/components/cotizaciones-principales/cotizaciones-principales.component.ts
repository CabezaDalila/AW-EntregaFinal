import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPolygonService } from '../../Services/api-polygon.service';
@Component({
  selector: 'app-cotizaciones-principales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotizaciones-principales.component.html',
  styleUrl: './cotizaciones-principales.component.scss',
})
export class CotizacionesPrincipalesComponent implements OnInit {
  stocks: { [key: string]: number | null } = {};
  symbols: string[] = [];
  prices: number[] = [];

  constructor(
    private http: HttpClient,
    private apiPolygon: ApiPolygonService
  ) {}

  ngOnInit() {
    this.getStockPrices(['KO', 'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'TSLA']);
  }

  getStockPrices(symbols: string[]) {
    symbols.forEach((symbol, index) => {
      this.apiPolygon.getStockPreviousClose(symbol).subscribe(
        (data) => {
          const price = data.results[0].c;
          this.symbols[index] = symbol;
          this.prices[index] = price;
          console.log(this.symbols, this.prices);
        },
        (error) => {
          console.error(`Error fetching data for ${symbol}`, error);
        }
      );
    });
  }

  formatPrice(price: number | null): string {
    return price !== null ? price.toFixed(2) : 'N/A';
  }
}
