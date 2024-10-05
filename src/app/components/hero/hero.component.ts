import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero bg-black text-black py-10 md:py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get things done by awesome remote team
          </h1>
          <p class="text-lg md:text-xl mb-6 md:mb-8">
            With TailGrids, business and students thrive together. Business can perfectly match their staffing to changing.
          </p>
          <div class="flex justify-center">
            <button (click)="onLoginClick()" class="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Get Started
            </button>
          </div>
        </div>
        <div class="mt-8 md:mt-12 hidden md:block">
          <img src="../assets/photos/Capture.PNG" alt="Dashboard Preview" class="mx-auto max-w-full rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background-color: white;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  `]
})
export class HeroComponent {
  @Output() loginClick = new EventEmitter<void>();

  onLoginClick() {
    this.loginClick.emit();
  }
}