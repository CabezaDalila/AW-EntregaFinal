import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { SupabaseService } from '../../Services/supabase.service';

interface Asset {
  name: string;
  percentage: number;
  shade: string;
}

interface Transaction {
  id: string;
  ticker:string;
  type: 'buy' | 'sell';
  amount: number;
  details: {
    shares: number;
    price: number;
  };
}

@Component({
  selector: 'app-portfolio-distribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio-distribution.component.html',
  styleUrls: ['./portfolio-distribution.component.scss']
})
export class PortfolioDistributionComponent implements OnInit {
  showTransactionsModal = false;
  expandedTransactionId: string | null = null;
  dateFilter: string = '';
  searchQuery: string = '';
  assetDistribution: Asset[] = [{ name: '', percentage: 0, shade: '' },
    { name: '', percentage: 0, shade: '' }];
  allTransactions: Transaction[] = [];
  availableStock:number = 0;
  totalInvested:number = 0;
  dataTransaction=[];

  constructor (private supabase: SupabaseService, private auth: AuthService){}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        console.log("El usuario está autenticado");

        this.auth.user$.subscribe((user) => {
          console.log("Datos del usuario recibidos:", user);
          if (user?.email) {
            this.supabase.getDataPortfolioUser({ email: user.email })
              .then((data) => {
                console.log("Datos obtenidos:", data);
                this.availableStock=data.dineroDisponible;
                this.totalInvested=data.totalInvertido;
                console.log(data.transaccionAllData.ticker);
                if (data.transaccionAllData) {
                  this.allTransactions = data.transaccionAllData.map((item: any) => ({
                    ticker:item.ticker,
                    id: item.id, // Convertimos a string o asignamos vacío
                    type: item.tipoTransaccion === 'buy' ? 'buy' : 'sell', // Mapeamos el tipo
                    amount: (item.cantidad ?? 0) * (item.precio ?? 0), // Calculamos el monto
                    details: {
                      shares: item.cantidad ?? 0, // Cantidad de acciones
                      price: item.precio ?? 0    // Precio por acción
                    }
                  }));
                }
              
                console.log("efectivo",this.totalInvested)
                this.distributionAssets();
              })
              .catch((error) => {
                console.error("Error al obtener dinero disponible:", error);
              });
          } else {
            console.error("Email no disponible");
          }
        });
      } else {
        console.error("El usuario no está autenticado");
      }
    });
  }
  // Distribución de activos: una parte efectivo disponible eso ya lo tenemos
	// dsp tenemos Cantidad en $ de acciones propias
	// y para saber % necesitas sumar en $ las acciones propias más efectivo disponible y haces la regla de 3
  distributionAssets(){
    const total = this.availableStock + this.totalInvested;
    const stockPercentage = parseFloat(((this.totalInvested / total) * 100).toFixed(2));
    const cashPercentage = parseFloat(((this.availableStock / total) * 100).toFixed(2));

    this.assetDistribution[0].name="Acciones"
    this.assetDistribution[0].percentage=stockPercentage;
    this.assetDistribution[0].shade='stockPercentage';
    this.assetDistribution[1].name="Efectivo"
    this.assetDistribution[1].percentage=cashPercentage;
    this.assetDistribution[1].shade='cashPercentage';
  }

  get filteredTransactions(): Transaction[] {
    return this.allTransactions.filter(transaction => {
      // const matchesDate = !this.dateFilter ||
      //   transaction.date.toISOString().split('T')[0] === this.dateFilter;

      const matchesSearch = !this.searchQuery ||
        transaction.ticker.toLowerCase().includes(this.searchQuery.toLowerCase());
      
        return matchesSearch;
      // matchesDate && matchesSearch;
    });
  }

  get recentTransactions(): Transaction[] {
    return this.allTransactions.slice(-2);
  }

  toggleTransactionsModal() {
    this.showTransactionsModal = !this.showTransactionsModal;
    if (!this.showTransactionsModal) {
      this.expandedTransactionId = null;
      this.resetFilters();
    }
  }

  closeModal(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-backdrop')) {
      this.toggleTransactionsModal();
    }
  }

  toggleTransactionDetails(transactionId: string) {
    this.expandedTransactionId = this.expandedTransactionId === transactionId ? null : transactionId;
  }

  resetFilters() {
    this.dateFilter = '';
    this.searchQuery = '';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

}