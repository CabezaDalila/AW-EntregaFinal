import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiPolygonService } from '../../Services/api-polygon.service';
import { IDailyStocksResponse } from '../../interfaces/IdailyStocks';
import { formatYYYYMMDD } from '../../shared/utils/date.utility';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss']
})
export class QuotesComponent implements OnInit {
  // Datos de la API
  stocksData?: IDailyStocksResponse['results'];
  // Datos de la API filtrados para mostrar
  displayedStocks: IDailyStocksResponse['results'] = [];
  // Estado de carga
  isLoading = true;
  // Término de búsqueda ingresado por el usuario
  searchTerm: string = '';
  // Objeto Subject para manejar el debounce de búsqueda
  private searchSubject = new Subject<string>();
  // Configuración de paginación
  itemsPerPage: number = 15; // Elementos por página
  currentPage: number = 1; // Página actual
  totalItems: number = 0; // Total de elementos
  totalPages:number=0;
  maxVisiblePages: number = 5; // botones
  constructor(private apiPolygon: ApiPolygonService) {}

  ngOnInit(): void {
    this.getDailyStock();

    // Configurar el debounce para la búsqueda
    this.searchSubject.pipe(
      debounceTime(300), // Retraso de 300ms
      distinctUntilChanged() // Evitar emisiones repetidas
    ).subscribe(searchTerm => {
      this.filterStocks(searchTerm);
    });
  }

  // Obtener datos diarios de acciones desde la API
  getDailyStock(): void {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const todayFormatted = formatYYYYMMDD(date);

    this.apiPolygon.getDailyStocks(todayFormatted).subscribe(
      (data) => {
        if (data?.results && data.results.length > 0) {
          this.stocksData = data.results;
          this.displayedStocks = data.results; // Inicializar datos visibles
          this.totalItems = this.stocksData.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
          this.setPage(1,this.stocksData);
          console.log(this.currentPage);
        } else {
          console.error('No data available');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data', error);
        this.isLoading = false;
      }
    );
  }

  // Actualizar los datos filtrados según el término de búsqueda
  updateDisplayedStocks(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchSubject.next(searchTerm);
  }

  // Filtrar los datos según el término de búsqueda
  private filterStocks(searchTerm: string): void {
    if (this.stocksData) {
      // Expand search to include more fields if needed
      this.displayedStocks = this.stocksData.filter(stock =>
        stock?.T?.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      // Recalculate pagination
      this.totalItems = this.displayedStocks.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.setPage(1, this.displayedStocks);
    }
  }
  
  setPage(page: number, data: IDailyStocksResponse['results']): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    
    // Use the passed data parameter for slicing
    this.displayedStocks = data.slice(startIndex, endIndex);
    
    // Recalculate total pages based on the input data
    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(this.currentPage - Math.floor(this.maxVisiblePages / 2), 1);
    const endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToFirstPage(): void {
    this.setPage(1, this.stocksData || []);
  }
  
  goToLastPage(): void {
    this.setPage(this.totalPages, this.stocksData || []);
  }
  
  goToNextPages(): void {
    const nextPage = Math.min(this.currentPage + 1, this.totalPages);
    this.setPage(nextPage, this.stocksData || []);
  }
  
  goToPreviousPages(): void {
    const previousPage = Math.max(this.currentPage - 1, 1);
    this.setPage(previousPage, this.stocksData || []);
  }
}