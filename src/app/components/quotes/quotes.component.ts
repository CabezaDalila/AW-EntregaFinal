import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Iaccion } from '../../interfaces/Iaccion';
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {

  acciones: Iaccion[] = [
    {
      simbolo: 'ALUA',
      ultimoOperado: 819.00,
      variacionDiaria: -1.08,
      cantidadCompra: 56,
      precioCompra: 800.00,
      precioVenta: 844.00,
      cantidadVenta: 25,
      apertura: 827.00,
      minimo: 810.00,
      maximo: 845.00,
      ultimoCierre: 819.00,
      montoOperado: 955244.47
    },
    {
      simbolo: 'ALUA',
      ultimoOperado: 819.00,
      variacionDiaria: -1.08,
      cantidadCompra: 56,
      precioCompra: 800.00,
      precioVenta: 844.00,
      cantidadVenta: 25,
      apertura: 827.00,
      minimo: 810.00,
      maximo: 845.00,
      ultimoCierre: 819.00,
      montoOperado: 955244.47
    }, {
      simbolo: 'ALUA',
      ultimoOperado: 819.00,
      variacionDiaria: -1.08,
      cantidadCompra: 56,
      precioCompra: 800.00,
      precioVenta: 844.00,
      cantidadVenta: 25,
      apertura: 827.00,
      minimo: 810.00,
      maximo: 845.00,
      ultimoCierre: 819.00,
      montoOperado: 955244.47
    }, {
      simbolo: 'ALUA',
      ultimoOperado: 819.00,
      variacionDiaria: -1.08,
      cantidadCompra: 56,
      precioCompra: 800.00,
      precioVenta: 844.00,
      cantidadVenta: 25,
      apertura: 827.00,
      minimo: 810.00,
      maximo: 845.00,
      ultimoCierre: 819.00,
      montoOperado: 955244.47
    }, {
      simbolo: 'ALUA',
      ultimoOperado: 819.00,
      variacionDiaria: -1.08,
      cantidadCompra: 56,
      precioCompra: 800.00,
      precioVenta: 844.00,
      cantidadVenta: 25,
      apertura: 827.00,
      minimo: 810.00,
      maximo: 845.00,
      ultimoCierre: 819.00,
      montoOperado: 955244.47
    }
    //esto tenemos q cambiarlo por el llamado ala api

  ];
}
