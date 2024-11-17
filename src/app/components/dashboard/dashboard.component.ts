import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { HeaderComponent } from '../../components/header/header.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, SideBarComponent, RouterModule, RouterOutlet,FooterComponent],
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
    // history.pushState(null, '', '/dashboard');
  }

  ngOnInit() {
    // history.pushState(null, '', '/dashboard');
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

}