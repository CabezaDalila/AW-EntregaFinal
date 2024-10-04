import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html', // Cambia a templateUrl
  styleUrls: ['./services.component.scss'] // Cambia a styleUrls
})
export class ServicesComponent {}
