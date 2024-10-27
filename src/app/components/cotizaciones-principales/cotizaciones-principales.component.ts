import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
interface Asset {
  symbol: string;
  price: number;
  change: number;
}
@Component({
  selector: 'app-cotizaciones-principales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cotizaciones-principales.component.html',
  styleUrl: './cotizaciones-principales.component.scss',
})
export class CotizacionesPrincipalesComponent implements OnInit {
  assets: Asset[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAssetData();
  }

  fetchAssetData() {
    // Replace these URLs with your actual API endpoints
    const apiUrls = [
      'https://api.example.com/eurusd',
      'https://api.example.com/oil',
      'https://api.example.com/spx500',
      'https://api.example.com/dj30',
      'https://api.example.com/nasdaq100',
    ];

    apiUrls.forEach((url) => {
      this.http.get<Asset>(url).subscribe(
        (data) => {
          this.assets.push(data);
        },
        (error) => {
          console.error('Error fetching asset data:', error);
        }
      );
    });
  }
}
