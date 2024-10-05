import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed w-full top-0 z-20 bg-purple-900">
  <div class="container mx-auto px-4 py-3"> <!-- Aseguramos el centrado con container y mx-auto -->
    <div class="flex justify-between items-center">
      <a href="#" class="text-2xl font-bold text-white flex items-center">
        <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
      </a>
      <button (click)="toggleMenu()" class="lg:hidden text-white focus:outline-none z-30">
        <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <nav class="hidden lg:flex space-x-6">
        <a href="#" class="text-white hover:text-purple-200 transition-colors">Home</a>
        <a href="#" class="text-white hover:text-purple-200 transition-colors">Learn</a>
        <a href="#" class="text-white hover:text-purple-200 transition-colors">Invest</a>
        <a href="#" class="text-white hover:text-purple-200 transition-colors">Community</a>
      </nav>
      <div class="hidden lg:flex space-x-4">
        <button (click)="onCreateAccountClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded transition-colors">
          Crear cuenta
        </button>
        <button (click)="onLoginClick()" class="bg-transparent border border-white hover:bg-white hover:text-purple-900 text-white font-bold py-2 px-4 rounded transition-colors">
          Iniciar sesión
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
          <a href="#" class="text-2xl font-bold text-white flex items-center">
            <img src="assets/logo/MockVest-logo-white.png" alt="MockVest Logo" class="h-14 w-auto mr-2" />
          </a>
          <button (click)="toggleMenu()" class="text-white focus:outline-none z-30">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex flex-col items-center justify-start h-full pt-20">
        <nav class="flex flex-col space-y-4 items-center">
          <a href="#" class="text-white hover:text-purple-200 transition-colors text-xl">Home</a>
          <a href="#" class="text-white hover:text-purple-200 transition-colors text-xl">Learn</a>
          <a href="#" class="text-white hover:text-purple-200 transition-colors text-xl">Invest</a>
          <a href="#" class="text-white hover:text-purple-200 transition-colors text-xl">Community</a>
        </nav>
        <div class="mt-8 flex flex-col space-y-4">
          <button (click)="onCreateAccountClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded transition-colors">
            Crear cuenta
          </button>
          <button (click)="onLoginClick()" class="bg-transparent hover:bg-purple-800 text-purple-300 font-semibold hover:text-white py-2 px-4 border border-purple-300 hover:border-transparent rounded transition-colors">
            Iniciar sesión
          </button>
        </div>
        <!-- Rest of the mobile menu content -->
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Output() loginClick = new EventEmitter<void>();
  @Output() createAccountClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
  }

  onCreateAccountClick() {
    this.createAccountClick.emit();
  }
}