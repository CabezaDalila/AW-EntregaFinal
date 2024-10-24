import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="fixed w-full top-0 z-20 transition-all duration-300" [ngClass]="{'bg-purple-900': !isScrolled, 'bg-purple-800 bg-opacity-80': isScrolled}">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex-shrink-0 w-1/4">
            <a routerLink="/" class="text-2xl font-bold text-white flex items-center">
              <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
            </a>
          </div>
          <ng-container *ngIf="(auth.user$ | async) === null && !isDashboard">
            <div class="flex-grow flex justify-center">
              <nav class="hidden lg:flex space-x-6">
                <a routerLink="/about" class="text-white hover:text-purple-200 transition-colors">Nosotros</a>
                <a routerLink="/glossary" class="text-white hover:text-purple-200 transition-colors">Glosario</a>
              </nav>
            </div>
          </ng-container>
          <div class="flex-shrink-0 w-1/4 flex justify-end items-center">
            <div class="hidden lg:flex space-x-4">
              <ng-container *ngIf="auth.user$ | async as user; else loggedOut">
                <button (click)="logOut()"
                  class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded transition-colors">
                  Cerrar Sesión
                </button>
              </ng-container>
              <ng-template #loggedOut>
                <button (click)="onLoginClick()"
                  class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded transition-colors">
                  Crear cuenta
                </button>
                <button (click)="onLoginClick()"
                  class="bg-transparent border border-white hover:bg-white hover:text-purple-900 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                  Iniciar sesión
                </button>
              </ng-template>
            </div>
            <button (click)="toggleMenu()" class="lg:hidden text-white focus:outline-none z-30 ml-4">
              <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div [@slideInOut]="isMenuOpen ? 'in' : 'out'" 
         class="fixed inset-0 bg-purple-900 z-20 lg:hidden"
         [ngClass]="{'pointer-events-none': !isMenuOpen}">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <a routerLink="/" class="text-2xl font-bold text-white flex items-center">
            <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
          </a>
          <button (click)="toggleMenu()" class="text-white focus:outline-none z-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-start h-full pt-20">
        <ng-container *ngIf="!isDashboard; else dashboardMenu">
          <nav class="flex flex-col space-y-4 items-center">
            <a routerLink="/about" (click)="toggleMenu()" class="text-white hover:text-purple-200 transition-colors text-xl">Nosotros</a>
            <a routerLink="/glossary" (click)="toggleMenu()" class="text-white hover:text-purple-200 transition-colors text-xl">Glosario</a>
          </nav>
          <div class="mt-8 flex flex-col space-y-4 w-64">
            <button (click)="onCreateAccountClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded transition-colors w-full">
              Crear cuenta
            </button>
            <button (click)="onLoginClick()" class="bg-transparent hover:bg-purple-800 text-purple-300 font-semibold hover:text-white py-3 px-6 border border-purple-300 hover:border-transparent rounded-lg transition-colors w-full">
              Iniciar sesión
            </button>
          </div>
          <div class="mt-16 text-center">
            <p class="text-white text-lg mb-4">Seguinos:</p>
            <div class="flex space-x-4">
              <!-- Social media icons (unchanged) -->
            </div>
          </div>
        </ng-container>
        <ng-template #dashboardMenu>
          <div class="mt-8 flex flex-col space-y-4 w-64">
            <button (click)="logOut()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 px-6 rounded transition-colors w-full">
              Cerrar Sesión
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
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