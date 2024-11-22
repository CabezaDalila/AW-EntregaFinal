import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssetDetail } from '../../interfaces/IassetDetail';

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss'],
})
export class AssetDetailComponent implements OnInit, OnDestroy {
  private routeSub!: Subscription;
  loading: boolean = true;
  error: string | null = null;
  isInWatchlist = false;

  asset: AssetDetail = {
    symbol: '',
    name: '',
    price: 0,
    change: 0,
    changePercent: 0,
    marketCap: 0,
    volume: 0,
    openPrice: 0,
    highPrice: 0,
    lowPrice: 0,
    buyPoints: 0,
    sellPoints: 0,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe({
      next: (params) => {
        const symbol = params['symbol'];
        if (symbol) {
          this.loadAssetData(symbol);
        }
      },
      error: (error) => {
        this.error = 'Error al cargar los datos del activo';
        this.loading = false;
        console.error('Error en los parámetros de ruta:', error);
      },
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private loadAssetData(symbol: string) {
    this.loading = true;
    this.error = null;

    // Simulación de carga de datos
    setTimeout(() => {
      this.asset = {
        symbol: symbol,
        name: 'American Airlines Group Inc.',
        price: 7.08,
        change: 0.2,
        changePercent: 2.9,
        marketCap: 4620000000,
        volume: 2902040,
        openPrice: 6.88,
        highPrice: 7.09,
        lowPrice: 6.88,
        buyPoints: 0.89,
        sellPoints: 8.3,
      };
      this.loading = false;
    }, 1000);
  }

  toggleWatchlist() {
    this.isInWatchlist = !this.isInWatchlist;
  }

  formatLargeNumber(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    }
    return value.toString();
  }

  get isDataLoaded(): boolean {
    return !this.loading && !this.error && this.asset.symbol !== '';
  }
}
