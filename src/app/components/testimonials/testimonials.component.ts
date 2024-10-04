import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html', // Cambia a templateUrl
  styleUrls: ['./testimonials.component.scss'] // Cambia a styleUrls
})
export class TestimonialsComponent {}

