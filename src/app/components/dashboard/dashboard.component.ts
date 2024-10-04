import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    history.pushState(null, '', '/dashboard');
  }

  ngOnInit() {
    history.pushState(null, '', '/dashboard');
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}