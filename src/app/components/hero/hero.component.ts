import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./hero.component.html' ,
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