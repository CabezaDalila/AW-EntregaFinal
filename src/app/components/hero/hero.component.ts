import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white pt-32 pb-0 md:pt-40 relative overflow-hidden">
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center mb-12 md:mb-16">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Get things done by awesome remote team
          </h1>
          <p class="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            With TailGrids, businesses and students thrive together. Perfectly match your staffing to changing demands.
          </p>
          <div class="flex justify-center mb-8 md:mb-12">
            <button (click)="onLoginClick()" class="bg-white text-purple-700 hover:bg-purple-100 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
              Crea tu cuenta
            </button>
          </div>
        </div>
      </div>
      <div class="hidden md:block w-full mx-auto overflow-hidden">
        <div class="max-w-6xl mx-auto relative">
          <div class="absolute inset-0 bg-gradient-to-t from-purple-500 to-transparent opacity-75"></div>
          <img 
            src="../assets/photos/Capture.PNG" 
            alt="Dashboard Preview" 
            class="w-full object-cover object-top rounded-t-lg" 
            style="height: 400px;"
          />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    @media (min-width: 769px) and (max-width: 873px) {
      .hero > div:last-child > div {
        max-width: 100%;
        padding: 0 1rem;
      }
      .hero > div:last-child > div > img {
        height: 350px;
      }
    }

    @media (min-width: 874px) and (max-width: 1297px) {
      .hero > div:last-child > div {
        max-width: 90%;
      }
    }
  `]
})
export class HeroComponent {
  @Output() loginClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
  }
}