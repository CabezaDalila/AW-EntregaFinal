import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { HeaderComponent } from '../../components/header/header.component'


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ApiPolygonService] 
})
export class DashboardComponent implements OnInit {
  stockForm: FormGroup;
  stockData: any;

  constructor(
    public auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private apiPolygon: ApiPolygonService
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
      this.apiPolygon.getStockData(ticker, startDate, endDate).subscribe(
        (data) => {
          this.stockData = data; // Almacenar los datos para mostrarlos en la vista
          console.log(this.stockData);
        },
        (error) => {
          console.error('Error fetching stock data', error);
        }
      );
    } else {
      console.log('Formulario no es válido');
    }
  }
 
}