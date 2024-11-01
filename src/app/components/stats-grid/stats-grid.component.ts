import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-grid.component.html',
  styleUrls: ['./stats-grid.component.scss']
})
export class StatsGridComponent {
  availableCash = 100000;
  cashChange = 2.5;
  totalInvested = 75000;
  investmentReturn = 12.5;
  totalReturn = 25000;
  roi = 33.3;
}