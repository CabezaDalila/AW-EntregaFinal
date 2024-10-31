import { Component } from '@angular/core';
import { PortfolioSummaryComponent } from '../portfolio-summary/portfolio-summary.component';
import { DollarRatesComponent } from '../dolar-rate/dollar-rates.component';
import { PortfolioDistributionComponent } from '../portfolio-distribution/portfolio-distribution.component';
import { StatsGridComponent } from '../stats-grid/stats-grid.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PortfolioSummaryComponent,DollarRatesComponent,PortfolioDistributionComponent,StatsGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
