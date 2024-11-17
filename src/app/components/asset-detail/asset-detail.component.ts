import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface AssetDetail {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  buyPoints: number;
  sellPoints: number;
}

@Component({
  selector: 'app-asset-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.scss']
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
    sellPoints: 0
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
      }
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
        change: 0.20,
        changePercent: 2.90,
        marketCap: 4620000000,
        volume: 2902040,
        openPrice: 6.88,
        highPrice: 7.09,
        lowPrice: 6.88,
        buyPoints: 0.89,
        sellPoints: 8.30
      };
      this.loading = false;
    }, 1000);
  }

  toggleWatchlist() {
    this.isInWatchlist = !this.isInWatchlist;
    // Aquí irías a guardar el estado en tu servicio
  }

  formatLargeNumber(value: number): string {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(2) + 'B';
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + 'M';
    }
    return value.toString();
  }

  // Método para verificar si los datos están cargados
  get isDataLoaded(): boolean {
    return !this.loading && !this.error && this.asset.symbol !== '';
  }
}