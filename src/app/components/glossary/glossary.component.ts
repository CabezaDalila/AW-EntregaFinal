import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { GlossaryTerm } from '../../interfaces/Iglossary';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './glossary.component.html',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: '0' })),
      state('expanded', style({ height: '*', opacity: '1' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class GlossaryComponent implements OnInit {
  terms: GlossaryTerm[] = [
    {
      id: 1,
      term: 'Acción',
      definition: 'Título que representa una parte del capital de una empresa.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 2,
      term: 'Bono',
      definition: 'Instrumento de deuda emitido por empresas o gobiernos.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 3,
      term: 'Capitalización',
      definition: 'Valor total de mercado de una empresa.',
      category: 'Análisis de Mercado',
    },
    {
      id: 4,
      term: 'Dividendo',
      definition:
        'Parte de las ganancias que una empresa distribuye a sus accionistas.',
      category: 'Inversiones',
    },
    {
      id: 5,
      term: 'ETF',
      definition: 'Fondo cotizado que sigue un índice, sector o commodity.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 6,
      term: 'Futuros',
      definition:
        'Contrato para comprar o vender un activo en una fecha futura.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 7,
      term: 'Gestión de Riesgos',
      definition: 'Proceso de identificar y mitigar riesgos financieros.',
      category: 'Estrategias de Inversión',
    },
    {
      id: 8,
      term: 'Hedge Fund',
      definition: 'Fondo de inversión que utiliza estrategias complejas.',
      category: 'Inversiones',
    },
    {
      id: 9,
      term: 'Inflación',
      definition:
        'Aumento general de precios y disminución del poder adquisitivo.',
      category: 'Conceptos Básicos',
    },
    {
      id: 10,
      term: 'Junta de Accionistas',
      definition:
        'Reunión anual de los propietarios de acciones de una empresa.',
      category: 'Conceptos Básicos',
    },
    {
      id: 11,
      term: 'Kicker',
      definition: 'Incentivo adicional ofrecido en una inversión.',
      category: 'Inversiones',
    },
    {
      id: 12,
      term: 'Liquidez',
      definition:
        'Facilidad con la que un activo puede convertirse en efectivo.',
      category: 'Conceptos Básicos',
    },
    {
      id: 13,
      term: 'Margen',
      definition:
        'Diferencia entre el precio de venta y el costo de un producto.',
      category: 'Análisis de Mercado',
    },
    {
      id: 14,
      term: 'Nasdaq',
      definition: 'Mercado de valores electrónico de Estados Unidos.',
      category: 'Conceptos Básicos',
    },
    {
      id: 15,
      term: 'Opción',
      definition:
        'Derecho a comprar o vender un activo a un precio determinado.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 16,
      term: 'P/E Ratio',
      definition:
        'Relación entre el precio de una acción y las ganancias por acción.',
      category: 'Análisis de Mercado',
    },
    {
      id: 17,
      term: 'Quant',
      definition:
        'Analista que utiliza modelos matemáticos para tomar decisiones de inversión.',
      category: 'Estrategias de Inversión',
    },
    {
      id: 18,
      term: 'Renta Fija',
      definition: 'Inversiones que proporcionan un rendimiento constante.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 19,
      term: 'S&P 500',
      definition: 'Índice de las 500 empresas más grandes de Estados Unidos.',
      category: 'Conceptos Básicos',
    },
    {
      id: 20,
      term: 'Trading',
      definition: 'Compra y venta de activos financieros a corto plazo.',
      category: 'Estrategias de Inversión',
    },
    {
      id: 21,
      term: 'Underwriting',
      definition: 'Proceso de evaluar y asumir riesgos financieros.',
      category: 'Conceptos Básicos',
    },
    {
      id: 22,
      term: 'Volatilidad',
      definition: 'Medida de la fluctuación del precio de un activo.',
      category: 'Análisis de Mercado',
    },
    {
      id: 23,
      term: 'Warrant',
      definition:
        'Derecho a comprar acciones a un precio fijo durante un período.',
      category: 'Instrumentos Financieros',
    },
    {
      id: 24,
      term: 'Yield',
      definition: 'Rendimiento generado por una inversión.',
      category: 'Inversiones',
    },
    {
      id: 25,
      term: 'Zero-coupon bond',
      definition: 'Bono que no paga intereses periódicos.',
      category: 'Instrumentos Financieros',
    },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  filteredTerms: GlossaryTerm[] = [];
  categories: string[] = [
    'Todos',
    'Conceptos Básicos',
    'Instrumentos Financieros',
    'Inversiones',
    'Análisis de Mercado',
    'Estrategias de Inversión',
  ];
  selectedCategory: string = 'Todos';
  searchTerm: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = '';
  expandedTermId: number | null = null;

  ngOnInit() {
    this.filterTerms();
  }

  filterTerms() {
    this.filteredTerms = this.terms.filter(
      (term) =>
        (this.selectedCategory === 'Todos' ||
          term.category === this.selectedCategory) &&
        (this.selectedLetter === '' ||
          term.term.charAt(0).toUpperCase() === this.selectedLetter) &&
        (term.term.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.selectedLetter = '';
    this.expandedTermId = null;
    this.filterTerms();
  }

  selectLetter(letter: string) {
    this.selectedLetter = this.selectedLetter === letter ? '' : letter;
    this.expandedTermId = null;
    this.filterTerms();
  }

  toggleTerm(termId: number) {
    this.expandedTermId = this.expandedTermId === termId ? null : termId;
  }

  login() {
    this.auth.loginWithRedirect();
  }
}
