import { Component } from '@angular/core';
import { CotizacionesPrincipalesComponent } from '../cotizaciones-principales/cotizaciones-principales.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CotizacionesPrincipalesComponent, CotizacionesPrincipalesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
