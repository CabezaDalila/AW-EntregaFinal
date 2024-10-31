import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DollarRate } from '../../interfaces/dollar-rate.interface';
import { DollarRatesService } from '../../Services/dollar-rates.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dollar-rates',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DollarRatesService],
  templateUrl: './dollar-rates.component.html',
  styleUrls: ['./dollar-rates.component.scss']
})
export class DollarRatesComponent implements OnInit, OnDestroy {
  dollarRates: DollarRate[] = [];
  loading = true;
  updating = false;
  error: string | null = null;
  displayedRates = ['oficial', 'ccl', 'mep', 'cripto', 'bolsa'];
  previousRates: { [key: string]: number } = {};
  private updateSubscription?: Subscription;

  constructor(private dollarRatesService: DollarRatesService) {}

  ngOnInit() {
    this.loadDollarRates();
    // Update every 30 seconds
    this.updateSubscription = interval(30000).subscribe(() => {
      this.loadDollarRates();
    });
  }

  ngOnDestroy() {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  loadDollarRates() {
    this.updating = true;
    this.error = null;
    
    this.dollarRatesService.getDollarRates().subscribe({
      next: (rates) => {
        // Calculate variation
        rates.forEach(rate => {
          const previousRate = this.previousRates[rate.casa];
          if (previousRate) {
            rate.variacion = ((rate.venta - previousRate) / previousRate) * 100;
          }
          this.previousRates[rate.casa] = rate.venta;
        });

        // Filter rates to display
        this.dollarRates = rates.filter(rate => 
          this.displayedRates.includes(rate.casa.toLowerCase())
        );

        this.loading = false;
        this.updating = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las cotizaciones';
        this.loading = false;
        this.updating = false;
        console.error('Error fetching dollar rates:', error);
      }
    });
  }

  getRateDisplayName(rate: DollarRate): string {
    const displayNames: { [key: string]: string } = {
      'ccl': 'Contado con Liquidación',
      'oficial': 'Dólar Oficial',
      'blue': 'Dólar Blue',
      'mep': 'Dólar MEP',
      'cripto': 'Dólar Cripto',
      'bolsa': 'Dólar MEP'
    };
    return displayNames[rate.casa.toLowerCase()] || rate.nombre;
  }

  getIconForRate(rateName: string): string {
    const icons: { [key: string]: string } = {
      'Dólar Oficial': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'Contado con Liquidación': 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z',
      'Dólar Blue': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'Dólar MEP': 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      'Dólar Cripto': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      'Dólar Bolsa': 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
    };
    return icons[rateName] || icons['Dólar Oficial'];
  }

  getVariationClass(variacion: number | undefined): string {
    if (!variacion || variacion === 0) return 'text-gray-500';
    return variacion > 0 ? 'text-green-500' : 'text-red-500';
  }

  getVariationIcon(variacion: number | undefined): string {
    if (!variacion || variacion === 0) return 'M20 12H4';
    return variacion > 0 
      ? 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
      : 'M12 5l9-2-9 18-9-18 9 2zm0 0v8';
  }
}