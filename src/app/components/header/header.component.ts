import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html', // Referencia al archivo HTML
  styleUrls: ['./header.component.scss'], // Referencia al archivo SCSS
})
export class HeaderComponent {}

