import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-white">
      <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold text-center text-purple-900 mb-8 mt-16">Glosario Financiero</h1>
        
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

        <!-- Glossary Terms -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let term of filteredTerms"
            class="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
          >
            <div
              (click)="toggleTerm(term)"
              class="cursor-pointer p-4 bg-purple-100 flex justify-between items-center"
            >
              <h3 class="text-lg font-semibold text-purple-900">{{ term.term }}</h3>
              <svg
                [class.rotate-180]="term.isExpanded"
                class="w-5 h-5 text-purple-600 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              *ngIf="term.isExpanded"
              [@expandCollapse]="term.isExpanded ? 'expanded' : 'collapsed'"
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
    {
      term: 'Acción',
      definition: 'Título que representa una parte alícuota del capital social de una sociedad anónima.',
      category: 'Instrumentos Financieros',
    },
    {
      term: 'Dividendo',
      definition: 'Parte de los beneficios de una empresa que se reparte entre los accionistas.',
      category: 'Inversiones',
    },
    {
      term: 'Liquidez',
      definition: 'Capacidad de un activo de convertirse en dinero efectivo de forma rápida y sin perder valor.',
      category: 'Conceptos Básicos',
    },
    {
      term: 'Volatilidad',
      definition: 'Medida de la frecuencia e intensidad de los cambios del precio de un activo.',
      category: 'Análisis de Mercado',
    },
    {
      term: 'Diversificación',
      definition: 'Estrategia de inversión que consiste en repartir el capital entre diferentes tipos de activos para reducir el riesgo.',
      category: 'Estrategias de Inversión',
    },
    {
      term: 'Bono',
      definition: 'Título de deuda emitido por una empresa o gobierno que paga intereses periódicos.',
      category: 'Instrumentos Financieros',
    },
  ];

  filteredTerms: GlossaryTerm[] = [];
  categories: string[] = ['Todos', 'Conceptos Básicos', 'Instrumentos Financieros', 'Inversiones', 'Análisis de Mercado', 'Estrategias de Inversión'];
  selectedCategory: string = 'Todos';
  searchTerm: string = '';

  ngOnInit() {
    this.filterTerms();
  }

  filterTerms() {
    this.filteredTerms = this.terms.filter(term =>
      (this.selectedCategory === 'Todos' || term.category === this.selectedCategory) &&
      (term.term.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       term.definition.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterTerms();
  }

  toggleTerm(term: GlossaryTerm) {
    term.isExpanded = !term.isExpanded;
  }
}