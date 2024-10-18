import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { DataUsersService } from '../../data-users.service';

interface StockData {
  // Define the structure of your stock data here
  // This is an example, adjust according to the actual API response
  ticker: string;
  results: Array<{
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
  }>;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DataUsersService] // Add this line to provide the service
})
export class DashboardComponent implements OnInit {
  stockForm: FormGroup;
  stockData: StockData | null = null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataUsersService
  ) {
    this.stockForm = this.fb.group({
      ticker: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    history.pushState(null, '', '/dashboard');
  }

  ngOnInit() {
    history.pushState(null, '', '/dashboard');
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  getStockData() {
    if (this.stockForm.valid) {
      const { ticker, startDate, endDate } = this.stockForm.value;
      this.dataService.getStockData(ticker, startDate, endDate).subscribe({
        next: (data: StockData) => {
          this.stockData = data;
          console.log(data);
        },
        error: (error: unknown) => {
          console.error('Error fetching stock data', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}