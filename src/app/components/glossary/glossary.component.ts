import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
}

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-white">
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center text-purple-900 mb-4 mt-16">Glosario Financiero</h1>
        <p class="text-center text-gray-600 mb-8">Explora términos financieros clave para mejorar tu comprensión del mundo de las inversiones.</p>
        
        <!-- Search Bar -->
        <div class="mb-8">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="filterTerms()"
            placeholder="Buscar término..."
            class="w-full px-4 py-2 rounded-full border-2 border-purple-300 focus:outline-none focus:border-purple-500"
          />
        </div>

        <!-- Category Tabs -->
        <div class="flex flex-wrap justify-center mb-8">
          <button
            *ngFor="let category of categories"
            (click)="selectCategory(category)"
            [class.bg-purple-600]="selectedCategory === category"
            [class.text-white]="selectedCategory === category"
            class="px-4 py-2 m-1 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 transition duration-300"
          >
            {{ category }}
          </button>
        </div>

        <!-- Alphabetical Index -->
        <div class="flex flex-wrap justify-center mb-8">
          <button
            *ngFor="let letter of alphabet"
            (click)="selectLetter(letter)"
            [class.bg-purple-600]="selectedLetter === letter"
            [class.text-white]="selectedLetter === letter"
            class="px-3 py-1 m-1 rounded-full bg-purple-200 text-purple-800 hover:bg-purple-300 transition duration-300"
          >
            {{ letter }}
          </button>
        </div>

        <!-- Glossary Terms -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let term of filteredTerms"
            class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div
              (click)="toggleTerm(term.id)"
              class="cursor-pointer p-4 bg-purple-100 flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-purple-900">{{ term.term }}</h3>
              <svg
                [class.rotate-180]="expandedTermId === term.id"
                class="w-5 h-5 text-purple-600 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              *ngIf="expandedTermId === term.id"
              [@expandCollapse]="expandedTermId === term.id ? 'expanded' : 'collapsed'"
              class="p-4 bg-white"
            >
              <p class="text-gray-700">{{ term.definition }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
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
    { id: 1, term: 'Acción', definition: 'Título que representa una parte del capital de una empresa.', category: 'Instrumentos Financieros' },
    { id: 2, term: 'Bono', definition: 'Instrumento de deuda emitido por empresas o gobiernos.', category: 'Instrumentos Financieros' },
    { id: 3, term: 'Capitalización', definition: 'Valor total de mercado de una empresa.', category: 'Análisis de Mercado' },
    { id: 4, term: 'Dividendo', definition: 'Parte de las ganancias que una empresa distribuye a sus accionistas.', category: 'Inversiones' },
    { id: 5, term: 'ETF', definition: 'Fondo cotizado que sigue un índice, sector o commodity.', category: 'Instrumentos Financieros' },
    { id: 6, term: 'Futuros', definition: 'Contrato para comprar o vender un activo en una fecha futura.', category: 'Instrumentos Financieros' },
    { id: 7, term: 'Gestión de Riesgos', definition: 'Proceso de identificar y mitigar riesgos financieros.', category: 'Estrategias de Inversión' },
    { id: 8, term: 'Hedge Fund', definition: 'Fondo de inversión que utiliza estrategias complejas.', category: 'Inversiones' },
    { id: 9, term: 'Inflación', definition: 'Aumento general de precios y disminución del poder adquisitivo.', category: 'Conceptos Básicos' },
    { id: 10, term: 'Junta de Accionistas', definition: 'Reunión anual de los propietarios de acciones de una empresa.', category: 'Conceptos Básicos' },
    { id: 11, term: 'Kicker', definition: 'Incentivo adicional ofrecido en una inversión.', category: 'Inversiones' },
    { id: 12, term: 'Liquidez', definition: 'Facilidad con la que un activo puede convertirse en efectivo.', category: 'Conceptos Básicos' },
    { id: 13, term: 'Margen', definition: 'Diferencia entre el precio de venta y el costo de un producto.', category: 'Análisis de Mercado' },
    { id: 14, term: 'Nasdaq', definition: 'Mercado de valores electrónico de Estados Unidos.', category: 'Conceptos Básicos' },
    { id: 15, term: 'Opción', definition: 'Derecho a comprar o vender un activo a un precio determinado.', category: 'Instrumentos Financieros' },
    { id: 16, term: 'P/E Ratio', definition: 'Relación entre el precio de una acción y las ganancias por acción.', category: 'Análisis de Mercado' },
    { id: 17, term: 'Quant', definition: 'Analista que utiliza modelos matemáticos para tomar decisiones de inversión.', category: 'Estrategias de Inversión' },
    { id: 18, term: 'Renta Fija', definition: 'Inversiones que proporcionan un rendimiento constante.', category: 'Instrumentos Financieros' },
    { id: 19, term: 'S&P 500', definition: 'Índice de las 500 empresas más grandes de Estados Unidos.', category: 'Conceptos Básicos' },
    { id: 20, term: 'Trading', definition: 'Compra y venta de activos financieros a corto plazo.', category: 'Estrategias de Inversión' },
    { id: 21, term: 'Underwriting', definition: 'Proceso de evaluar y asumir riesgos financieros.', category: 'Conceptos Básicos' },
    { id: 22, term: 'Volatilidad', definition: 'Medida de la fluctuación del precio de un activo.', category: 'Análisis de Mercado' },
    { id: 23, term: 'Warrant', definition: 'Derecho a comprar acciones a un precio fijo durante un período.', category: 'Instrumentos Financieros' },
    { id: 24, term: 'Yield', definition: 'Rendimiento generado por una inversión.', category: 'Inversiones' },
    { id: 25, term: 'Zero-coupon bond', definition: 'Bono que no paga intereses periódicos.', category: 'Instrumentos Financieros' },
  ];

  filteredTerms: GlossaryTerm[] = [];
  categories: string[] = ['Todos', 'Conceptos Básicos', 'Instrumentos Financieros', 'Inversiones', 'Análisis de Mercado', 'Estrategias de Inversión'];
  selectedCategory: string = 'Todos';
  searchTerm: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string = '';
  expandedTermId: number | null = null;

  ngOnInit() {
    this.filterTerms();
  }

  filterTerms() {
    this.filteredTerms = this.terms.filter(term =>
      (this.selectedCategory === 'Todos' || term.category === this.selectedCategory) &&
      (this.selectedLetter === '' || term.term.charAt(0).toUpperCase() === this.selectedLetter) &&
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
}