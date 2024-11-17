import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-portfolio-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.scss']
})
export class PortfolioSummaryComponent {
  totalPortfolio = 100000;
  monthlyChange = 2.4;
}