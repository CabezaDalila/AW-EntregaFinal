import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DollarRate } from '../../interfaces/dollar-rate.interface';
import { DollarRatesService } from '../../Services/dollar-rates.service';


@Component({
  selector: 'app-dollar-rates',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [DollarRatesService],
  templateUrl: './dollar-rates.component.html',
  styleUrls: ['./dollar-rates.component.scss']
})
export class DollarRatesComponent implements OnInit {
  dollarRates: DollarRate[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dollarRatesService: DollarRatesService) {}

  ngOnInit() {
    this.loadDollarRates();
  }

  loadDollarRates() {
    this.loading = true;
    this.error = null;
    
    this.dollarRatesService.getDollarRates().subscribe({
      next: (rates) => {
        this.dollarRates = rates;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar las cotizaciones';
        this.loading = false;
        console.error('Error fetching dollar rates:', error);
      }
    });
  }
}