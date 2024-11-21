import { Component } from '@angular/core';
import { CotizacionesPrincipalesComponent } from '../cotizaciones-principales/cotizaciones-principales.component';
import { DollarRatesComponent } from '../dolar-rate/dollar-rates.component';
import { PortfolioDistributionComponent } from '../portfolio-distribution/portfolio-distribution.component';
import { PortfolioSummaryComponent } from '../portfolio-summary/portfolio-summary.component';
import { StatsGridComponent } from '../stats-grid/stats-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PortfolioSummaryComponent,
    DollarRatesComponent,
    PortfolioDistributionComponent,
    StatsGridComponent,
    CotizacionesPrincipalesComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
