import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  animations: [
    trigger('slideInOut', [
      state('out', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('out => in', [
        animate('300ms ease-out')
      ]),
      transition('in => out', [
        animate('300ms ease-in')
      ])
    ])
  ],
  styles: []
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;
  isDashboard = false;

  constructor(public auth: AuthService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isDashboard = this.router.url === '/dashboard';
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logOut() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
    this.toggleMenu();
  }

  @Output() loginClick = new EventEmitter<void>();
  @Output() createAccountClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
    this.toggleMenu();
  }

  onCreateAccountClick() {
    this.createAccountClick.emit();
    this.toggleMenu();
  }
}